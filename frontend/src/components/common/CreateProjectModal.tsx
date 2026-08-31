import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Compass, Cpu, ArrowRight, MapPin, Building } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('New Alpine Passive Shelter');
  const [location, setLocation] = useState('Leh, Ladakh');
  const [selectedMode, setSelectedMode] = useState<'simple' | 'expert'>('simple');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    if (selectedMode === 'simple') {
      navigate('/simple', { state: { projectName, location } });
    } else {
      navigate('/expert/project', { state: { projectName, location } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B2559] text-white flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B2559] font-display">Create New Passive Shelter Project</h3>
              <p className="text-xs text-[#64748B]">Choose an engineering mode to start configuring</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-[#64748B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#172033]">Project Name</label>
            <div className="relative">
              <Building className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563A9] bg-[#F8FAFC]"
                placeholder="e.g., Zanskar Eco Lodge"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#172033]">High-Altitude Climate Station</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563A9] bg-[#F8FAFC]"
              >
                <option>Leh, Ladakh (3,500m ASL)</option>
                <option>Kargil, Ladakh (2,676m ASL)</option>
                <option>Nubra Valley (3,048m ASL)</option>
                <option>Dras — Extreme Cold (3,280m ASL)</option>
                <option>Zanskar / Padum (3,600m ASL)</option>
                <option>Nyoma / Changthang (4,180m ASL)</option>
              </select>
            </div>
          </div>

          {/* Mode Selection Choice */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-[#172033]">Select Design Workflow Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setSelectedMode('simple')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedMode === 'simple'
                    ? 'border-[#2E7D4F] bg-[#DDF3E4]/30 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 text-[#2E7D4F] font-bold text-xs mb-1">
                  <Compass className="w-4 h-4" />
                  <span>SIMPLE MODE</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">
                  Quick 4-step wizard with auto physics synthesis. Best for homeowners & fast proposals.
                </p>
              </div>

              <div
                onClick={() => setSelectedMode('expert')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedMode === 'expert'
                    ? 'border-[#6546A5] bg-gradient-to-br from-white via-[#FAF7FD] to-[#F1EAFA] shadow-xs'
                    : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 text-[#6546A5] font-bold text-xs mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>EXPERT MODE</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">
                  8-step CAD studio with custom layer U-values, PCM modeling, and genetic Pareto optimizer.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold text-[#64748B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-md cursor-pointer ${
                selectedMode === 'simple' ? 'bg-[#2E7D4F] hover:bg-[#256640]' : 'bg-[#6546A5] hover:bg-[#523887]'
              }`}
            >
              <span>{selectedMode === 'simple' ? 'Start in Simple Mode' : 'Start in Expert Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
