from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.project import ProjectState, ProjectInfo, Location, ClimateData, Geometry, OperationSchedule, AdvancedOptions, OptimizationSettings, Constraints

router = APIRouter()

# In-memory mock database
MOCK_PROJECTS: List[ProjectState] = [
    ProjectState(
        id="proj-1",
        project_info=ProjectInfo(name="Leh Passive Shelter", description="A cold-dry climate shelter design mockup", created_at="2026-08-30T00:00:00Z"),
        location=Location(city="Leh", country="India", latitude=34.15, longitude=77.57, elevation=3500.0),
        climate_data=ClimateData(
            climate_zone="Cold and Dry",
            heating_degree_days=3800.0,
            cooling_degree_days=100.0,
            monthly_temps=[-8.0, -5.0, 0.0, 6.0, 11.0, 16.0, 19.0, 18.0, 13.0, 7.0, 0.0, -5.0],
            monthly_solar_rad=[3.2, 4.1, 5.3, 6.5, 7.2, 7.8, 7.4, 6.9, 5.8, 4.6, 3.5, 2.9],
            data_source="MOCK_DATA"
        ),
        geometry=Geometry(width=8.0, length=12.0, height=3.0, orientation=180.0, number_of_floors=1),
        envelope=[],
        openings=[],
        operation=OperationSchedule(),
        advanced=AdvancedOptions(),
        optimization=OptimizationSettings(),
        constraints=Constraints(),
        dataSource="MOCK_DATA"
    )
]

@router.post("/", response_model=ProjectState)
def create_project(project: ProjectState):
    # Set a mock ID and save in-memory
    new_id = f"proj-{len(MOCK_PROJECTS) + 1}"
    project.id = new_id
    project.dataSource = "MOCK_DATA"
    MOCK_PROJECTS.append(project)
    return project

@router.get("/", response_model=List[ProjectState])
def get_projects():
    return MOCK_PROJECTS

@router.get("/{project_id}", response_model=ProjectState)
def get_project(project_id: str):
    for project in MOCK_PROJECTS:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")
