import React from 'react';
import { 
  GitCompare, 
  ArrowLeftRight, 
  Trophy, 
  Check, 
  AlertCircle, 
  Droplets, 
  Calendar, 
  Layers, 
  TrendingUp, 
  ShieldAlert,
  Sprout,
  Sparkles
} from 'lucide-react';

export default function CropComparison({ 
  cropA, 
  cropB, 
  allCrops = [], 
  onSelectCropA, 
  onSelectCropB,
  onSwapCrops
}) {
  if (!cropA || !cropB) {
    return (
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 text-center max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <GitCompare className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Select Two Crops to Compare</h3>
        <p className="text-sm text-slate-400 mb-6">
          Choose two crops from the recommendations list or use the selectors below to evaluate their side-by-side suitability and agronomic demands.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Crop A
            </label>
            <select
              value={cropA?.id || ''}
              onChange={(e) => {
                const found = allCrops.find(c => c.id === e.target.value);
                if (found) onSelectCropA(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="">-- Choose Crop A --</option>
              {allCrops.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Crop B
            </label>
            <select
              value={cropB?.id || ''}
              onChange={(e) => {
                const found = allCrops.find(c => c.id === e.target.value);
                if (found) onSelectCropB(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="">-- Choose Crop B --</option>
              {allCrops.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Calculate comparison highlights
  const scoreDiff = cropA.matchScore && cropB.matchScore 
    ? Math.round((cropA.matchScore - cropB.matchScore) * 10) / 10 
    : 0;
  
  const winner = scoreDiff > 0 ? cropA : scoreDiff < 0 ? cropB : null;

  return (
    <div className="space-y-6">
      
      {/* Selector & Header Bar */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-emerald-400" />
              Side-by-Side Crop Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Comparative trade-off analysis between selected cultivars under current soil & climate inputs
            </p>
          </div>

          <button
            onClick={onSwapCrops}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swap Positions</span>
          </button>
        </div>

        {/* Dropdown switchers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-750 flex items-center gap-3">
            <span className="text-2xl">{cropA.icon}</span>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Candidate A</label>
              <select
                value={cropA.id}
                onChange={(e) => {
                  const found = allCrops.find(c => c.id === e.target.value);
                  if (found) onSelectCropA(found);
                }}
                className="w-full bg-transparent font-bold text-white text-sm focus:outline-none cursor-pointer"
              >
                {allCrops.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.icon} {c.name} ({c.matchScore ? `${c.matchScore}%` : c.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-750 flex items-center gap-3">
            <span className="text-2xl">{cropB.icon}</span>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider">Candidate B</label>
              <select
                value={cropB.id}
                onChange={(e) => {
                  const found = allCrops.find(c => c.id === e.target.value);
                  if (found) onSelectCropB(found);
                }}
                className="w-full bg-transparent font-bold text-white text-sm focus:outline-none cursor-pointer"
              >
                {allCrops.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.icon} {c.name} ({c.matchScore ? `${c.matchScore}%` : c.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Agronomic Verdict Callout */}
        {winner && (
          <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-blue-950/40 border border-emerald-500/30 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-400">{winner.name}</strong> leads the recommendation index by{' '}
              <strong className="text-white">+{Math.abs(scoreDiff)}%</strong> over {winner.id === cropA.id ? cropB.name : cropA.name}.
              {' '}{winner.favorableFactors?.[0] || 'Offers superior physiological alignment with your soil & climate inputs.'}
            </div>
          </div>
        )}
      </div>

      {/* Comparative Table */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700 text-xs uppercase tracking-wider">
                <th className="p-4 text-slate-400 w-1/3">Evaluation Metric</th>
                <th className="p-4 text-emerald-400 w-1/3 bg-emerald-500/5 border-l border-r border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cropA.icon}</span>
                    <div>
                      <div className="text-white font-bold">{cropA.name}</div>
                      <div className="text-[10px] text-emerald-400/80 font-normal italic lowercase">{cropA.scientificName}</div>
                    </div>
                  </div>
                </th>
                <th className="p-4 text-blue-400 w-1/3 bg-blue-500/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cropB.icon}</span>
                    <div>
                      <div className="text-white font-bold">{cropB.name}</div>
                      <div className="text-[10px] text-blue-400/80 font-normal italic lowercase">{cropB.scientificName}</div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-750 text-xs sm:text-sm">
              
              {/* Section: Suitability Scores */}
              <tr className="bg-slate-900/50">
                <td colSpan="3" className="px-4 py-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  1. Overall Suitability Index
                </td>
              </tr>
              
              <tr>
                <td className="p-4 text-slate-300 font-medium">Calculated Match Score</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black font-mono text-emerald-400">{cropA.matchScore}%</span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      {cropA.suitabilityGrade}
                    </span>
                  </div>
                </td>
                <td className="p-4 bg-blue-500/5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black font-mono text-blue-400">{cropB.matchScore}%</span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-blue-500/20 text-blue-300 font-semibold">
                      {cropB.suitabilityGrade}
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Soil Compatibility Score</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-emerald-300 font-bold">
                  {cropA.breakdown?.soilScore ?? '--'}%
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-blue-300 font-bold">
                  {cropB.breakdown?.soilScore ?? '--'}%
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Climate Suitability Score</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-emerald-300 font-bold">
                  {cropA.breakdown?.climateScore ?? '--'}%
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-blue-300 font-bold">
                  {cropB.breakdown?.climateScore ?? '--'}%
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Nutrient Balance Score</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-emerald-300 font-bold">
                  {cropA.breakdown?.nutrientScore ?? '--'}%
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-blue-300 font-bold">
                  {cropB.breakdown?.nutrientScore ?? '--'}%
                </td>
              </tr>

              {/* Section: Soil & Nutrients */}
              <tr className="bg-slate-900/50">
                <td colSpan="3" className="px-4 py-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  2. Soil & Nutrient Demand
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Preferred Soil Types</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 text-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {cropA.soilTypes.map(s => (
                      <span key={s} className="px-2 py-0.5 text-xs rounded bg-slate-700/70 text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 bg-blue-500/5 text-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {cropB.soilTypes.map(s => (
                      <span key={s} className="px-2 py-0.5 text-xs rounded bg-slate-700/70 text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Optimal Soil pH Window</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalPh.min} - {cropA.optimalPh.max}
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalPh.min} - {cropB.optimalPh.max}
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Optimal Nitrogen (N) Demand</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalN.min} - {cropA.optimalN.max} kg/ha
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalN.min} - {cropB.optimalN.max} kg/ha
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Optimal Phosphorus (P) Demand</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalP.min} - {cropA.optimalP.max} kg/ha
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalP.min} - {cropB.optimalP.max} kg/ha
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Optimal Potassium (K) Demand</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalK.min} - {cropA.optimalK.max} kg/ha
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalK.min} - {cropB.optimalK.max} kg/ha
                </td>
              </tr>

              {/* Section: Climate & Water */}
              <tr className="bg-slate-900/50">
                <td colSpan="3" className="px-4 py-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  3. Climate & Water Requirements
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Optimal Temperature Window</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalTemp.min}°C - {cropA.optimalTemp.max}°C
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalTemp.min}°C - {cropB.optimalTemp.max}°C
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Relative Humidity Window</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalHumidity.min}% - {cropA.optimalHumidity.max}%
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalHumidity.min}% - {cropB.optimalHumidity.max}%
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Seasonal Rainfall Requirement</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-mono text-slate-200">
                  {cropA.optimalRainfall.min} - {cropA.optimalRainfall.max} mm
                </td>
                <td className="p-4 bg-blue-500/5 font-mono text-slate-200">
                  {cropB.optimalRainfall.min} - {cropB.optimalRainfall.max} mm
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Water Intensity Level</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-bold text-slate-200">
                  {cropA.waterRequirement}
                </td>
                <td className="p-4 bg-blue-500/5 font-bold text-slate-200">
                  {cropB.waterRequirement}
                </td>
              </tr>

              {/* Section: Economic & Harvest */}
              <tr className="bg-slate-900/50">
                <td colSpan="3" className="px-4 py-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  4. Harvest & Agronomic Management
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Growth Cycle Duration</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 text-slate-200">
                  {cropA.growthDurationDays}
                </td>
                <td className="p-4 bg-blue-500/5 text-slate-200">
                  {cropB.growthDurationDays}
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Expected Yield Potential</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 font-semibold text-emerald-400">
                  {cropA.yieldPotential}
                </td>
                <td className="p-4 bg-blue-500/5 font-semibold text-blue-400">
                  {cropB.yieldPotential}
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Fertilizer & Nutrition Protocol</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 text-slate-300 text-xs leading-relaxed">
                  {cropA.fertilizerGuidance}
                </td>
                <td className="p-4 bg-blue-500/5 text-slate-300 text-xs leading-relaxed">
                  {cropB.fertilizerGuidance}
                </td>
              </tr>

              <tr>
                <td className="p-4 text-slate-300 font-medium">Key Pests & Pathogen Alerts</td>
                <td className="p-4 border-l border-r border-slate-800 bg-emerald-500/5 text-amber-300/90 text-xs leading-relaxed">
                  {cropA.keyPestsAndDiseases}
                </td>
                <td className="p-4 bg-blue-500/5 text-amber-300/90 text-xs leading-relaxed">
                  {cropB.keyPestsAndDiseases}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
