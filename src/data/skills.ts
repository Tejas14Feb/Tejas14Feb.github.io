export interface SkillGroup {
  id: string
  label: string
  items: string[]
  proficiency: number  // 0–100
}

export const skills: SkillGroup[] = [
  {
    id: 'lang-label',
    label: '<Languages>',
    proficiency: 83,
    items: ['Python', 'SQL', 'R', 'JavaScript', 'MATLAB', 'Bash', 'HTML5', 'Scala'],
  },
  {
    id: 'aiml-label',
    label: '<AI / ML & Statistics>',
    proficiency: 91,
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'XGBoost', 'Pandas', 'NumPy', 'SciPy', 'OpenCV'],
  },
  {
    id: 'de-label',
    label: '<Data Engineering>',
    proficiency: 76,
    items: ['Apache Spark', 'Airflow', 'Snowflake', 'AWS', 'Google Cloud', 'Azure', 'PostgreSQL', 'MySQL', 'ETL/ELT'],
  },
  {
    id: 'viz-label',
    label: '<Visualization>',
    proficiency: 72,
    items: ['Power BI', 'Tableau', 'Plotly Dash', 'Matplotlib', 'Seaborn', 'D3.js', 'Airtable', 'Kibana', 'Chart.js'],
  },
  {
    id: 'dev-label',
    label: '<Dev Tools & Methods>',
    proficiency: 70,
    items: ['Git', 'Docker', 'Linux', 'DuckDB', 'Jupyter', 'BatchGEO', 'Postman', 'Agile/Scrum', 'Power Query'],
  },
]
