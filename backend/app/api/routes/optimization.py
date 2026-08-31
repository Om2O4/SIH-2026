from fastapi import APIRouter
from app.schemas.optimization import OptimizationConfig, OptimizationSummary
from app.optimization.engine import run_genetic_optimization

router = APIRouter()

@router.post("/", response_model=OptimizationSummary)
def optimize(config: OptimizationConfig):
    return run_genetic_optimization(config)
