import React from 'react';
import { Sprout, GitCompare, BookOpen, Layers, Printer, Sparkles, CheckCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, comparisonCount, onPrintReport }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Project ID Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Agri<span className="text-emerald-400">Match</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  HACK-P302
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Precision Crop Recommendation & Decision Support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('recommend')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'recommend'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Recommendations</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'compare'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare</span>
              {comparisonCount > 0 && (
                <span className={`px-1.5 py-0.2 text-xs rounded-full ${
                  activeTab === 'compare' ? 'bg-slate-900 text-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {comparisonCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('crops')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'crops'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Crops Catalog</span>
              <span className="sm:hidden">Catalog</span>
            </button>
          </nav>

          {/* Actions & Print */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrintReport}
              title="Print Agronomic Assessment Report"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
            >
              <Printer className="w-4 h-4" />
            </button>
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>API Live</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
