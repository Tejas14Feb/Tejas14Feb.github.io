export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    id: 'lang-label',
    label: '<Languages>',
    items: ['Python', 'SQL', 'R', 'JavaScript', 'MATLAB', 'Bash', 'HTML5', 'Scala'],
  },
  {
    id: 'aiml-label',
    label: '<AI / ML & Statistics>',
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'XGBoost', 'Pandas', 'NumPy', 'SciPy', 'OpenCV'],
  },
  {
    id: 'de-label',
    label: '<Data Engineering>',
    items: ['Apache Spark', 'Airflow', 'Snowflake', 'AWS', 'Google Cloud', 'Azure', 'PostgreSQL', 'MySQL', 'ETL/ELT'],
  },
  {
    id: 'viz-label',
    label: '<Visualization>',
    items: ['Power BI', 'Tableau', 'Plotly Dash', 'Matplotlib', 'Seaborn', 'D3.js', 'Airtable', 'Kibana', 'Chart.js'],
  },
  {
    id: 'dev-label',
    label: '<Dev Tools & Methods>',
    items: ['Git', 'Docker', 'Linux', 'DuckDB', 'Jupyter', 'BatchGEO', 'Postman', 'Agile/Scrum', 'Power Query'],
  },
]
