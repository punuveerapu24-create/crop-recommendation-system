import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowUpDown, 
  Search, 
  Filter, 
  GitCompare, 
  Check, 
  ChevronRight, 
  Info, 
  Droplet, 
  Clock, 
  Sprout, 
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function RecommendationList({ 
  recommendations = [], 
  onSelectForComparison, 
  comparisonCrops = [], 
  onViewDetails,
  onNavigateToCompare
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cereal', 'Pulse', 'Cash Crop', 'Fruit', 'Commercial', 'Oilseed'];

  // Filter crops by search & category
  const filteredCrops = recommendations.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isSelectedForComparison = (cropId) => {
    return comparisonCrops.some(c => c.id === cropId);
  };

  const getScoreColor = (score) => {
    if (score >= 82) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', badge: 'bg-emerald-500 text-slate-950' };
    if (score >= 70) return { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/40', badge: 'bg-teal-500 text-slate-950' };
    if (score >= 55) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/40', badge: 'bg-amber-500 text-slate-950' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/40', badge: 'bg-rose-500 text-white' };
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Comparison Bar */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Ranked Crop Suitability Results
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-700 text-slate-300">
              {recommendations.length} Evaluated
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmically sorted by multi-criteria agronomic match index
          </p>
        </div>

        {/* Comparison Trigger Pill */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="text-xs text-slate-300 flex items-center gap-1.5">
            <GitCompare className="w-4 h-4 text-emerald-400" />
            <span>Comparison: <strong>{comparisonCrops.length} / 2</strong> selected</span>
          </div>

          <button
            onClick={onNavigateToCompare}
            disabled={comparisonCrops.length < 2}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              comparisonCrops.length === 2
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 animate-pulse'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Compare Side-by-Side</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search crops by name (e.g., Rice, Wheat, Cotton)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrops.map((crop, idx) => {
          const colors = getScoreColor(crop.matchScore);
          const isSelected = isSelectedForComparison(crop.id);
          const rank = idx + 1;

          return (
            <div
              key={crop.id}
              className={`relative bg-slate-800/70 border rounded-2xl p-5 transition-all hover:border-slate-600 hover:shadow-xl ${
                isSelected ? 'border-emerald-500 ring-1 ring-emerald-500/40 bg-slate-800/90' : 'border-slate-700/70'
              }`}
            >
              {/* Header: Rank, Icon, Name, Match Score */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                      {crop.icon}
                    </div>
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400 flex items-center justify-center shadow">
                      #{rank}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {crop.name}
                    </h4>
                    <p className="text-xs text-slate-400 italic">
                      {crop.scientificName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-700/80 text-slate-300">
                        {crop.category}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-700/80 text-slate-300">
                        {crop.season.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="text-right">
                  <div className={`px-2.5 py-1 rounded-xl ${colors.bg} border ${colors.border} inline-block`}>
                    <span className={`text-xl font-black font-mono ${colors.text}`}>
                      {crop.matchScore}%
                    </span>
                    <span className="block text-[10px] font-medium text-slate-300">
                      {crop.suitabilityGrade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-scores Progress Bars */}
              <div className="bg-slate-900/60 rounded-xl p-3 mb-4 space-y-2 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Suitability Sub-indices</span>
                  <span>Match %</span>
                </div>

                {/* Soil & Season */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>Soil Compatibility</span>
                      <span className="font-mono text-emerald-400">{crop.breakdown?.soilScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${crop.breakdown?.soilScore || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>Climate Suitability</span>
                      <span className="font-mono text-blue-400">{crop.breakdown?.climateScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full transition-all"
                        style={{ width: `${crop.breakdown?.climateScore || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>Nutrient Balance</span>
                      <span className="font-mono text-amber-400">{crop.breakdown?.nutrientScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${crop.breakdown?.nutrientScore || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>Seasonal Alignment</span>
                      <span className="font-mono text-purple-400">{crop.breakdown?.seasonScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-400 rounded-full transition-all"
                        style={{ width: `${crop.breakdown?.seasonScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agronomic Quick Specs */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Water Needs</span>
                  <span className="font-semibold text-slate-200">{crop.waterRequirement}</span>
                </div>
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Cycle</span>
                  <span className="font-semibold text-slate-200 truncate block">{crop.growthDurationDays}</span>
                </div>
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Yield Potential</span>
                  <span className="font-semibold text-slate-200 truncate block">{crop.yieldPotential}</span>
                </div>
              </div>

              {/* Observations */}
              {crop.favorableFactors?.length > 0 && (
                <div className="text-xs text-emerald-400/90 mb-1 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span className="truncate">{crop.favorableFactors[0]}</span>
                </div>
              )}
              {crop.limitingFactors?.length > 0 && (
                <div className="text-xs text-amber-400/90 mb-4 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span className="truncate">{crop.limitingFactors[0]}</span>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectForComparison(crop)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60'
                      : 'bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600/40'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Selected for Compare</span>
                    </>
                  ) : (
                    <>
                      <GitCompare className="w-3.5 h-3.5 text-slate-400" />
                      <span>Compare Crop</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onViewDetails(crop)}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Agronomy</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
