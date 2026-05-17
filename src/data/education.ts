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
    "date": "Jan 2023 — Expected May 2027",
    "role": "B.S. Computer Science (Artificial Intelligence)",
    "org": "University of South Dakota, Vermillion, SD",
    "bullets": [
      "Minors: Business Analytics & Mathematics | GPA: 3.8 | Dean's List 2023–2025",
      "Relevant Coursework: Python • JavaScript • Data Structures & Algorithms • AI • IoT • Data Science • SQL • Discrete Mathematics • Calculus I & II • Statistics • Probability • Predictive & Prescriptive Analytics • Applied Business Analytics"
    ]
  }
]

export const experience: ExperienceEntry[] = [
  {
    "date": "May 2026 - Aug 2026",
    "role": "IT Governance Analytics Intern",
    "org": "The Bancorp Bank",
    "bullets": [
      "Supporting enterprise IT governance initiatives through KPI/KRI reporting, executive dashboards, and data-driven analytics workflows.",
      "Building and enhancing Power BI/Tableau dashboards for governance forums, operational reporting, and strategic technology oversight.",
      "Analyzing structured and unstructured datasets to identify trends, anomalies, risk indicators, and operational performance insights.",
      "Assisting with data quality validation, reporting standardization, metric definitions, and governance documentation practices.",
      "Developing AI-assisted reporting workflows using tools such as ChatGPT/Copilot to streamline analytics and narrative reporting processes.",
      "Collaborating cross-functionally with IT, Risk, Compliance, and Operations teams to improve reporting consistency and decision-making."
    ]
  },
  {
    "date": "May 2026 - Present",
    "role": "Software Developer",
    "org": "USD • Center for Digital Accessibility",
    "bullets": [
      "Developing AI-assisted document accessibility automation workflows aligned with WCAG 2.1 and ADA Title II compliance standards.",
      "Building backend Python services and REST APIs for document parsing, processing, and accessibility validation pipelines.",
      "Supporting frontend dashboard and UI/UX development using modern web technologies and cloud-based workflows.",
      "Assisting with AWS-based cloud deployment, serverless automation, and system monitoring for scalable accessibility solutions.",
      "Performing testing, validation, and quality assurance to ensure accurate accessibility outputs and standards compliance.",
      "Collaborating on AI-supported text and image processing systems for automated document analysis and accessibility reporting."
    ]
  },
  {
    "date": "Aug 2025 – Apr 2026",
    "role": "Data Analyst & Developer",
    "org": "Coyote Business Consulting — SDMTS",
    "bullets": [
      "Migrated a 2,671-record manufacturer database from a legacy Excel system to a cloud-based Airtable platform supporting South Dakota supply chain analytics.",
      "Built a live Supply Chain Mapping Tool with BatchGeo integration, advanced filtering, and real-time visualization dashboards embedded on the SDMTS website.",
      "Designed Python/SQL ETL pipelines for data migration, validation, and operational reporting workflows.",
      "Conducted multi-platform evaluations across Airtable, Power BI, and Looker Studio to optimize scalability, usability, and cloud integration.",
      "Developed executive-facing dashboards and manufacturing analytics supporting strategic decision-making and regional benchmarking."
    ]
  },
  {
    "date": "May 2025 – Jul 2025",
    "role": "Entrepreneur Lead / AI & Supply Chain Research Analyst",
    "org": "NSF I-Corps Cohort",
    "bullets": [
      "Conducted 50+ stakeholder and industry interviews to evaluate supply chain pain points, operational bottlenecks, and market opportunities.",
      "Applied Python and statistical analysis techniques to synthesize customer discovery insights into quantitative recommendation frameworks.",
      "Built Tableau and Power BI dashboards visualizing supply chain risk indicators, operational trends, and stakeholder sentiment patterns.",
      "Supported AI-driven market research and analytics initiatives for technology commercialization and product strategy evaluation."
    ]
  },
  {
    "date": "May 2024 – May 2025",
    "role": "Data Science & Bioinformatics Research Assistant",
    "org": "USD Biomedical Engineering Lab",
    "bullets": [
      "Built Python/SQL ETL pipelines integrating 14,000+ biomedical observations into reproducible research workflows.",
      "Automated data extraction, cleaning, preprocessing, and standardization processes for bioinformatics and analytics applications.",
      "Developed statistical analyses and visualization dashboards using Pandas, Matplotlib, and Seaborn for faculty-level research insights.",
      "Supported data-driven biomedical research initiatives through analytics, workflow optimization, and scientific reporting."
    ]
  }
]

export const awards: Award[] = [
  {
    "title": "Outstanding Research Scholarship",
    "sub": "University of South Dakota · August 2026"
  },
  {
    "title": "Outstanding Student Business Consultant",
    "sub": "Coyote Business Consulting Showcase · April 2026"
  },
  {
    "title": "Student Ambassador Scholarship",
    "sub": "University of South Dakota · January 2026"
  },
  {
    "title": "OMA Multicultural Excellence Award",
    "sub": "USD Coyote Excellence Awards · April 2025"
  },
  {
    "title": "Golden Cowbell Pin",
    "sub": "Regional Leadership Conference — MACURH · October 2024"
  }
]

export const leadership: Award[] = [
  {
    "title": "President, Indian Student Association",
    "sub": "University of South Dakota · Aug 2023 – Present"
  },
  {
    "title": "Brother, Delta Sigma Pi — Alpha Eta Chapter",
    "sub": "Professional Business Fraternity · Nov 2024 – Present"
  },
  {
    "title": "Finance Chair & Senator, SGA",
    "sub": "Student Government Association · Feb 2025 – Sep 2025"
  }
]
