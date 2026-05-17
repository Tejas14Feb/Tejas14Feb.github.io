export interface Project {
  type: string
  title: string
  desc: string
  tags: string[]
  href: string
  ariaLabel: string
  previewTitle: string
  previewImg: string
  previewAlt: string
  previewDesc: string
  cta: string
}

export const projects: Project[] = [
  {
    "type": "Data Science • ML",
    "title": "Spotify Hit Predictor — End-to-End ML Pipeline",
    "desc": "Binary classification across 114K+ tracks. Compared Logistic Regression (72%), Random Forest (81%), XGBoost (84%, AUC 0.91) with interactive Plotly Dash dashboard.",
    "tags": [
      "Python",
      "XGBoost",
      "Pandas",
      "DuckDB",
      "Plotly Dash",
      "Scikit-learn"
    ],
    "href": "https://github.com/Tejas14Feb/spotify-ml-project",
    "ariaLabel": "End-to-End ML Pipeline — Spotify Hit Predictor, opens GitHub",
    "previewTitle": "Spotify Hit Predictor",
    "previewImg": "screenshots/spotify.png",
    "previewAlt": "Spotify Hit Predictor dashboard screenshot",
    "previewDesc": "Full ML pipeline: ingestion → EDA → 3 models → interactive Dash app. Predicts chart hits from audio features like danceability, energy, and valence across 114K Spotify tracks.",
    "cta": "↗ Open GitHub repo"
  },
  {
    "type": "Data Science • Statistics",
    "title": "Bayesian C–Q Analysis for Phosphorus",
    "desc": "Bayesian statistical modeling of phosphorus concentration-discharge relationships using Normal-Inverse-Gamma conjugate Bayesian regression in Python.",
    "tags": [
      "Python",
      "SciPy",
      "Matplotlib",
      "Seaborn",
      "Bayesian Regression",
      "NumPy"
    ],
    "href": "https://github.com/Tejas14Feb/bayesian-cq-analysis",
    "ariaLabel": "Bayesian C–Q Analysis for Phosphorus, opens GitHub",
    "previewTitle": "Bayesian C–Q Analysis",
    "previewImg": "screenshots/bayesian.png",
    "previewAlt": "C-Q relationship scatter plots on log-log scale",
    "previewDesc": "Models phosphorus C–Q relationships with full uncertainty quantification. Log-log scatter analysis and linearized regression on real discharge data.",
    "cta": "↗ Open GitHub repo"
  },
  {
    "type": "Data Science • IoT",
    "title": "ML-Driven Anomaly Detection — Wearable IoT",
    "desc": "Detects abnormal health events from wearable sensor streams. LSTM Autoencoder achieves 0.98 F1 and 1.0 ROC-AUC vs Isolation Forest baseline.",
    "tags": [
      "Python",
      "PyTorch",
      "LSTM",
      "Scikit-learn",
      "SQLite",
      "Docker"
    ],
    "href": "https://github.com/Tejas14Feb/iot-ecg-anomaly",
    "ariaLabel": "ML-Driven Anomaly Detection — Wearable IoT, opens GitHub",
    "previewTitle": "IoT Anomaly Detection",
    "previewImg": "screenshots/iot.png",
    "previewAlt": "Model comparison bar chart: Isolation Forest vs LSTM Autoencoder",
    "previewDesc": "LSTM Autoencoder vs Isolation Forest on simulated ECG wearable data. Full pipeline: streaming ingestion → SQLite → model training → evaluation dashboard.",
    "cta": "↗ Open GitHub repo"
  },
  {
    "type": "Full Stack • Data Engineering & Analytics",
    "title": "Supply Chain Mapping Tool — SDMTS",
    "desc": "Real-world consulting project for SD Manufacturing & Technology Solutions. Migrated 2,671-record legacy Excel database to a live cloud platform with interactive mapping and ETL pipeline.",
    "tags": [
      "Python",
      "SQL",
      "Airtable",
      "Power BI",
      "BatchGEO",
      "ETL/ELT",
      "Power Query"
    ],
    "href": "https://sdmanufacturing.com/supply-chain-mapping-tool/#top",
    "ariaLabel": "Supply Chain Mapping Tool for SDMTS — opens live site",
    "previewTitle": "SDMTS Supply Chain Dashboard",
    "previewImg": "screenshots/sdmts.png",
    "previewAlt": "Supply Chain Mapping Dashboard showing 2671 companies across 234 cities",
    "previewDesc": "Live on SDMTS website. 2,671 manufacturers, 21 NAICS industries, 234 cities. BatchGEO mapping + Advanced Filters + Power BI dashboards. Reduced manual processing by 70%.",
    "cta": "↗ View live site"
  }
]
