from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ProjectInfo(BaseModel):
    name: str
    description: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class Location(BaseModel):
    city: str
    country: str
    latitude: float
    longitude: float
    elevation: float

class ClimateData(BaseModel):
    climate_zone: str
    heating_degree_days: float
    cooling_degree_days: float
    monthly_temps: List[float]
    monthly_solar_rad: List[float]
    data_source: str = "MOCK_DATA"  # Clearly distinguish MOCK vs REAL

class Geometry(BaseModel):
    width: float = Field(..., description="Width in meters")
    length: float = Field(..., description="Length in meters")
    height: float = Field(..., description="Height in meters")
    orientation: float = Field(..., description="Orientation angle in degrees relative to North")
    number_of_floors: int = 1

class MaterialLayer(BaseModel):
    material_name: str
    thickness: float = Field(..., description="Thickness in meters")
    cost: float = Field(..., description="Cost per unit thickness or area")
    thermal_conductivity: float
    density: float
    specific_heat: float

class EnvelopeAssembly(BaseModel):
    assembly_type: str  # roof, wall, floor
    layers: List[MaterialLayer]

class Opening(BaseModel):
    opening_type: str  # window, door
    direction: str  # North, South, East, West
    width: float
    height: float
    shading_factor: float = 1.0
    u_value: float
    shgc: float  # Solar Heat Gain Coefficient

class OperationSchedule(BaseModel):
    heating_setpoint: float = 20.0
    cooling_setpoint: float = 26.0
    occupancy_schedule: List[float] = Field(default_factory=list, description="24 hours multiplier")
    lighting_load: float = 5.0  # W/m2
    equipment_load: float = 5.0  # W/m2

class AdvancedOptions(BaseModel):
    infiltration_rate: float = 0.5  # Air changes per hour
    natural_ventilation: bool = True
    thermal_mass_activated: bool = True

class OptimizationSettings(BaseModel):
    target_metric: str = "energy_cost"  # energy_cost, carbon_footprint, thermal_comfort
    max_budget: Optional[float] = None
    allowed_materials: List[str] = []

class Constraints(BaseModel):
    max_cost_per_sqm: Optional[float] = None
    min_indoor_temp: float = 18.0
    max_indoor_temp: float = 28.0
    max_u_value_walls: float = 0.4
    max_u_value_roof: float = 0.3

class ProjectState(BaseModel):
    id: Optional[str] = None
    project_info: ProjectInfo
    location: Location
    climate_data: ClimateData
    geometry: Geometry
    envelope: List[EnvelopeAssembly] = []
    openings: List[Opening] = []
    operation: OperationSchedule
    advanced: AdvancedOptions
    optimization: OptimizationSettings
    constraints: Constraints
    dataSource: str = "MOCK_DATA"  # Distinguish mock from future db sources
