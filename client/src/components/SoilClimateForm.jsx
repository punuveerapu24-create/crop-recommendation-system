import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Layers, 
  Calendar, 
  FlaskConical, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

const SOIL_TYPES = [
  'Alluvial',
  'Black',
  'Clayey',
  'Loamy',
  'Sandy Loam',
  'Sandy',
  'Red',
  'Laterite'
];

const SEASONS = [
  { id: 'Kharif', label: 'Kharif (Monsoon/Autumn)', desc: 'June - Oct' },
  { id: 'Rabi', label: 'Rabi (Winter/Spring)', desc: 'Oct - April' },
  { id: 'Zaid', label: 'Zaid (Summer)', desc: 'March - June' },
  { id: 'Year-round', label: 'Year-round / Perennial', desc: 'Any season' },
  { id: 'Any', label: 'Any / Unrestricted', desc: 'General assessment' }
];

const SAMPLE_PRESETS = [
  {
    name: 'Eastern Delta (Paddy)',
    icon: '🌾',
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
    name: 'Punjab Plains (Wheat)',
    icon: '🌱',
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
    name: 'Deccan Cotton Belt',
    icon: '☁️',
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
    name: 'Semi-Arid Dryland',
    icon: '🫛',
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
    name: 'Coastal Agro-zone',
    icon: '🥥',
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

export default function SoilClimateForm({ formData, setFormData, onSubmit, loading }) {
  const [activePreset, setActivePreset] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActivePreset(null);
  };

  const applyPreset = (preset) => {
    setFormData(preset.values);
    setActivePreset(preset.name);
  };

  const handleReset = () => {
    setFormData({
      soilType: 'Alluvial',
      ph: 6.5,
      nitrogen: 75,
      phosphorus: 45,
      potassium: 40,
      temperature: 26,
      humidity: 68,
      rainfall: 110,
      season: 'Kharif'
    });
    setActivePreset(null);
  };

  const getPhStatus = (ph) => {
    if (ph < 5.5) return { label: 'Strongly Acidic', color: 'text-amber-400' };
    if (ph < 6.5) return { label: 'Moderately Acidic', color: 'text-emerald-300' };
    if (ph <= 7.5) return { label: 'Optimal / Neutral', color: 'text-emerald-400 font-bold' };
    if (ph <= 8.5) return { label: 'Moderately Alkaline', color: 'text-cyan-400' };
    return { label: 'Strongly Alkaline', color: 'text-purple-400' };
  };

  const phStatus = getPhStatus(formData.ph);

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      
      {/* Header & Quick Presets */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-700/80">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              Soil & Climate Parameters
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Input laboratory soil metrics and seasonal weather data for predictive crop suitability
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Quick Demo Presets:
            </span>
            <span className="text-[11px] text-slate-400">Click to autofill hackathon test scenarios</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  activePreset === preset.name
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-sm'
                    : 'bg-slate-900/50 text-slate-300 border-slate-700/80 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* Section 1: Soil Characteristics & Season */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Soil Type */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-750">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                Soil Classification
              </span>
              <span className="text-[11px] font-normal text-slate-400">Texture & Profile</span>
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => handleChange('soilType', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              {SOIL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type} Soil
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-2">
              Affects water percolation, root penetration, and cation exchange capacity.
            </p>
          </div>

          {/* Season */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-750">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Cropping Season
              </span>
              <span className="text-[11px] font-normal text-slate-400">Target Cycle</span>
            </label>
            <select
              value={formData.season}
              onChange={(e) => handleChange('season', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              {SEASONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-2">
              Matches solar photoperiod, seasonal rainfall rhythms, and thermal units.
            </p>
          </div>

        </div>

        {/* Section 2: Soil pH Meter */}
        <div className="bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-750">
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                Soil Reaction (pH Level)
              </label>
              <span className="text-xs text-slate-400">Bioavailability of essential macro and micronutrients</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-400">{Number(formData.ph).toFixed(1)}</span>
              <span className={`block text-xs ${phStatus.color}`}>{phStatus.label}</span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="3.5"
              max="9.5"
              step="0.1"
              value={formData.ph}
              onChange={(e) => handleChange('ph', parseFloat(e.target.value))}
              className="w-full h-2.5 bg-gradient-to-r from-red-500 via-emerald-400 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>3.5 (Acidic)</span>
              <span>6.5 - 7.5 (Neutral Ideal)</span>
              <span>9.5 (Alkaline)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Primary Macronutrients (N - P - K) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Primary Soil Macronutrients (NPK)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Measured in kg/ha</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Nitrogen */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-emerald-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">N</span>
                  <p className="text-sm font-semibold text-white">Nitrogen</p>
                </div>
                <span className="text-xs font-mono text-slate-400">kg/ha</span>
              </div>
              <input
                type="number"
                min="0"
                max="250"
                value={formData.nitrogen}
                onChange={(e) => handleChange('nitrogen', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Foliage & vegetative growth</p>
            </div>

            {/* Phosphorus */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-emerald-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-blue-400 font-mono">P</span>
                  <p className="text-sm font-semibold text-white">Phosphorus</p>
                </div>
                <span className="text-xs font-mono text-slate-400">kg/ha</span>
              </div>
              <input
                type="number"
                min="0"
                max="200"
                value={formData.phosphorus}
                onChange={(e) => handleChange('phosphorus', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Root vigor & floral induction</p>
            </div>

            {/* Potassium */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-emerald-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-amber-400 font-mono">K</span>
                  <p className="text-sm font-semibold text-white">Potassium</p>
                </div>
                <span className="text-xs font-mono text-slate-400">kg/ha</span>
              </div>
              <input
                type="number"
                min="0"
                max="250"
                value={formData.potassium}
                onChange={(e) => handleChange('potassium', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Disease resistance & fruit filling</p>
            </div>

          </div>
        </div>

        {/* Section 4: Climate & Meteorological Inputs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Climate & Meteorological Metrics
            </h3>
            <span className="text-xs text-slate-400">Regional seasonal averages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Temperature */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  Temperature
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">{formData.temperature}°C</span>
              </div>
              <input
                type="number"
                min="5"
                max="48"
                step="0.5"
                value={formData.temperature}
                onChange={(e) => handleChange('temperature', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Mean seasonal range (°C)</p>
            </div>

            {/* Humidity */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  Rel. Humidity
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{formData.humidity}%</span>
              </div>
              <input
                type="number"
                min="10"
                max="100"
                value={formData.humidity}
                onChange={(e) => handleChange('humidity', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Atmospheric moisture (%)</p>
            </div>

            {/* Rainfall */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/70 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  Precipitation
                </span>
                <span className="text-xs font-mono text-blue-400 font-bold">{formData.rainfall} mm</span>
              </div>
              <input
                type="number"
                min="0"
                max="500"
                value={formData.rainfall}
                onChange={(e) => handleChange('rainfall', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Expected seasonal rainfall (mm)</p>
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 text-base disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Agronomic Suitability Model...</span>
              </>
            ) : (
              <>
                <span>Calculate Ranked Crop Recommendations</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
