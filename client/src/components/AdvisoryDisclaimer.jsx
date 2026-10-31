import React, { useState } from 'react';
import { AlertTriangle, Info, ChevronDown, ChevronUp, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AdvisoryDisclaimer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 sm:p-5 my-6 backdrop-blur-sm transition-all shadow-lg shadow-amber-950/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-amber-300">
                Agronomic Advisory & Decision-Support Notice
              </h3>
              <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Advisory Only
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              This system computes suitability match scores using multi-parameter heuristic models (N-P-K, pH, temperature, humidity, rainfall, and soil classification).
              Results serve strictly as a <strong>decision-support tool</strong> and should not replace localized laboratory soil tests or certified extension agronomist consultation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-md hover:bg-amber-500/10 transition-colors"
        >
          <span>{expanded ? 'Less Info' : 'Protocol Details'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-3 border-t border-amber-500/20 text-xs text-slate-300 space-y-2.5 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">1. Soil Lab Verification</span>
              Laboratory chemical analysis (Walkley-Black, Bray/Olsen method) gives precise micronutrient and electrical conductivity (EC) profiles.
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">2. Local Micro-Climate</span>
              Regional microclimates, frost risk, drainage topography, and erratic monsoon patterns must be factored prior to seed procurement.
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">3. Agricultural Extension</span>
              Farmers are strongly advised to coordinate with nearest Krishi Vigyan Kendras (KVK), Agricultural Universities, or local Block Development Offices.
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Hackathon Project HACK-P302 Reference: Algorithmic parameters follow ICAR & FAO standard agro-climatic crop suitability bands.
          </p>
        </div>
      )}
    </div>
  );
}
