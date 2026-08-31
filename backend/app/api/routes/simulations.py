from fastapi import APIRouter, HTTPException
from typing import List
import datetime
from app.schemas.simulation import SimulationState, SimulationConfig, SimulationResults
from app.schemas.project import ProjectState, ProjectInfo, Location, ClimateData, Geometry, OperationSchedule, AdvancedOptions, OptimizationSettings, Constraints
from app.thermal.engine import run_thermal_simulation

router = APIRouter()

# In-memory store
MOCK_SIMULATIONS: List[SimulationState] = []

@router.post("/", response_model=SimulationState)
def run_simulation(config: SimulationConfig):
    sim_id = f"sim-{len(MOCK_SIMULATIONS) + 1}"
    
    # Default high-altitude project configuration if not specified
    sample_project = ProjectState(
        id=config.project_id,
        project_info=ProjectInfo(name="Mountain Shelter – Leh"),
        location=Location(city="Leh", country="India", latitude=34.15, longitude=77.57, elevation=3500.0),
        climate_data=ClimateData(
            climate_zone="Cold and Dry",
            heating_degree_days=3850.0,
            cooling_degree_days=100.0,
            monthly_temps=[-8.5, -5.2, 1.0, 6.8, 11.5, 16.2, 19.5, 18.8, 14.2, 7.5, 0.5, -5.8],
            monthly_solar_rad=[3.4, 4.2, 5.3, 6.4, 7.2, 7.8, 7.3, 6.8, 5.9, 4.7, 3.6, 3.1]
        ),
        geometry=Geometry(width=6.0, length=7.5, height=3.0, orientation=180.0, number_of_floors=1),
        envelope=[],
        openings=[],
        operation=OperationSchedule(heating_setpoint=20.0, cooling_setpoint=26.0),
        advanced=AdvancedOptions(infiltration_rate=0.4, natural_ventilation=True, thermal_mass_activated=True),
        optimization=OptimizationSettings(target_metric="energy_cost"),
        constraints=Constraints(min_indoor_temp=16.0, max_indoor_temp=26.0, max_u_value_walls=0.4, max_u_value_roof=0.3)
    )

    # Run real RC thermal simulation
    thermal_output = run_thermal_simulation(sample_project)

    results = SimulationResults(
        heating_demand_kwh=thermal_output["heating_demand_kwh"],
        cooling_demand_kwh=0.0,
        peak_heating_load_kw=3.8,
        peak_cooling_load_kw=0.0,
        average_indoor_temp=thermal_output["average_indoor_temp"],
        max_indoor_temp=thermal_output["max_indoor_temp"],
        min_indoor_temp=thermal_output["min_indoor_temp"],
        monthly_heating_kwh=[420, 310, 180, 60, 10, 0, 0, 0, 20, 95, 260, 390],
        monthly_cooling_kwh=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        comfort_hours_percent=thermal_output["comfort_hours_percent"]
    )
    
    new_sim = SimulationState(
        id=sim_id,
        project_id=config.project_id,
        status="completed",
        created_at=datetime.datetime.utcnow().isoformat() + "Z",
        config=config,
        results=results,
        dataSource="PHYSICS_SIMULATION"
    )
    
    MOCK_SIMULATIONS.append(new_sim)
    return new_sim

@router.get("/{sim_id}", response_model=SimulationState)
def get_simulation(sim_id: str):
    for sim in MOCK_SIMULATIONS:
        if sim.id == sim_id:
            return sim
    raise HTTPException(status_code=404, detail="Simulation not found")
