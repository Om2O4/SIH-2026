# CLIMASHELTER AI

AI-powered Area-Specific Passive Shelter Design, Retrofit, Evaluation and Optimization Platform.

CLIMASHELTER AI is an engineering decision-support platform for designing passive shelters according to local climatic conditions.

## Project Structure

```
climashelter/
├── frontend/             # React + Vite + TS Frontend
│   └── src/
│       ├── components/   # Reusable components
│       ├── features/     # Feature-based modular structure
│       ├── hooks/        # Custom React hooks
│       ├── layouts/      # Layout layouts (e.g. Expert Dashboard Layout)
│       ├── pages/        # Placeholder route pages
│       ├── router/       # Router configuration
│       ├── services/     # API services
│       ├── types/        # TypeScript engineering declarations
│       └── utils/        # Utilities
├── backend/              # FastAPI Python Backend
│   └── app/
│       ├── api/          # Route layers (health, projects, simulations)
│       ├── core/         # Configs (CORS, DB integration)
│       ├── database/     # DB placeholders
│       ├── models/       # Models
│       ├── schemas/      # Pydantic schemas
│       ├── services/     # Engine orchestration
│       └── thermal/      # Thermal engine module
└── data/                 # Materials and Climatic local datasets
    ├── materials/
    └── climate/
```

## Running the Applications

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI dev server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
