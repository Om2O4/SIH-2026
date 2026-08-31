import type { ProjectState, SimulationConfig, SimulationState, OptimizationConfig, OptimizationSummary } from '../types/engineering';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface HealthResponse {
  status: string;
  application: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch health status');
  }
  return response.json();
}

export async function getProjects(): Promise<ProjectState[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function getProject(id: string): Promise<ProjectState> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch project ${id}`);
  }
  return response.json();
}

export async function createProject(project: ProjectState): Promise<ProjectState> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
}

export async function runSimulation(config: SimulationConfig): Promise<SimulationState> {
  const response = await fetch(`${API_BASE_URL}/api/simulations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new Error('Failed to trigger simulation');
  }
  return response.json();
}

export async function getSimulation(id: string): Promise<SimulationState> {
  const response = await fetch(`${API_BASE_URL}/api/simulations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch simulation ${id}`);
  }
  return response.json();
}

export async function runOptimization(config: OptimizationConfig): Promise<OptimizationSummary> {
  const response = await fetch(`${API_BASE_URL}/api/optimization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new Error('Failed to run optimization');
  }
  return response.json();
}
