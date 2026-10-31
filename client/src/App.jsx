import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AdvisoryDisclaimer from './components/AdvisoryDisclaimer';
import SoilClimateForm from './components/SoilClimateForm';
import RecommendationList from './components/RecommendationList';
import CropComparison from './components/CropComparison';
import CropsCatalog from './components/CropsCatalog';
import CropDetailModal from './components/CropDetailModal';
import { fetchRecommendations, fetchCropsList, checkServerHealth } from './utils/api';
import { Sparkles, Trophy, GitCompare, AlertTriangle, Layers, Sprout } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    soilType: 'Loamy',
    ph: 6.8,
    nitrogen: 90,
    phosphorus: 50,
    potassium: 45,
    temperature: 24,
    humidity: 65,
    rainfall: 110,
    season: 'Kharif'
  });

  const [recommendations, setRecommendations] = useState([]);
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('recommend'); // 'recommend' | 'compare' | 'crops'
  const [comparisonCrops, setComparisonCrops] = useState([]);
  const [modalCrop, setModalCrop] = useState(null);

  // Load initial recommendations & dataset on mount
  useEffect(() => {
    async function initApp() {
      setLoading(true);
      try {
        const [recData, cropsData] = await Promise.all([
          fetchRecommendations(formData),
          fetchCropsList().catch(() => ({ crops: [] }))
        ]);

        if (recData.success && recData.recommendations) {
          setRecommendations(recData.recommendations);
          // Pre-select top 2 crops for comparison convenience
          if (recData.recommendations.length >= 2) {
            setComparisonCrops([recData.recommendations[0], recData.recommendations[1]]);
          }
        }

        if (cropsData.success && cropsData.crops) {
          setAllCrops(cropsData.crops);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to connect to backend recommendation server. Ensure the server is running on port 5000.');
      } finally {
        setLoading(false);
      }
    }

    initApp();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRecommendations(formData);
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
        // Update comparison crops with newly scored objects if already chosen
        setComparisonCrops(prev => {
          if (prev.length === 2) {
            const updatedA = data.recommendations.find(r => r.id === prev[0].id) || prev[0];
            const updatedB = data.recommendations.find(r => r.id === prev[1].id) || prev[1];
            return [updatedA, updatedB];
          } else if (data.recommendations.length >= 2) {
            return [data.recommendations[0], data.recommendations[1]];
          }
          return prev;
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Error occurred while computing recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Toggle selection for comparison
  const handleToggleComparison = (crop) => {
    setComparisonCrops(prev => {
      const exists = prev.some(c => c.id === crop.id);
      if (exists) {
        return prev.filter(c => c.id !== crop.id);
      }
      if (prev.length >= 2) {
        // Replace second crop if already 2 selected
        return [prev[0], crop];
      }
      return [...prev, crop];
    });
  };

  // Swap crops in comparison view
  const handleSwapCrops = () => {
    if (comparisonCrops.length === 2) {
      setComparisonCrops([comparisonCrops[1], comparisonCrops[0]]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Find crops to display in comparison view
  const cropA = comparisonCrops[0] || recommendations[0] || allCrops[0];
  const cropB = comparisonCrops[1] || recommendations[1] || allCrops[1];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        comparisonCount={comparisonCrops.length}
        onPrintReport={handlePrint}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-between gap-3 text-sm text-rose-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-900/60 hover:bg-rose-800 text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Recommendation Engine View */}
        {activeTab === 'recommend' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hackathon Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/60 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>College Hackathon Project: HACK-P302</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Intelligent Crop Recommendation & Advisory System
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Precision agronomic decision engine synthesizing soil nutrient profiles (N, P, K, pH), seasonal weather metrics, and soil classifications to predict optimal cultivar yield and minimize crop failure risk.
                </p>
              </div>

              {/* Decorative background glow */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Mandatory Advisory Disclaimer Banner */}
            <AdvisoryDisclaimer />

            {/* Grid Layout: Input Form on Left/Top, Recommendations on Right/Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Soil & Climate Input Form */}
              <div className="lg:col-span-5 sticky top-24">
                <SoilClimateForm 
                  formData={formData} 
                  setFormData={setFormData} 
                  onSubmit={handleFormSubmit} 
                  loading={loading}
                />
              </div>

              {/* Right Column: Ranked Recommendations */}
              <div className="lg:col-span-7">
                <RecommendationList 
                  recommendations={recommendations}
                  onSelectForComparison={handleToggleComparison}
                  comparisonCrops={comparisonCrops}
                  onViewDetails={(crop) => setModalCrop(crop)}
                  onNavigateToCompare={() => setActiveTab('compare')}
                />
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Side-by-Side Crop Comparison View */}
        {activeTab === 'compare' && (
          <div className="animate-fadeIn space-y-6">
            <AdvisoryDisclaimer />
            <CropComparison 
              cropA={cropA}
              cropB={cropB}
              allCrops={recommendations.length > 0 ? recommendations : allCrops}
              onSelectCropA={(crop) => setComparisonCrops([crop, cropB])}
              onSelectCropB={(crop) => setComparisonCrops([cropA, crop])}
              onSwapCrops={handleSwapCrops}
            />
          </div>
        )}

        {/* Tab 3: Crop Catalog / Knowledgebase View */}
        {activeTab === 'crops' && (
          <div className="animate-fadeIn space-y-6">
            <AdvisoryDisclaimer />
            <CropsCatalog 
              crops={allCrops.length > 0 ? allCrops : recommendations}
              onViewDetails={(crop) => setModalCrop(crop)}
              onSelectForComparison={handleToggleComparison}
              comparisonCrops={comparisonCrops}
            />
          </div>
        )}

      </main>

      {/* Detail Modal */}
      {modalCrop && (
        <CropDetailModal 
          crop={modalCrop} 
          onClose={() => setModalCrop(null)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            🌱 <strong>Crop Recommendation System (HACK-P302)</strong> — Precision Agriculture Full-Stack Solution
          </p>
          <p className="text-slate-400">
            Node.js / Express & React Vite Single-Server Architecture • Ready for Render Deployment
          </p>
        </div>
      </footer>

    </div>
  );
}
