import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Dashboard } from '../pages/Dashboard';
import { LoginPage } from '../pages/LoginPage';
import { SimpleModePage } from '../pages/SimpleModePage';
import { ResultsDashboard } from '../pages/ResultsDashboard';
import { WhatIfStudio } from '../pages/WhatIfStudio';
import { CompareDesignsPage } from '../pages/CompareDesignsPage';
import { ClimateDataPage } from '../pages/ClimateDataPage';
import { DigitalTwinPage } from '../pages/DigitalTwinPage';
import { ProjectsListPage } from '../pages/ProjectsListPage';
import { ReportsPage } from '../pages/ReportsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ExpertLayout } from '../layouts/ExpertLayout';
import { ProjectSetup } from '../pages/expert/ProjectSetup';
import { GeometrySetup } from '../pages/expert/GeometrySetup';
import { EnvelopeSetup } from '../pages/expert/EnvelopeSetup';
import { OpeningsSetup } from '../pages/expert/OpeningsSetup';
import { OperationSetup } from '../pages/expert/OperationSetup';
import { AdvancedSetup } from '../pages/expert/AdvancedSetup';
import { OptimizationSetup } from '../pages/expert/OptimizationSetup';
import { ReviewSetup } from '../pages/expert/ReviewSetup';

export const router = createBrowserRouter([
  // Fullscreen Authentication Route
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Fullscreen Simple Mode Wizard Route (Dedicated Studio)
  {
    path: '/simple',
    element: <SimpleModePage />,
  },
  {
    path: '/new-project',
    element: <SimpleModePage />,
  },
  // Fullscreen Expert Mode CAD Studio (Dedicated Workspace)
  {
    path: '/expert',
    element: <ExpertLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/expert/project" replace />,
      },
      {
        path: 'project',
        element: <ProjectSetup />,
      },
      {
        path: 'geometry',
        element: <GeometrySetup />,
      },
      {
        path: 'envelope',
        element: <EnvelopeSetup />,
      },
      {
        path: 'openings',
        element: <OpeningsSetup />,
      },
      {
        path: 'operation',
        element: <OperationSetup />,
      },
      {
        path: 'advanced',
        element: <AdvancedSetup />,
      },
      {
        path: 'optimization',
        element: <OptimizationSetup />,
      },
      {
        path: 'review',
        element: <ReviewSetup />,
      },
    ],
  },
  // Main Dashboard & Project Management Application Layout
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <ProjectsListPage />,
      },
      {
        path: 'climate-data',
        element: <ClimateDataPage />,
      },
      {
        path: 'results',
        element: <ResultsDashboard />,
      },
      {
        path: '3d-twin',
        element: <DigitalTwinPage />,
      },
      {
        path: 'what-if',
        element: <WhatIfStudio />,
      },
      {
        path: 'compare',
        element: <CompareDesignsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
