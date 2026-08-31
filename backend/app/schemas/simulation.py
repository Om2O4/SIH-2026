from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class SimulationConfig(BaseModel):
    project_id: str
    run_type: str = "fast_thermal"  # fast_thermal, full_dynamic, comfort_only

class SimulationResults(BaseModel):
    heating_demand_kwh: float
    cooling_demand_kwh: float
    peak_heating_load_kw: float
    peak_cooling_load_kw: float
    average_indoor_temp: float
    max_indoor_temp: float
    min_indoor_temp: float
    monthly_heating_kwh: List[float]
    monthly_cooling_kwh: List[float]
    comfort_hours_percent: float

class SimulationState(BaseModel):
    id: Optional[str] = None
    project_id: str
    status: str  # pending, completed, failed
    created_at: str
    config: SimulationConfig
    results: Optional[SimulationResults] = None
    dataSource: str = "MOCK_DATA"
