export interface ProjectInfo {
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number;
}

export interface ClimateData {
  climate_zone: string;
  heating_degree_days: number;
  cooling_degree_days: number;
  monthly_temps: number[];
  monthly_solar_rad: number[];
  data_source: string;
}

export interface Geometry {
  width: number;
  length: number;
  height: number;
  orientation: number;
  number_of_floors: number;
}

export interface MaterialLayer {
  material_name: string;
  thickness: number;
  cost: number;
  thermal_conductivity: number;
  density: number;
  specific_heat: number;
}

export interface EnvelopeAssembly {
  assembly_type: 'roof' | 'wall' | 'floor' | string;
  layers: MaterialLayer[];
}

export interface Opening {
  opening_type: 'window' | 'door' | string;
  direction: 'North' | 'South' | 'East' | 'West' | string;
  width: number;
  height: number;
  shading_factor: number;
  u_value: number;
  shgc: number;
}

export interface OperationSchedule {
  heating_setpoint: number;
  cooling_setpoint: number;
  occupancy_schedule: number[];
  lighting_load: number;
  equipment_load: number;
}

export interface AdvancedOptions {
  infiltration_rate: number;
  natural_ventilation: boolean;
  thermal_mass_activated: boolean;
}

export interface OptimizationSettings {
  target_metric: 'energy_cost' | 'carbon_footprint' | 'thermal_comfort' | string;
  max_budget?: number;
  allowed_materials: string[];
}

export interface Constraints {
  max_cost_per_sqm?: number;
  min_indoor_temp: number;
  max_indoor_temp: number;
  max_u_value_walls: number;
  max_u_value_roof: number;
}

export interface ProjectState {
  id?: string;
  project_info: ProjectInfo;
  location: Location;
  climate_data: ClimateData;
  geometry: Geometry;
  envelope: EnvelopeAssembly[];
  openings: Opening[];
  operation: OperationSchedule;
  advanced: AdvancedOptions;
  optimization: OptimizationSettings;
  constraints: Constraints;
  dataSource: string;
}

export interface SimulationConfig {
  project_id: string;
  run_type: string;
}

export interface SimulationResults {
  heating_demand_kwh: number;
  cooling_demand_kwh: number;
  peak_heating_load_kw: number;
  peak_cooling_load_kw: number;
  average_indoor_temp: number;
  max_indoor_temp: number;
  min_indoor_temp: number;
  monthly_heating_kwh: number[];
  monthly_cooling_kwh: number[];
  comfort_hours_percent: number;
}

export interface SimulationState {
  id?: string;
  project_id: string;
  status: 'pending' | 'completed' | 'failed' | string;
  created_at: string;
  config: SimulationConfig;
  results?: SimulationResults;
  dataSource: string;
}

export interface OptimizationConfig {
  project_id: string;
  target_metric: string;
  max_budget?: number;
  variable_envelope: boolean;
  variable_openings: boolean;
}

export interface OptimizationSummary {
  project_id: string;
  target_metric: string;
  original_energy_demand_kwh: number;
  optimized_energy_demand_kwh: number;
  saving_percentage: number;
  original_cost: number;
  optimized_cost: number;
  payback_years: number;
  recommended_envelope: EnvelopeAssembly[];
  recommended_geometry?: Geometry;
  dataSource: string;
}
