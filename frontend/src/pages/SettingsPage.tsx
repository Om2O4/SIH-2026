import React from 'react';
import { Settings, Shield, Database } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-[#E2E8F0] pb-5">
        <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
          <Settings className="w-5 h-5 mr-2 text-[#2563A9]" />
          Platform Settings & Engineering Preferences
        </h1>
        <p className="text-xs text-[#64748B]">Configure simulation tolerances, default climate stations, and API integrations</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#0B2559] flex items-center">
            <Database className="w-4 h-4 mr-2 text-[#2563A9]" />
            Climate Data Provider
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#64748B] mb-1 font-semibold">Primary Weather API</label>
              <select className="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <option>NASA POWER High-Altitude Solar Database (Synced)</option>
                <option>IMD (Indian Meteorological Dept) Ladakh Station Network</option>
                <option>Open-Meteo High Resolution Alpine Reanalysis</option>
              </select>
            </div>
            <div>
              <label className="block text-[#64748B] mb-1 font-semibold">Design Day Winter Temperature Base</label>
              <select className="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <option>99.6% ASHRAE Extreme Winter (-16.2°C)</option>
                <option>99.0% Typical Cold Day (-12.0°C)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#0B2559] flex items-center">
            <Shield className="w-4 h-4 mr-2 text-[#2E7D4F]" />
            Building Standard & Code Compliance
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#64748B] mb-1 font-semibold">Thermal Envelope Code</label>
              <select className="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <option>ECBC-R (Energy Conservation Building Code - Residential India)</option>
                <option>ASHRAE Standard 90.1 - Cold Climate Zone 7/8</option>
                <option>Passivhaus Cold Alpine Standard</option>
              </select>
            </div>
            <div>
              <label className="block text-[#64748B] mb-1 font-semibold">Indoor Comfort Target Range</label>
              <select className="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <option>Adaptive Comfort (18°C – 24°C High Altitude)</option>
                <option>Strict 20°C Constant Setpoint</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
