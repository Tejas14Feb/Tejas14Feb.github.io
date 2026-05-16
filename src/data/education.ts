export interface ExperienceEntry {
  date: string
  role: string
  org: string
  bullets: string[]
}

export interface Award {
  title: string
  sub: string
}

export const education: ExperienceEntry[] = [
  {
    date: 'Jan 2023 — Expected May 2027',
    role: 'B.S. Computer Science (Artificial Intelligence)',
    org: 'University of South Dakota, Vermillion, SD',
    bullets: [
      "Minors: Business Analytics & Mathematics | GPA: 3.8 | Dean's List 2023–2025",
      'Relevant Coursework: Python • JavaScript • Data Structures & Algorithms • AI • IoT • Data Science • SQL • Discrete Mathematics • Calculus I & II • Statistics • Probability • Predictive & Prescriptive Analytics • Applied Business Analytics',
    ],
  },
]

export const experience: ExperienceEntry[] = [
  {
    date: 'Aug 2025 – Apr 2026',
    role: 'Data Analyst & Developer',
    org: 'Coyote Business Consulting — SDMTS',
    bullets: [
      'Migrated 2,671-record manufacturer database from legacy Excel to cloud-based Airtable platform',
      'Built interactive Supply Chain Mapping Tool live on SDMTS website; ETL pipelines reduced manual processing by 70%',
      'Developed Power BI KPI dashboards improving leadership decision-making speed by 45%',
    ],
  },
  {
    date: 'May 2025 – Jul 2025',
    role: 'Entrepreneur Lead / AI & Supply Chain Research Analyst',
    org: 'NSF I-Corps Cohort',
    bullets: [
      'Conducted 50+ industry interviews; synthesized findings into quantitative GTM analytics frameworks',
      'Designed Tableau and Power BI dashboards translating supply chain data into risk indicators for non-technical stakeholders',
    ],
  },
  {
    date: 'May 2024 – May 2025',
    role: 'Data Science & Bioinformatics Research Assistant',
    org: 'USD Biomedical Engineering Lab',
    bullets: [
      'Built Python/SQL ETL pipelines integrating 10,000+ biomedical observations, improving throughput by 70%',
      'Automated data extraction and standardization; created Matplotlib/Seaborn dashboards for faculty research',
    ],
  },
]

export const awards: Award[] = [
  { title: 'Student Ambassador Scholarship', sub: 'University of South Dakota · January 2026' },
  { title: 'Outstanding Student Business Consultant', sub: 'Coyote Business Consulting Showcase · November 2025' },
  { title: 'OMA Multicultural Excellence Award', sub: 'USD Coyote Excellence Awards · April 2025' },
  { title: 'Golden Cowbell Pin', sub: 'Regional Leadership Conference — MACURH · October 2024' },
]

export const leadership: Award[] = [
  { title: 'President, Indian Student Association', sub: 'University of South Dakota · Aug 2023 – Present' },
  { title: 'Finance Chair & Senator, SGA', sub: 'Student Government Association · Feb 2025 – Sep 2025' },
  {
    title: 'Brother, Delta Sigma Pi — Alpha Eta Chapter',
    sub: 'Professional Business Fraternity · Nov 2024 – Present',
  },
]
