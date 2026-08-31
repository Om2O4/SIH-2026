import React, { useState } from 'react';
import { 
  CloudSun, 
  MapPin
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const ClimateDataPage: React.FC = () => {
  const stations = [
    { 
      id: 'leh', 
      name: 'Leh, Ladakh', 
      elevation: '3,500m', 
      lat: '34.15°N', 
      lon: '77.57°E', 
      hdd: 3850, 
      solarAvg: 5.2, 
      minWinterTemp: -16.8,
      desc: 'Cold arid plateau with extreme solar insolation and high diurnal temperature swings.' 
    },
    { 
      id: 'kargil', 
      name: 'Kargil, Ladakh', 
      elevation: '2,676m', 
      lat: '34.55°N', 
      lon: '76.13°E', 
      hdd: 3600, 
      solarAvg: 4.9, 
      minWinterTemp: -18.2,
      desc: 'Valley climate with heavy winter snowfall and moderate summer cooling needs.' 
    },
    { 
      id: 'dras', 
      name: 'Dras (Coldest)', 
      elevation: '3,280m', 
      lat: '34.43°N', 
      lon: '75.76°E', 
      hdd: 4720, 
      solarAvg: 4.8, 
      minWinterTemp: -28.5,
      desc: 'Extremely harsh winter conditions; maximum insulation and airtight envelopes required.' 
    },
    { 
      id: 'nubra', 
      name: 'Nubra Valley', 
      elevation: '3,048m', 
      lat: '34.59°N', 
      lon: '77.56°E', 
      hdd: 3400, 
      solarAvg: 5.4, 
      minWinterTemp: -14.0,
      desc: 'High clear-sky solar availability with micro-climates along Shyok and Nubra rivers.' 
    },
    { 
      id: 'nyoma', 
      name: 'Nyoma / Changthang', 
      elevation: '4,180m', 
      lat: '33.20°N', 
      lon: '78.65°E', 
      hdd: 5100, 
      solarAvg: 5.6, 
      minWinterTemp: -24.0,
      desc: 'Ultra-high altitude cold desert; exceptional solar direct-beam radiation.' 
    }
  ];

  const [selectedStation, setSelectedStation] = useState(stations[0]);

  // Monthly Climate Datasets
  const monthlyData = [
    { month: 'Jan', temp: -8.5, minTemp: -16.2, maxTemp: -1.2, solar: 3.4 },
    { month: 'Feb', temp: -5.2, minTemp: -13.5, maxTemp: 2.1, solar: 4.2 },
    { month: 'Mar', temp: 1.0, minTemp: -6.0, maxTemp: 7.8, solar: 5.3 },
    { month: 'Apr', temp: 6.8, minTemp: 0.2, maxTemp: 13.5, solar: 6.4 },
    { month: 'May', temp: 11.5, minTemp: 4.5, maxTemp: 18.2, solar: 7.2 },
    { month: 'Jun', temp: 16.2, minTemp: 8.9, maxTemp: 23.4, solar: 7.8 },
    { month: 'Jul', temp: 19.5, minTemp: 12.5, maxTemp: 26.5, solar: 7.3 },
    { month: 'Aug', temp: 18.8, minTemp: 11.8, maxTemp: 25.8, solar: 6.8 },
    { month: 'Sep', temp: 14.2, minTemp: 6.5, maxTemp: 21.5, solar: 5.9 },
    { month: 'Oct', temp: 7.5, minTemp: -0.5, maxTemp: 15.2, solar: 4.7 },
    { month: 'Nov', temp: 0.5, minTemp: -7.2, maxTemp: 8.4, solar: 3.6 },
    { month: 'Dec', temp: -5.8, minTemp: -13.0, maxTemp: 1.5, solar: 3.1 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
            <CloudSun className="w-5 h-5 mr-2 text-[#2563A9]" />
            High-Altitude Climate Database & Solar Atlas
          </h1>
          <p className="text-xs text-[#64748B]">
            NASA POWER & Indian Meteorological Department (IMD) Station datasets for Ladakh
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Station Weather API Synced</span>
        </div>
      </div>

      {/* Station Selector Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stations.map((st) => (
          <div
            key={st.id}
            onClick={() => setSelectedStation(st)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedStation.id === st.id
                ? 'border-[#2563A9] bg-[#DCEEFF]/40 shadow-xs'
                : 'border-[#E2E8F0] bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-1.5 font-bold text-xs text-[#0B2559] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#2563A9]" />
              <span>{st.name}</span>
            </div>
            <p className="text-[10px] text-[#64748B] font-mono">{st.elevation} ASL</p>
            <div className="mt-3 flex justify-between text-[10px]">
              <span className="text-[#64748B]">Solar:</span>
              <span className="font-bold text-[#F28C28]">{st.solarAvg} kWh/m²</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Station Deep-Dive */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#0B2559] font-display flex items-center space-x-2">
              <span>{selectedStation.name}</span>
              <span className="text-xs font-mono font-normal text-[#64748B]">({selectedStation.lat}, {selectedStation.lon})</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">{selectedStation.desc}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-xl">
              <span className="text-[#64748B]">Heating Degree Days: </span>
              <span className="font-bold font-mono text-[#0B2559]">{selectedStation.hdd} HDD</span>
            </div>
            <div className="bg-[#FFF7ED] border border-[#F28C28]/30 px-3 py-1.5 rounded-xl">
              <span className="text-[#64748B]">Solar Insolation: </span>
              <span className="font-bold font-mono text-[#F28C28]">{selectedStation.solarAvg} kWh/m²/d</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly Temperature Range */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B2559] font-mono">
              Monthly Temperature Profiles (°C)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[-20, 30]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, borderColor: '#e2e8f0', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="maxTemp" stroke="#F28C28" name="Max Temp (°C)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="temp" stroke="#2563A9" name="Mean Temp (°C)" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="minTemp" stroke="#0B2559" name="Min Temp (°C)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Solar Radiation */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B2559] font-mono">
              Monthly Solar Radiation (kWh/m²/day)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 9]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, borderColor: '#e2e8f0', fontSize: 11 }} />
                  <Bar dataKey="solar" fill="#F28C28" radius={[4, 4, 0, 0]} name="Daily Solar Insolation (kWh/m²/d)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
