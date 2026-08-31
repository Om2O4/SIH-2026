import React from 'react';
import { Box, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DigitalTwin3D } from '../components/visualizer/DigitalTwin3D';

export const DigitalTwinPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] hover:text-[#0B2559] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
              <Box className="w-5 h-5 mr-2 text-[#2563A9]" />
              3D Digital Twin — Interactive Thermal Explorer
            </h1>
            <p className="text-xs text-[#64748B]">
              Real-time 3D model of passive solar building envelope and winter sun trajectory
            </p>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
        <DigitalTwin3D height="560px" />
      </div>

      {/* Engineering Callout Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1.5">
          <h4 className="text-xs font-bold text-[#0B2559]">South-Facing Direct Gain Glazing</h4>
          <p className="text-[11px] text-[#64748B]">
            Positioned at 180° true azimuth with 0.9m overhang louver to capture low winter sun while blocking high summer heat.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1.5">
          <h4 className="text-xs font-bold text-[#0B2559]">High Thermal Mass Plinth</h4>
          <p className="text-[11px] text-[#64748B]">
            400mm local granite base provides thermal inertia, releasing stored solar energy during -15°C night drops.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1.5">
          <h4 className="text-xs font-bold text-[#0B2559]">Integrated Solar PV & Roof Angle</h4>
          <p className="text-[11px] text-[#64748B]">
            Pitched at 45° latitude-optimized angle for maximum winter electrical generation and natural snow shedding.
          </p>
        </div>
      </div>
    </div>
  );
};
