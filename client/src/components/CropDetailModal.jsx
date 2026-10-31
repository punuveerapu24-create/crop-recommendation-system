import React from 'react';
import { X, Sprout, ShieldAlert, Droplets, Thermometer, CloudRain, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function CropDetailModal({ crop, onClose }) {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-800/50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
              {crop.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{crop.name}</h3>
                <span className="px-2 py-0.5 text-xs rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {crop.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">{crop.scientificName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          
          {/* Summary */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Agronomic Profile</h4>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">{crop.summary}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Growth Cycle</span>
              <span className="font-bold text-white text-xs">{crop.growthDurationDays}</span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Water Demand</span>
              <span className="font-bold text-emerald-400 text-xs">{crop.waterRequirement}</span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Yield Potential</span>
              <span className="font-bold text-blue-400 text-xs">{crop.yieldPotential}</span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Market Value</span>
              <span className="font-bold text-amber-400 text-xs">{crop.economicValue}</span>
            </div>
          </div>

          {/* Optimal Environmental Envelope */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Optimal Agronomic Envelope
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Nitrogen (N)</span>
                <span className="font-mono font-bold text-white">{crop.optimalN.min} - {crop.optimalN.max} kg/ha</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Phosphorus (P)</span>
                <span className="font-mono font-bold text-white">{crop.optimalP.min} - {crop.optimalP.max} kg/ha</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Potassium (K)</span>
                <span className="font-mono font-bold text-white">{crop.optimalK.min} - {crop.optimalK.max} kg/ha</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Soil pH Window</span>
                <span className="font-mono font-bold text-white">{crop.optimalPh.min} - {crop.optimalPh.max}</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Temperature</span>
                <span className="font-mono font-bold text-white">{crop.optimalTemp.min}°C - {crop.optimalTemp.max}°C</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Seasonal Rainfall</span>
                <span className="font-mono font-bold text-white">{crop.optimalRainfall.min} - {crop.optimalRainfall.max} mm</span>
              </div>
            </div>
          </div>

          {/* Fertilizer & Nutrient Protocol */}
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sprout className="w-4 h-4" />
              Nutritional & Fertilizer Scheduling
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {crop.fertilizerGuidance}
            </p>
          </div>

          {/* Pest & Disease Alerts */}
          <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              Pest & Pathogen Surveillance Alerts
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {crop.keyPestsAndDiseases}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
