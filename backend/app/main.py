from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, projects, simulations, optimization

app = FastAPI(
    title="CLIMASHELTER AI API",
    description="Backend API for AI-powered Passive Shelter Design and Optimization",
    version="0.1.0"
)

# Configure CORS so frontend React app can access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(simulations.router, prefix="/api/simulations", tags=["Simulations"])
app.include_router(optimization.router, prefix="/api/optimization", tags=["Optimization"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
