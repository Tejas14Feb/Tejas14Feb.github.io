export interface SkillGroup {
  id: string
  label: string
  items: string[]
  proficiency: number
}

export const skills: SkillGroup[] = [
  {
    "id": "lang-label",
    "label": "<Languages>",
    "proficiency": 90,
    "items": [
      "Python",
      "SQL",
      "JavaScript",
      "Bash"
    ]
  },
  {
    "id": "aiml-label",
    "label": "<AI / ML>",
    "proficiency": 77,
    "items": [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "Bayesian Regression",
      "LSTM Autoencoders",
      "Predictive Modeling",
      "Anomaly Detection"
    ]
  },
  {
    "id": "de-label",
    "label": "<Data Science & Analytics>",
    "proficiency": 86,
    "items": [
      "Pandas",
      "NumPy",
      "SciPy",
      "Exploratory Data Analysis (EDA)",
      "KPI/KRI Analytics",
      "Data Quality Analysis",
      "Statistical Modeling"
    ]
  },
  {
    "id": "viz-label",
    "label": "<Visualization & Business Intelligence>",
    "proficiency": 92,
    "items": [
      "Power BI",
      "Tableau",
      "Plotly Dash",
      "Matplotlib",
      "Seaborn",
      "Airtable",
      "BatchGEO",
      "Executive Reporting Dashboards"
    ]
  },
  {
    "id": "dev-label",
    "label": "<Developer Tools & Workflow>",
    "proficiency": 90,
    "items": [
      "Docker",
      "Linux",
      "Jupyter",
      "Power Query",
      "Git",
      "Github",
      "CI/CD Workflows"
    ]
  },
  {
    "id": "group-1779006467996",
    "label": "<Cloud, APIs & Automation>",
    "items": [
      "RESTful API",
      "FastAPI",
      "REST API",
      "AWS",
      "Lambda",
      "Textract",
      "Amazon S3",
      "Azure",
      "Google Cloud",
      "API Gateway",
      "Document Processing Pipelines",
      "AI-Assisted Automations"
    ],
    "proficiency": 82
  },
  {
    "id": "group-1779006717090",
    "label": "<Data Engineering & Supply Chain Systems>",
    "items": [
      "ETL/ELT Pipelines",
      "DuckDB",
      "SQLite",
      "Data Migration",
      "Data Validation",
      "Supply Chain Mapping",
      "Manufacturing Data Analytics"
    ],
    "proficiency": 90
  }
]
