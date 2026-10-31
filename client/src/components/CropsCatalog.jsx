import React, { useState } from 'react';
import { Search, BookOpen, Droplet, Clock, Info, GitCompare } from 'lucide-react';

export default function CropsCatalog({ crops = [], onViewDetails, onSelectForComparison, comparisonCrops = [] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Cereal', 'Pulse', 'Cash Crop', 'Fruit', 'Commercial', 'Oilseed'];

  const filtered = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
                          crop.scientificName.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || crop.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          Agronomic Knowledgebase & Crop Catalog
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore benchmark parameters, soil affinities, and fertilizer guidelines across {crops.length} agricultural cultivars
        </p>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search catalog by crop name or taxonomy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Crops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((crop) => {
          const isSelected = comparisonCrops.some(c => c.id === crop.id);

          return (
            <div
              key={crop.id}
              className="bg-slate-800/70 border border-slate-700/70 hover:border-slate-600 rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800">{crop.icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-base">{crop.name}</h4>
                      <p className="text-xs text-slate-400 italic">{crop.scientificName}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-700/80 text-slate-300">
                    {crop.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {crop.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">pH Window</span>
                    <span className="font-mono text-emerald-300 font-semibold">{crop.optimalPh.min} - {crop.optimalPh.max}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Water Need</span>
                    <span className="font-semibold text-blue-300">{crop.waterRequirement}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Temp Window</span>
                    <span className="font-mono text-slate-200">{crop.optimalTemp.min}-{crop.optimalTemp.max}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Duration</span>
                    <span className="text-slate-200 truncate block">{crop.growthDurationDays}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2">
                <button
                  onClick={() => onViewDetails(crop)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-700/70 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => onSelectForComparison(crop)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Added' : 'Compare'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
