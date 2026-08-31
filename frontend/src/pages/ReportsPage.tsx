import React from 'react';
import { FileText, Download } from 'lucide-react';
import { generatePdfReport } from '../services/reportGenerator';

export const ReportsPage: React.FC = () => {

  const handleDownload = (projectName: string, loc: string) => {
    generatePdfReport({
      projectName,
      location: loc,
      shelterType: 'Passive Solar Thermal Shelter',
      area: 45,
      occupants: 4,
      comfortScore: 92,
      heatingNeed: 18,
      estCost: '6.35 Lakh',
      solarUtilization: 68,
      whyPoints: [
        'Maximizes solar gain in winter (180° South Orientation with high SHGC glazing)',
        'High thermal mass (300mm Rammed Earth + Stone Plinth) stores daytime solar heat',
        'Optimized envelope insulation (U = 0.22 W/m²K) prevents sub-zero night heat loss',
        'Controlled summer ventilation shading overhangs prevent overheating'
      ],
      keyFeatures: [
        'Passive Solar Design',
        'High Insulation Efficiency',
        'Thermal Mass Walls',
        'Natural Ventilation'
      ]
    });
  };

  const reports = [
    {
      title: 'Mountain Shelter — Leh (Full Engineering Diagnostic)',
      location: 'Leh, Ladakh',
      date: 'Aug 30, 2026',
      size: '2.4 MB',
      type: 'PDF Summary',
      score: 92
    },
    {
      title: 'Off-grid Cabin — Kargil (Thermal RC Validation)',
      location: 'Kargil, Ladakh',
      date: 'Aug 29, 2026',
      size: '3.1 MB',
      type: 'PDF Technical',
      score: 94
    },
    {
      title: 'Research Shelter — Nubra (Multi-Objective Pareto Analysis)',
      location: 'Diskit, Nubra',
      date: 'Aug 27, 2026',
      size: '1.8 MB',
      type: 'PDF Summary',
      score: 88
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#2563A9]" />
            Generated Reports & Technical Exports
          </h1>
          <p className="text-xs text-[#64748B]">Download PDF engineering briefs and compliance documentation</p>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#2563A9]/40 transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] text-[#2563A9] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B2559]">{r.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">{r.location} • Generated {r.date} • {r.size}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">
                    Comfort: {r.score}/100
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">ECBC-R Cold Standard</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleDownload(r.title, r.location)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0B2559] hover:bg-[#2563A9] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
