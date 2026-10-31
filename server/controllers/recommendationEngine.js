const cropsData = require('../data/crops.json');

/**
 * Calculates a Gaussian proximity score [0 - 100]
 * Returns 100 if value is within [min, max], otherwise exponentially decays
 */
function calculateRangeScore(value, min, max, sigma) {
  if (value >= min && value <= max) {
    return 100;
  }
  const distance = value < min ? min - value : value - max;
  const score = Math.exp(-Math.pow(distance, 2) / (2 * Math.pow(sigma, 2))) * 100;
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

/**
 * Evaluates soil compatibility
 */
function evaluateSoilMatch(userSoil, cropSoils) {
  if (!userSoil) return 70;
  const normalizedUser = userSoil.trim().toLowerCase();
  
  // Exact match in crop's preferred soils
  const isDirect = cropSoils.some(s => s.toLowerCase() === normalizedUser);
  if (isDirect) return 100;

  // Substring or broad class compatibility
  const isPartial = cropSoils.some(s => 
    s.toLowerCase().includes(normalizedUser) || normalizedUser.includes(s.toLowerCase())
  );
  if (isPartial) return 85;

  // Agricultural interchangeability matrix
  const relatedMap = {
    'alluvial': ['loamy', 'clay loam', 'sandy loam'],
    'loamy': ['alluvial', 'sandy loam', 'clay loam', 'red'],
    'clayey': ['clay loam', 'alluvial', 'black'],
    'black': ['clayey', 'clay loam', 'alluvial'],
    'sandy': ['sandy loam', 'arid', 'alluvial'],
    'sandy loam': ['sandy', 'loamy', 'alluvial', 'red'],
    'red': ['loamy', 'laterite', 'sandy loam'],
    'laterite': ['red', 'loamy']
  };

  const related = relatedMap[normalizedUser] || [];
  const matchesRelated = cropSoils.some(s => related.includes(s.toLowerCase()));
  if (matchesRelated) return 75;

  return 35; // Incompatible soil type
}

/**
 * Evaluates season compatibility
 */
function evaluateSeasonMatch(userSeason, cropSeasons) {
  if (!userSeason || userSeason.toLowerCase() === 'any' || userSeason.toLowerCase() === 'year-round') {
    return 100;
  }
  const normalizedUser = userSeason.trim().toLowerCase();

  // If crop can be grown year-round
  if (cropSeasons.some(s => s.toLowerCase() === 'year-round')) {
    return 100;
  }

  // Exact season match
  const matches = cropSeasons.some(s => s.toLowerCase() === normalizedUser);
  if (matches) return 100;

  // Partial seasonal tolerance (e.g. Zaid with Kharif, Rabi with Zaid transition)
  return 30;
}

/**
 * Generates agronomic observations (favorable and limiting factors)
 */
function generateObservations(crop, inputs) {
  const favorable = [];
  const limiting = [];

  // Nitrogen
  if (inputs.nitrogen >= crop.optimalN.min && inputs.nitrogen <= crop.optimalN.max) {
    favorable.push(`Available Nitrogen (${inputs.nitrogen} kg/ha) matches ideal requirement (${crop.optimalN.min} - ${crop.optimalN.max})`);
  } else if (inputs.nitrogen < crop.optimalN.min) {
    limiting.push(`Nitrogen (${inputs.nitrogen} kg/ha) is below optimal (${crop.optimalN.min} - ${crop.optimalN.max}); supplemental nitrogen/urea advised`);
  } else {
    limiting.push(`Excess Nitrogen (${inputs.nitrogen} kg/ha); may promote excessive foliage over grain/fruit development`);
  }

  // Phosphorus
  if (inputs.phosphorus >= crop.optimalP.min && inputs.phosphorus <= crop.optimalP.max) {
    favorable.push(`Phosphorus level (${inputs.phosphorus} kg/ha) is well-aligned for robust root initiation`);
  } else if (inputs.phosphorus < crop.optimalP.min) {
    limiting.push(`Phosphorus is low; apply DAP or SSP prior to sowing`);
  }

  // Potassium
  if (inputs.potassium >= crop.optimalK.min && inputs.potassium <= crop.optimalK.max) {
    favorable.push(`Potassium reserves (${inputs.potassium} kg/ha) ensure optimal disease resistance and water regulation`);
  } else if (inputs.potassium < crop.optimalK.min) {
    limiting.push(`Potassium is low; MOP (Muriate of Potash) application recommended`);
  }

  // pH
  if (inputs.ph >= crop.optimalPh.min && inputs.ph <= crop.optimalPh.max) {
    favorable.push(`Soil pH (${inputs.ph}) is perfectly suited for nutrient bioavailability`);
  } else if (inputs.ph < crop.optimalPh.min) {
    limiting.push(`Soil is more acidic (pH ${inputs.ph}) than preferred (${crop.optimalPh.min} - ${crop.optimalPh.max}); agricultural lime may be needed`);
  } else {
    limiting.push(`Soil is alkaline (pH ${inputs.ph}); gypsum or organic compost recommended to buffer alkalinity`);
  }

  // Temperature
  if (inputs.temperature >= crop.optimalTemp.min && inputs.temperature <= crop.optimalTemp.max) {
    favorable.push(`Ambient temperature (${inputs.temperature}°C) is in the optimal growth window`);
  } else if (inputs.temperature < crop.optimalTemp.min) {
    limiting.push(`Temperature (${inputs.temperature}°C) is lower than preferred (${crop.optimalTemp.min}°C)`);
  } else {
    limiting.push(`High temperature (${inputs.temperature}°C) may induce heat stress; ensure adequate mulch/irrigation`);
  }

  // Rainfall
  if (inputs.rainfall >= crop.optimalRainfall.min && inputs.rainfall <= crop.optimalRainfall.max) {
    favorable.push(`Expected rainfall (${inputs.rainfall} mm) satisfies water requirements`);
  } else if (inputs.rainfall < crop.optimalRainfall.min) {
    limiting.push(`Rainfall (${inputs.rainfall} mm) is deficient (needs ${crop.optimalRainfall.min} - ${crop.optimalRainfall.max} mm); requires drip or canal irrigation`);
  } else {
    limiting.push(`Rainfall (${inputs.rainfall} mm) exceeds standard; ensure proper field drainage to prevent waterlogging`);
  }

  return { favorable: favorable.slice(0, 3), limiting: limiting.slice(0, 3) };
}

/**
 * Main recommendation scoring logic
 */
function rankCrops(inputs) {
  const {
    soilType = 'Alluvial',
    ph = 6.5,
    nitrogen = 80,
    phosphorus = 45,
    potassium = 40,
    temperature = 25,
    humidity = 65,
    rainfall = 100,
    season = 'Kharif'
  } = inputs;

  const parsedInputs = {
    soilType: String(soilType),
    ph: Number(ph),
    nitrogen: Number(nitrogen),
    phosphorus: Number(phosphorus),
    potassium: Number(potassium),
    temperature: Number(temperature),
    humidity: Number(humidity),
    rainfall: Number(rainfall),
    season: String(season)
  };

  const results = cropsData.map(crop => {
    // 1. Soil Match (0-100)
    const soilScore = evaluateSoilMatch(parsedInputs.soilType, crop.soilTypes);

    // 2. Season Match (0-100)
    const seasonScore = evaluateSeasonMatch(parsedInputs.season, crop.season);

    // 3. Nutrients Sub-Scores
    const nScore = calculateRangeScore(parsedInputs.nitrogen, crop.optimalN.min, crop.optimalN.max, 28);
    const pScore = calculateRangeScore(parsedInputs.phosphorus, crop.optimalP.min, crop.optimalP.max, 24);
    const kScore = calculateRangeScore(parsedInputs.potassium, crop.optimalK.min, crop.optimalK.max, 24);
    const phScore = calculateRangeScore(parsedInputs.ph, crop.optimalPh.min, crop.optimalPh.max, 0.75);

    const nutrientScore = Math.round(
      0.30 * nScore +
      0.25 * pScore +
      0.25 * kScore +
      0.20 * phScore
    );

    // 4. Climate Sub-Scores
    const tempScore = calculateRangeScore(parsedInputs.temperature, crop.optimalTemp.min, crop.optimalTemp.max, 5.5);
    const humidityScore = calculateRangeScore(parsedInputs.humidity, crop.optimalHumidity.min, crop.optimalHumidity.max, 14);
    const rainfallScore = calculateRangeScore(parsedInputs.rainfall, crop.optimalRainfall.min, crop.optimalRainfall.max, 35);

    const climateScore = Math.round(
      0.35 * tempScore +
      0.30 * humidityScore +
      0.35 * rainfallScore
    );

    // 5. Overall Weighted Match Percentage
    // Weights: Soil: 20%, Season: 15%, Nutrients: 35%, Climate: 30%
    const totalMatchRaw = (
      0.20 * soilScore +
      0.15 * seasonScore +
      0.35 * nutrientScore +
      0.30 * climateScore
    );

    const matchScore = Math.min(99.4, Math.max(12.0, Math.round(totalMatchRaw * 10) / 10));

    let suitabilityGrade = 'Low';
    let badgeColor = 'red';
    if (matchScore >= 82) {
      suitabilityGrade = 'Highly Recommended';
      badgeColor = 'emerald';
    } else if (matchScore >= 70) {
      suitabilityGrade = 'Suitable';
      badgeColor = 'teal';
    } else if (matchScore >= 55) {
      suitabilityGrade = 'Moderate with Amendments';
      badgeColor = 'amber';
    } else {
      suitabilityGrade = 'Not Ideal';
      badgeColor = 'rose';
    }

    const { favorable, limiting } = generateObservations(crop, parsedInputs);

    return {
      ...crop,
      matchScore,
      suitabilityGrade,
      badgeColor,
      breakdown: {
        soilScore,
        seasonScore,
        nutrientScore,
        climateScore,
        nScore: Math.round(nScore),
        pScore: Math.round(pScore),
        kScore: Math.round(kScore),
        phScore: Math.round(phScore),
        tempScore: Math.round(tempScore),
        humidityScore: Math.round(humidityScore),
        rainfallScore: Math.round(rainfallScore)
      },
      favorableFactors: favorable,
      limitingFactors: limiting
    };
  });

  // Sort descending by matchScore
  results.sort((a, b) => b.matchScore - a.matchScore);

  return {
    success: true,
    count: results.length,
    inputs: parsedInputs,
    recommendations: results
  };
}

/**
 * Detailed Side-by-Side Comparison of two crops against given or standard conditions
 */
function compareCrops(cropId1, cropId2, inputs = null) {
  const crop1 = cropsData.find(c => c.id === cropId1 || c.name.toLowerCase() === cropId1.toLowerCase());
  const crop2 = cropsData.find(c => c.id === cropId2 || c.name.toLowerCase() === cropId2.toLowerCase());

  if (!crop1 || !crop2) {
    return { success: false, error: 'One or both crop identifiers could not be found' };
  }

  let scored1 = crop1;
  let scored2 = crop2;

  if (inputs) {
    const fullRanked = rankCrops(inputs);
    scored1 = fullRanked.recommendations.find(r => r.id === crop1.id) || crop1;
    scored2 = fullRanked.recommendations.find(r => r.id === crop2.id) || crop2;
  }

  return {
    success: true,
    cropA: scored1,
    cropB: scored2
  };
}

module.exports = {
  rankCrops,
  compareCrops,
  getAllCrops: () => cropsData
};
