from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.schemas.project import EnvelopeAssembly, Geometry

class OptimizationConfig(BaseModel):
    project_id: str
    target_metric: str  # cost, comfort, balance
    max_budget: Optional[float] = None
    variable_envelope: bool = True
    variable_openings: bool = True

class OptimizationSummary(BaseModel):
    project_id: str
    target_metric: str
    original_energy_demand_kwh: float
    optimized_energy_demand_kwh: float
    saving_percentage: float
    original_cost: float
    optimized_cost: float
    payback_years: float
    recommended_envelope: List[EnvelopeAssembly]
    recommended_geometry: Optional[Geometry] = None
    dataSource: str = "MOCK_DATA"
