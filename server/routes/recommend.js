const express = require('express');
const router = express.Router();
const { rankCrops, compareCrops, getAllCrops } = require('../controllers/recommendationEngine');

// Standard Hackathon Presets for quick evaluation
const HACKATHON_PRESETS = [
  {
    id: 'punjab-wheat',
    name: 'Indo-Gangetic Plains (Wheat/Rabi)',
    description: 'High-fertility loamy soil, winter cool climate, moderate rainfall with canal network.',
    values: {
      soilType: 'Loamy',
      ph: 6.8,
      nitrogen: 100,
      phosphorus: 52,
      potassium: 42,
      temperature: 18,
      humidity: 58,
      rainfall: 65,
      season: 'Rabi'
    }
  },
  {
    id: 'bengal-delta-rice',
    name: 'Eastern Delta (Paddy/Monsoon)',
    description: 'Heavy alluvial clay soil, high monsoon precipitation, warm tropical humidity.',
    values: {
      soilType: 'Clayey',
      ph: 6.2,
      nitrogen: 85,
      phosphorus: 48,
      potassium: 50,
      temperature: 29,
      humidity: 86,
      rainfall: 220,
      season: 'Kharif'
    }
  },
  {
    id: 'deccan-cotton',
    name: 'Deccan Plateau (Cotton/Black Soil)',
    description: 'Deep moisture-retentive black cotton soil, warm temperature, moderate rain.',
    values: {
      soilType: 'Black',
      ph: 7.4,
      nitrogen: 120,
      phosphorus: 55,
      potassium: 35,
      temperature: 28,
      humidity: 62,
      rainfall: 85,
      season: 'Kharif'
    }
  },
  {
    id: 'arid-rajasthan-pulse',
    name: 'Semi-Arid Dryland (Moth/Chickpea)',
    description: 'Sandy arid soil, warm temperatures, low rainfall with high solar intensity.',
    values: {
      soilType: 'Sandy',
      ph: 7.8,
      nitrogen: 25,
      phosphorus: 38,
      potassium: 22,
      temperature: 31,
      humidity: 42,
      rainfall: 35,
      season: 'Kharif'
    }
  },
  {
    id: 'coastal-horticulture',
    name: 'Coastal Belt (Coconut/Fruit)',
    description: 'Littoral sandy loam, high coastal humidity, ample rainfall, warm tropical climate.',
    values: {
      soilType: 'Sandy Loam',
      ph: 6.5,
      nitrogen: 35,
      phosphorus: 25,
      potassium: 45,
      temperature: 28,
      humidity: 88,
      rainfall: 180,
      season: 'Year-round'
    }
  }
];

// POST /api/recommend - Rank crops based on soil & climate inputs
router.post('/recommend', (req, res) => {
  try {
    const inputs = req.body || {};
    const result = rankCrops(inputs);
    return res.json(result);
  } catch (err) {
    console.error('Error during crop recommendation:', err);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while computing crop recommendations',
      details: err.message
    });
  }
});

// POST /api/compare - Compare two crops side by side
router.post('/compare', (req, res) => {
  try {
    const { cropId1, cropId2, inputs } = req.body;
    if (!cropId1 || !cropId2) {
      return res.status(400).json({
        success: false,
        error: 'Both cropId1 and cropId2 are required parameters'
      });
    }

    const comparison = compareCrops(cropId1, cropId2, inputs);
    return res.json(comparison);
  } catch (err) {
    console.error('Error during crop comparison:', err);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while comparing crops',
      details: err.message
    });
  }
});

// GET /api/crops - List all crops in dataset
router.get('/crops', (req, res) => {
  try {
    const crops = getAllCrops();
    return res.json({ success: true, count: crops.length, crops });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/presets - Hackathon quick-load presets
router.get('/presets', (req, res) => {
  return res.json({ success: true, presets: HACKATHON_PRESETS });
});

module.exports = router;
