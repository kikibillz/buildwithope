import { CertificationItem, ExperienceItem, PortfolioConfig, Project, SkillCategory } from '../types';

export const initialConfig: PortfolioConfig = {
  "name": "Opeyemi Olamiju",
  "title": "HR Data & Automation Support",
  "subTitle": "Candidate tracking, spreadsheet cleanup and clear workforce reports for HR teams and recruitment agencies.",
  "email": "odunayoopamiju@gmail.com",
  "location": "Remote & Relocation Ready",
  "linkedin": "https://www.linkedin.com/in/opeyemiolamiju/",
  "github": "https://github.com/kikibillz",
  "resumeUrl": "/Opeyemi_Olamiju_Resume.pdf",
  "certificationsUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
  "avatarUrl": "/images/opeyemi picture.png"
};

export const skillCategories: SkillCategory[] = [
  {
    "title": "RAG & Prompt Engineering",
    "description": "Retrieval-Augmented Generation, vector embeddings, BM25 hybrid search, few-shot prompting, and hallucination guardrails.",
    "skills": [
      "RAG Architectures (Retrieval-Augmented Generation)",
      "Prompt Engineering (Few-Shot, CoT, System Prompts)",
      "Vector Search & Embeddings (ChromaDB / FAISS)",
      "Hybrid Retrieval (Dense Vector + BM25 Sparse)",
      "Context Window Optimization & Chunking",
      "Hallucination Guardrails & Grounded Citations",
      "LangChain & LlamaIndex",
      "Structured JSON Schema Extraction"
    ]
  },
  {
    "title": "Machine Learning & People Analytics",
    "description": "Predictive modeling, workforce retention risk analysis, employee turnover variance, and statistical classification.",
    "skills": [
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "People Analytics",
      "Attrition Modeling",
      "SMOTE Balancing",
      "Feature Engineering",
      "Cross-Validation"
    ]
  },
  {
    "title": "LLMs & Generative AI",
    "description": "Large language model APIs, prompt engineering, multimodal video generation, and agentic workflows.",
    "skills": [
      "Large Language Models (LLMs)",
      "OpenAI & Gemini APIs",
      "Prompt Engineering",
      "RAG Architectures",
      "LangChain",
      "Google Veo 3",
      "Runway Gen-3",
      "ElevenLabs"
    ]
  },
  {
    "title": "Cloud & Infrastructure",
    "description": "Cloud deployment, containerization, virtual machines, and cloud-native application runtimes.",
    "skills": [
      "AWS (EC2 & S3)",
      "Google Cloud (GCP)",
      "Docker Containers",
      "Linux CLI",
      "Vercel Edge",
      "Azure Fundamentals"
    ]
  },
  {
    "title": "BI & Data Visualization",
    "description": "Interactive business intelligence dashboards, DAX metric formulas, and publication-ready charting.",
    "skills": [
      "Power BI (DAX & Dashboards)",
      "Tableau",
      "Streamlit",
      "Plotly Interactive",
      "Matplotlib",
      "Seaborn",
      "Executive KPI Design"
    ]
  },
  {
    "title": "MLOps & Backend Engineering",
    "description": "High-throughput asynchronous APIs, request validation, automated testing, and model lifecycle management.",
    "skills": [
      "FastAPI",
      "Pydantic v2",
      "Uvicorn ASGI",
      "Docker",
      "MLflow Tracking",
      "CI/CD (GitHub Actions)",
      "Pytest (>90% Coverage)",
      "Joblib Serialization"
    ]
  },
  {
    "title": "Databases & Storage",
    "description": "Relational data modeling, SQL query optimization, transactional schemas, and high-performance NoSQL document stores.",
    "skills": [
      "SQL (PostgreSQL / MySQL)",
      "NoSQL (MongoDB)",
      "SQLite",
      "Complex Joins & CTEs",
      "Window Functions",
      "Schema Design & Indexing",
      "MongoDB Aggregation Pipelines",
      "Redis Caching",
      "Query Optimization & EXPLAIN"
    ]
  },
  {
    "title": "Programming & Web",
    "description": "Core languages used for full-stack logic, web interfaces, scripting, and data pipelines.",
    "skills": [
      "Python",
      "SQL",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "RESTful APIs"
    ]
  },
  {
    "title": "Data & Spreadsheets",
    "description": "Data manipulation, financial spreadsheet modeling, relational SQL querying, and automated reporting.",
    "skills": [
      "Microsoft Excel (Advanced Modeling)",
      "Google Sheets",
      "Pandas",
      "NumPy",
      "OpenPyXL",
      "XlsxWriter",
      "Data Cleaning & Reconciliation"
    ]
  }
];

export const projects: Project[] = [
  {
    "id": "enterprise-rag-prompt-engine",
    "title": "Knowledge Assistant & RAG Exploration",
    "tagline": "Portfolio exploration · RAG & Generative AI",
    "description": "Explore retrieval and source-aware answers. The assistant on this website is a local portfolio FAQ, not a connected RAG service.",
    "category": "RAG & Generative AI",
    "problemSummary": "Standard Large Language Models suffer from hallucinations, knowledge cutoff limitations, and inability to cite internal policy records or financial formulas, creating critical compliance and accuracy risks for business decision-makers.",
    "approachSummary": "Architected a multi-tier RAG pipeline: document tokenization and recursive character chunking (256-512 tokens with 50-token overlap), dense vector indexing with ChromaDB/FAISS, sparse BM25 scoring for exact keyword retrieval, reciprocal rank fusion (RRF), system prompt engineering with strict citation provenance constraints, and automated grounding validation.",
    "tools": [
      "Python",
      "FastAPI",
      "RAG",
      "Prompt Engineering",
      "ChromaDB",
      "Vector Search",
      "BM25 Hybrid Search",
      "LangChain",
      "Docker",
      "Streamlit"
    ],
    "resultsSummary": "Portfolio FAQ interface and source-linked knowledge-assistant exploration.",
    "businessImpact": "Potential application: Standard Large Language Models suffer from hallucinations, knowledge cutoff limitations, and inability to cite internal policy records or financial formulas, creating critical compliance and accuracy risks for business decision-makers. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/enterprise-rag-prompt-engine",
      "demo": "#nexus-copilot"
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Standard Large Language Models suffer from hallucinations, knowledge cutoff limitations, and inability to cite internal policy records or financial formulas, creating critical compliance and accuracy risks for business decision-makers.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Normalized unicode characters, stripped redundant boilerplate, and applied recursive character text splitters with semantic boundaries.",
        "exploration": "Benchmarked chunk size trade-offs (128 vs 256 vs 512 tokens), discovering that 384 tokens with 40-token overlap preserved full policy clauses while maximizing embedding vector similarity.",
        "featureEngineering": "Document the relevant rules and validate this stage against the project inputs. See the source for implementation details.",
        "modeling": "Engineered layered system prompts utilizing Chain-of-Thought (CoT) decomposition for multi-clause reasoning, few-shot examples for structured JSON output, and strict negative constraint guardrails (\"If the answer cannot be directly cited from context, declare UNVERIFIED\").",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "Portfolio FAQ interface and source-linked knowledge-assistant exploration.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "RAG",
        "Prompt Engineering",
        "Python",
        "FastAPI",
        "Vector Embeddings",
        "ChromaDB",
        "BM25",
        "LangChain"
      ],
      "links": {
        "github": "https://github.com/kikibillz/enterprise-rag-prompt-engine",
        "demo": "#nexus-copilot"
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided.",
        "The website FAQ uses deterministic keyword matching, with no LLM, vector search or company-policy access."
      ]
    }
  },
  {
    "id": "hybrid-sql-nosql-engine",
    "title": "Hybrid Data Platform: Relational SQL (PostgreSQL) & NoSQL (MongoDB) Pipeline",
    "tagline": "Portfolio exploration · Databases & Distributed Storage",
    "description": "Modern applications struggle when forcing all data into either purely relational tables or purely unstructured documents. Relational financial transactions require strict ACID guarantees and foreign keys, while real-time user events and telemetry require high-ingest document flexibility.",
    "category": "Databases & Distributed Storage",
    "problemSummary": "Modern applications struggle when forcing all data into either purely relational tables or purely unstructured documents. Relational financial transactions require strict ACID guarantees and foreign keys, while real-time user events and telemetry require high-ingest document flexibility.",
    "approachSummary": "Architected a hybrid architecture routing financial transactions and customer accounts to normalized PostgreSQL tables with foreign key constraints, while routing high-velocity clickstream and system telemetry to MongoDB NoSQL collections with compound indexes and multi-stage aggregation pipelines.",
    "tools": [
      "SQL (PostgreSQL)",
      "NoSQL (MongoDB)",
      "Python",
      "SQLAlchemy",
      "PyMongo",
      "Docker",
      "Redis",
      "Pandas",
      "Streamlit"
    ],
    "resultsSummary": "A portfolio design for relational and document-store workflows.",
    "businessImpact": "Potential application: Modern applications struggle when forcing all data into either purely relational tables or purely unstructured documents. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/hybrid-sql-nosql-analytics-pipeline",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Modern applications struggle when forcing all data into either purely relational tables or purely unstructured documents. Relational financial transactions require strict ACID guarantees and foreign keys, while real-time user events and telemetry require high-ingest document flexibility.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Enforced PostgreSQL relational constraints (NOT NULL, UNIQUE, FOREIGN KEY, CHECK) while establishing MongoDB JSON schema validation rules for incoming telemetry docs.",
        "exploration": "Benchmarked raw query plans (EXPLAIN ANALYZE in PostgreSQL and .explain(\"executionStats\") in MongoDB) to locate table scans and pipeline bottlenecks.",
        "featureEngineering": "Formulated SQL CTEs (Common Table Expressions) and window functions (ROW_NUMBER, LAG, LEAD, SUM OVER) to compute rolling customer spend, paired with MongoDB $facet and $bucket stages for real-time cohort grouping.",
        "modeling": "Constructed B-Tree indexes on PostgreSQL foreign keys and compound indexes on MongoDB timestamp + user_id fields, reducing query response times by over 77%.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A portfolio design for relational and document-store workflows.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "SQL (PostgreSQL)",
        "NoSQL (MongoDB)",
        "Python",
        "SQLAlchemy",
        "PyMongo",
        "Docker",
        "Redis"
      ],
      "links": {
        "github": "https://github.com/kikibillz/hybrid-sql-nosql-analytics-pipeline",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "python-automated-ledger",
    "title": "Python Spreadsheet Ledger Automation",
    "tagline": "Portfolio exploration · Financial Automation & Spreadsheets",
    "description": "Freelancers and consulting businesses spend countless hours manually updating spreadsheets, leading to tax withholding miscalculations, formula breaks, and payment reconciliation delays.",
    "category": "Financial Automation & Spreadsheets",
    "problemSummary": "Freelancers and consulting businesses spend countless hours manually updating spreadsheets, leading to tax withholding miscalculations, formula breaks, and payment reconciliation delays.",
    "approachSummary": "Explore structured spreadsheet exports, configurable calculations and reconciliation checks. Tax rules must be supplied and reviewed for the relevant jurisdiction.",
    "tools": [
      "Python",
      "Microsoft Excel",
      "Google Sheets",
      "OpenPyXL",
      "Pandas",
      "XlsxWriter"
    ],
    "resultsSummary": "A spreadsheet-automation concept with configurable calculation rules.",
    "businessImpact": "Potential application: Freelancers and consulting businesses spend countless hours manually updating spreadsheets, leading to tax withholding miscalculations, formula breaks, and payment reconciliation delays. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Freelancers and consulting businesses spend countless hours manually updating spreadsheets, leading to tax withholding miscalculations, formula breaks, and payment reconciliation delays.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Enforced strict data types for dates, monetary values, and enumeration of statuses (Paid, Pending, Overdue).",
        "exploration": "Identified recurring client billing cycles and calculated required withholding tax reserve funds.",
        "featureEngineering": "Configure calculation rules explicitly; do not apply a universal withholding rate.",
        "modeling": "Explore structured spreadsheet exports, configurable calculations and reconciliation checks. Tax rules must be supplied and reviewed for the relevant jurisdiction.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A spreadsheet-automation concept with configurable calculation rules.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Microsoft Excel",
        "Google Sheets",
        "OpenPyXL",
        "Pandas",
        "XlsxWriter"
      ],
      "links": {
        "github": "https://github.com/kikibillz",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "fastapi-ml-service",
    "title": "FastAPI ML Inference & Validation Service",
    "tagline": "Portfolio exploration · Backend Engineering & ML Serving",
    "description": "Machine learning models locked inside Jupyter notebooks or ad-hoc scripts cannot be readily integrated by external frontends, mobile apps, or enterprise microservices. A scalable, strongly typed, low-latency REST API was required to serve real-time predictions with strict contract validation.",
    "category": "Backend Engineering & ML Serving",
    "problemSummary": "Machine learning models locked inside Jupyter notebooks or ad-hoc scripts cannot be readily integrated by external frontends, mobile apps, or enterprise microservices. A scalable, strongly typed, low-latency REST API was required to serve real-time predictions with strict contract validation.",
    "approachSummary": "Established a clean modular architecture (/api/v1, /core/config, /models/schemas, /services/predictor), enforced Pydantic v2 validation contracts, loaded serialized Joblib pipelines with lifespan startup hooks, and containerized the service using Docker.",
    "tools": [
      "FastAPI",
      "Python",
      "Docker",
      "AWS & GCP",
      "MLflow",
      "Pytest (>90%)",
      "Pydantic v2",
      "Uvicorn",
      "Swagger / OpenAPI",
      "Scikit-learn"
    ],
    "resultsSummary": "API validation and inference-service project structure.",
    "businessImpact": "Potential application: Machine learning models locked inside Jupyter notebooks or ad-hoc scripts cannot be readily integrated by external frontends, mobile apps, or enterprise microservices. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/fastapi-ml-service",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Machine learning models locked inside Jupyter notebooks or ad-hoc scripts cannot be readily integrated by external frontends, mobile apps, or enterprise microservices. A scalable, strongly typed, low-latency REST API was required to serve real-time predictions with strict contract validation.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Document the relevant rules and validate this stage against the project inputs. See the source for implementation details.",
        "exploration": "Benchmarked sync vs async request handlers using httpx and Locust, determining optimal worker concurrency under high concurrent prediction loads.",
        "featureEngineering": "Engineered real-time feature derivation middleware that computes dynamic financial ratios (such as Balance-to-Salary) on incoming JSON payloads on the fly.",
        "modeling": "Integrated serialized XGBoost and Random Forest pipelines loaded asynchronously during FastAPI lifespan events to avoid runtime disk I/O bottlenecks.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "API validation and inference-service project structure.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "FastAPI",
        "Pydantic v2",
        "Uvicorn",
        "Docker",
        "SQLite",
        "Pytest",
        "Scikit-learn"
      ],
      "links": {
        "github": "https://github.com/kikibillz/fastapi-ml-service",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "bank-churn",
    "title": "Bank Customer Churn & Retention Pipeline",
    "tagline": "Portfolio exploration · Machine Learning & Predictive Modeling",
    "description": "Customer acquisition costs in retail banking are significantly higher than retention costs. Identifying at-risk customers early allows relationship teams to execute targeted retention strategies before accounts are closed.",
    "category": "Machine Learning & Predictive Modeling",
    "problemSummary": "Customer acquisition costs in retail banking are significantly higher than retention costs. Identifying at-risk customers early allows relationship teams to execute targeted retention strategies before accounts are closed.",
    "approachSummary": "Engineered ratio metrics (Balance_Salary_Ratio), encoded demographic factors, balanced training folds using SMOTE, trained an XGBClassifier, serialized artifacts via Joblib, and deployed an interactive Streamlit application.",
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Imbalanced-learn",
      "Joblib",
      "Streamlit",
      "Plotly"
    ],
    "resultsSummary": "A churn-analysis project with a static application screenshot.",
    "businessImpact": "Potential application: Customer acquisition costs in retail banking are significantly higher than retention costs. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/Bank-Customer-Churn-Project",
      "demo": ""
    },
    "badge": "Portfolio project",
    "streamlitUrl": "https://bank-customer-churn-project.streamlit.app",
    "caseStudy": {
      "problem": "Customer acquisition costs in retail banking are significantly higher than retention costs. Identifying at-risk customers early allows relationship teams to execute targeted retention strategies before accounts are closed.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Audited missing entries, standardized column casing, and filtered out non-predictive identifiers like CustomerId and Surname.",
        "exploration": "Conducted exploratory data analysis uncovering non-linear relationships between customer age cohorts, dormant account flags, and attrition likelihood.",
        "featureEngineering": "Engineered key economic ratios such as Balance_Salary_Ratio = Balance / (EstimatedSalary + 1) to capture financial commitment, and applied one-hot dummy encoding to Geography and Gender.",
        "modeling": "Addressed substantial class imbalance using SMOTE (Synthetic Minority Over-sampling Technique) before fitting an XGBClassifier with stratified train-test splits.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A churn-analysis project with a static application screenshot.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "XGBoost",
        "Imbalanced-learn",
        "Joblib",
        "Streamlit"
      ],
      "links": {
        "github": "https://github.com/kikibillz/Bank-Customer-Churn-Project",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "hr-analytics",
    "title": "Workforce Intelligence System (HR-Analytics-2026)",
    "tagline": "Portfolio exploration · Data Analysis & Business Analytics",
    "description": "Human Resources leaders lack consolidated insight into whether turnover trends correlate with compensation bands, department tenure, or performance evaluation scores.",
    "category": "Data Analysis & Business Analytics",
    "problemSummary": "Human Resources leaders lack consolidated insight into whether turnover trends correlate with compensation bands, department tenure, or performance evaluation scores.",
    "approachSummary": "Structured automated Python ETL pipelines, integrated MongoDB document loading, generated multi-variable distribution charts with Seaborn and Plotly, and built interactive department filters in Streamlit.",
    "tools": [
      "Python",
      "Pandas",
      "Plotly",
      "Streamlit",
      "Scikit-learn",
      "Seaborn",
      "MongoDB",
      "Joblib"
    ],
    "resultsSummary": "An HR reporting project with a static dashboard screenshot.",
    "businessImpact": "Potential application: Human Resources leaders lack consolidated insight into whether turnover trends correlate with compensation bands, department tenure, or performance evaluation scores. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/HR-Analytics-2026",
      "demo": ""
    },
    "badge": "Portfolio project",
    "streamlitUrl": "https://hr-analytics-2026.streamlit.app",
    "caseStudy": {
      "problem": "Human Resources leaders lack consolidated insight into whether turnover trends correlate with compensation bands, department tenure, or performance evaluation scores.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Filtered anomalies in tenure values, normalized job titles across teams, and established consistent categorical bins for compensation brackets.",
        "exploration": "Explored distribution curves of salary across departments using Seaborn box plots. Analyzed attrition rates by department tenure and performance tiers.",
        "featureEngineering": "Created derived metrics including tenure-to-promotion ratios, compensation percentile within department, and overtime frequency flags.",
        "modeling": "Formulated exploratory regression and correlation matrices to measure the statistical relationship between tenure, salary gap, and employee retention.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "An HR reporting project with a static dashboard screenshot.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Pandas",
        "Plotly",
        "Streamlit",
        "Scikit-learn",
        "Seaborn",
        "MongoDB",
        "Joblib"
      ],
      "links": {
        "github": "https://github.com/kikibillz/HR-Analytics-2026",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "hr-attrition",
    "title": "HR Attrition Risk Classification Engine",
    "tagline": "Portfolio exploration · Machine Learning & Predictive Modeling",
    "description": "Unplanned employee turnover causes operational disruption and costly recruitment cycles. HR departments need an objective risk scoring model to identify high-hazard retention situations before resignations occur.",
    "category": "Machine Learning & Predictive Modeling",
    "problemSummary": "Unplanned employee turnover causes operational disruption and costly recruitment cycles. HR departments need an objective risk scoring model to identify high-hazard retention situations before resignations occur.",
    "approachSummary": "Trained a multi-feature Random Forest model learning from BusinessTravel, Department, JobRole, OverTime, Age, MonthlyIncome, JobSatisfaction, YearsAtCompany, and StockOptionLevel with serialized Joblib pipelines.",
    "tools": [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Power BI",
      "Tableau",
      "LabelEncoder",
      "Pandas",
      "Joblib",
      "Streamlit"
    ],
    "resultsSummary": "An exploratory attrition-classification workflow.",
    "businessImpact": "Potential application: Unplanned employee turnover causes operational disruption and costly recruitment cycles. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/HR-Analytics-2026",
      "demo": ""
    },
    "badge": "Portfolio project",
    "streamlitUrl": "https://hr-analytics-attrition-project.streamlit.app",
    "caseStudy": {
      "problem": "Unplanned employee turnover causes operational disruption and costly recruitment cycles. HR departments need an objective risk scoring model to identify high-hazard retention situations before resignations occur.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Standardized categorical labels with LabelEncoder and removed collinear index variables.",
        "exploration": "Identified strong feature importance weights linking mandatory overtime and frequent travel to turnover rates.",
        "featureEngineering": "Encoded categorical features and normalized income distributions to ensure balanced model convergence.",
        "modeling": "Trained a Random Forest Classifier with ensemble decision trees, tuning estimators for optimal recall on the positive attrition class.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "An exploratory attrition-classification workflow.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Scikit-learn",
        "Random Forest",
        "LabelEncoder",
        "Pandas",
        "Joblib",
        "Streamlit"
      ],
      "links": {
        "github": "https://github.com/kikibillz/HR-Analytics-2026",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "safesite",
    "title": "SafeSite: Workplace Injury Risk Prediction",
    "tagline": "Portfolio exploration · Machine Learning & Safety Analytics",
    "description": "Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. SafeSite analyzes structured incident parameters to categorize risk levels before severe occurrences escalate.",
    "category": "Machine Learning & Safety Analytics",
    "problemSummary": "Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. SafeSite analyzes structured incident parameters to categorize risk levels before severe occurrences escalate.",
    "approachSummary": "Handled sparse categorical incident factors, performed feature encoding on department/shift variables, trained multiple classification algorithms, and deployed an interactive inference tool via Streamlit.",
    "tools": [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Streamlit",
      "Joblib"
    ],
    "resultsSummary": "An exploratory workplace-risk classification project.",
    "businessImpact": "Potential application: Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. SafeSite analyzes structured incident parameters to categorize risk levels before severe occurrences escalate.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Identified and imputed missing environmental variables, standardized categorical text fields, and removed duplicate incident entries.",
        "exploration": "Conducted exploratory data analysis with Matplotlib to assess class imbalances across incident severity categories and correlation between shift times and hazard occurrence.",
        "featureEngineering": "Applied one-hot encoding to department and equipment types, mapped ordinal shift risks, and scaled continuous temporal features.",
        "modeling": "Trained baseline Logistic Regression, Random Forest, and Gradient Boosting classifiers. Tuned hyperparameters using cross-validation to prevent overfitting on under-represented high-risk incidents.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "An exploratory workplace-risk classification project.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Pandas",
        "Scikit-learn",
        "Matplotlib",
        "Streamlit",
        "Joblib"
      ],
      "links": {
        "github": "https://github.com/kikibillz",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "lead-finder",
    "title": "Automated Healthcare Provider Data Pipeline",
    "tagline": "Portfolio exploration · Automation & API Data Pipelines",
    "description": "Extracting clean records from public health registries is often hindered by nested JSON responses, rate limits, and paginated record structures.",
    "category": "Automation & API Data Pipelines",
    "problemSummary": "Extracting clean records from public health registries is often hindered by nested JSON responses, rate limits, and paginated record structures.",
    "approachSummary": "Built a modular Python script using Requests to communicate with the CQC Public API, configuring custom headers, automated pagination loops, error handling, and clean CSV exports.",
    "tools": [
      "Python",
      "Requests",
      "REST APIs",
      "CSV",
      "Data Pipelines",
      "Automation"
    ],
    "resultsSummary": "A provider-data collection and CSV-export workflow.",
    "businessImpact": "Potential application: Extracting clean records from public health registries is often hindered by nested JSON responses, rate limits, and paginated record structures. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/lead-finder",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Extracting clean records from public health registries is often hindered by nested JSON responses, rate limits, and paginated record structures.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Parsed nested JSON dictionaries, extracted essential location identifiers and provider metadata, and handled null fields.",
        "exploration": "Inspected response schemas, pagination headers, and rate limiting thresholds to prevent connection termination.",
        "featureEngineering": "Flattened hierarchical JSON objects into tabular columns for location ID, provider name, region, and operational status.",
        "modeling": "Structured automated pagination loop with configurable page limits and delay intervals to prevent API throttling.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A provider-data collection and CSV-export workflow.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Requests",
        "REST APIs",
        "CSV",
        "Automation"
      ],
      "links": {
        "github": "https://github.com/kikibillz/lead-finder",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "income-prediction",
    "title": "Income Prediction Model",
    "tagline": "Portfolio exploration · Machine Learning & Predictive Modeling",
    "description": "Economic and demographic analyses often require classifying income thresholds when direct earnings data is unrecorded or coarse-grained.",
    "category": "Machine Learning & Predictive Modeling",
    "problemSummary": "Economic and demographic analyses often require classifying income thresholds when direct earnings data is unrecorded or coarse-grained.",
    "approachSummary": "Constructed a robust scikit-learn ColumnTransformer pipeline incorporating numerical scaling, categorical one-hot encoding, and missing-value imputation before training classification models.",
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Streamlit"
    ],
    "resultsSummary": "An exploratory income-classification pipeline.",
    "businessImpact": "Potential application: Economic and demographic analyses often require classifying income thresholds when direct earnings data is unrecorded or coarse-grained. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Economic and demographic analyses often require classifying income thresholds when direct earnings data is unrecorded or coarse-grained.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Detected special missing-value characters (such as question marks), imputed categorical unknowns, and trimmed whitespace across string fields.",
        "exploration": "Analyzed distributions of working hours, education levels, and capital changes against the binary income target.",
        "featureEngineering": "Engineered grouped education tiers, combined sparse marital status categories, and applied logarithmic transformations to heavily skewed financial variables.",
        "modeling": "Built an end-to-end scikit-learn Pipeline with ColumnTransformer, testing Logistic Regression and Tree-based ensemble estimators.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "An exploratory income-classification pipeline.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Streamlit"
      ],
      "links": {
        "github": "https://github.com/kikibillz",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "begi-begi",
    "title": "Begi-Begi: Social Micro-Funding Platform",
    "tagline": "Portfolio exploration · Web Application & Product Engineering",
    "description": "Community assistance requests often get lost in unstructured group chats without clear tracking, categorized needs, or accountability.",
    "category": "Web Application & Product Engineering",
    "problemSummary": "Community assistance requests often get lost in unstructured group chats without clear tracking, categorized needs, or accountability.",
    "approachSummary": "Built a modular React architecture with clean state management, responsive UI components, and continuous cloud delivery.",
    "tools": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Cloud Hosting"
    ],
    "resultsSummary": "A responsive micro-funding platform interface.",
    "businessImpact": "Potential application: Community assistance requests often get lost in unstructured group chats without clear tracking, categorized needs, or accountability. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/Begi-Begi",
      "demo": "https://begi-begi.vercel.app"
    },
    "badge": "Portfolio project",
    "streamlitUrl": "https://begi-begi.vercel.app",
    "caseStudy": {
      "problem": "Community assistance requests often get lost in unstructured group chats without clear tracking, categorized needs, or accountability.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Input sanitization and validation on client and server boundaries.",
        "exploration": "Designed user workflows optimizing for rapid request posting and transparent listing.",
        "featureEngineering": "Categorization filters by urgency, request type, and fulfillment status.",
        "modeling": "State synchronization and responsive UI architecture.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A responsive micro-funding platform interface.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Vercel"
      ],
      "links": {
        "github": "https://github.com/kikibillz/Begi-Begi",
        "demo": "https://begi-begi.vercel.app"
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "career-boost",
    "title": "Career Boost (Nigeria)",
    "tagline": "Portfolio exploration · Web Application & Career Tools",
    "description": "Nigerian professionals frequently struggle with fragmented career development materials that lack localized context and structured pathways.",
    "category": "Web Application & Career Tools",
    "problemSummary": "Nigerian professionals frequently struggle with fragmented career development materials that lack localized context and structured pathways.",
    "approachSummary": "Engineered a fast, accessible React and Tailwind application with clean resource grouping, localized advice, and deployment on Vercel.",
    "tools": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Cloud Edge"
    ],
    "resultsSummary": "A career-resource web interface for Nigerian users.",
    "businessImpact": "Potential application: Nigerian professionals frequently struggle with fragmented career development materials that lack localized context and structured pathways. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/career-boost",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Nigerian professionals frequently struggle with fragmented career development materials that lack localized context and structured pathways.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Structured and validated resource links, documentation, and career roadmaps.",
        "exploration": "Designed intuitive category workflows optimized for mobile and desktop screens.",
        "featureEngineering": "Categorized by experience levels and industry verticals.",
        "modeling": "Component-based responsive architecture with fast client-side navigation.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A career-resource web interface for Nigerian users.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Cloud Edge"
      ],
      "links": {
        "github": "https://github.com/kikibillz/career-boost",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  },
  {
    "id": "nigerian-career-boost-hub",
    "title": "Nigerian Career Boost Hub (ELEVATR)",
    "tagline": "Portfolio exploration · Web Application & Career Platform",
    "description": "Early-career professionals and tech switchers in Nigeria often navigate fragmented resources without localized salary data or structured transition guidance.",
    "category": "Web Application & Career Platform",
    "problemSummary": "Early-career professionals and tech switchers in Nigeria often navigate fragmented resources without localized salary data or structured transition guidance.",
    "approachSummary": "Designed a structured resource hub with interactive filters, localized career guidance modules, and modern web performance optimizations.",
    "tools": [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Edge CDN"
    ],
    "resultsSummary": "A searchable career-resource hub interface.",
    "businessImpact": "Potential application: Early-career professionals and tech switchers in Nigeria often navigate fragmented resources without localized salary data or structured transition guidance. Outcomes would need to be measured in a scoped pilot.",
    "keyMetrics": [],
    "links": {
      "github": "https://github.com/kikibillz/nigerian-career-boost-hub",
      "demo": ""
    },
    "badge": "Portfolio project",
    "caseStudy": {
      "problem": "Early-career professionals and tech switchers in Nigeria often navigate fragmented resources without localized salary data or structured transition guidance.",
      "dataset": "See the linked project documentation for dataset provenance, licence and preprocessing. The portfolio does not establish permission to use employer or applicant records.",
      "process": {
        "collection": "Use the documented project inputs; obtain approval before using any client data.",
        "cleaning": "Curated and structured high-value guidance into searchable categories.",
        "exploration": "Mapped user personas from university graduates to mid-career switchers.",
        "featureEngineering": "Dynamic filtering by domain (Data, Software, Product, Design).",
        "modeling": "Client-side search, filtering, and responsive rendering.",
        "evaluation": "Publish the dataset split, baseline, metrics and reproducible evaluation before making accuracy or performance claims."
      },
      "results": "A searchable career-resource hub interface.",
      "lessons": [
        "Separate demonstrations from deployed services and measured results.",
        "Validate data quality and agree success criteria before applying this workflow to a client."
      ],
      "tools": [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Vercel"
      ],
      "links": {
        "github": "https://github.com/kikibillz/nigerian-career-boost-hub",
        "demo": ""
      },
      "limitations": [
        "The portfolio preview is illustrative; it is not a live model evaluation or client case study.",
        "No verified time savings, financial impact or production reliability measurements are provided."
      ]
    }
  }
];

export const experienceItems: ExperienceItem[] = [
  {
    "id": "exp-ds",
    "category": "Experience",
    "title": "Independent Data & Automation Projects",
    "roleOrDegree": "Self-directed portfolio development",
    "organization": "Independent projects",
    "period": "2023 – Present",
    "description": "Portfolio work in Python, data analysis, machine learning and web interfaces. These projects are not presented as paid client deployments.",
    "highlights": [
      "Explored data cleaning, dashboarding and classification workflows.",
      "Built portfolio interfaces and linked project repositories for review."
    ]
  },
  {
    "id": "exp-hr",
    "category": "Experience",
    "title": "People Operations & Workforce Intelligence",
    "roleOrDegree": "People Leader (Promoted Role) & Agile People Operations Specialist",
    "organization": "Culturelligence",
    "period": "August 2024 – July 2025",
    "description": "Worked with workforce records, recruitment tracking and onboarding operations.",
    "highlights": [
      "Maintained employee records and recruitment tracking spreadsheets.",
      "Supported headcount, tenure and turnover reporting.",
      "Promoted to People Leader."
    ]
  },
  {
    "id": "exp-recruiter-va",
    "category": "Experience",
    "title": "Technical Recruiting & Operations",
    "roleOrDegree": "Certified Technical Recruiter & Administrative Operations / Virtual Assistant",
    "organization": "Freelance & Hirist (by Cutshort)",
    "period": "December 2023 – Present",
    "description": "Recruitment and administrative support, spreadsheet organisation and workflow documentation.",
    "highlights": [
      "Organised candidate and operational tracking data.",
      "Cleaned spreadsheets and prepared reporting summaries.",
      "Documented repeatable administrative workflows."
    ]
  },
  {
    "id": "edu-cs",
    "category": "Education",
    "title": "Computer Science",
    "roleOrDegree": "Bachelor of Science (BSc) in Computer Science",
    "organization": "Olabisi Onabanjo University (O.O.U)",
    "period": "2019 – 2023",
    "description": "Rigorous academic foundation in computer science principles, practical programming in Python, algorithms, relational database design with SQL, and statistical thinking.",
    "highlights": [
      "Core coursework: Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, Statistics & Probability.",
      "Applied projects focusing on algorithmic efficiency, Python scripting, and data manipulation.",
      "Collaborative software development practices and version control with Git."
    ]
  }
];

export const certificationsUrl = "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/";

export const certifications: CertificationItem[] = [
  {
    "id": "cert-new-horizons-ds",
    "title": "Certified Data Scientist",
    "issuer": "New Horizons Computer Learning Centers",
    "issueDate": "Aug 2024",
    "credentialId": "NH-DS-2024-9104",
    "category": "Data & AI",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Data Analysis",
      "Data Centers",
      "Machine Learning",
      "Python",
      "Predictive Modeling"
    ],
    "description": "Professional certification in Data Science, encompassing advanced data analysis, data center infrastructure, machine learning pipelines, and predictive analytics."
  },
  {
    "id": "cert-culturelligence-agile-hr",
    "title": "Agile People Operation Specialist",
    "issuer": "Culturelligence",
    "issueDate": "Jul 2024",
    "credentialId": "APOS-2024-0711",
    "category": "Management & Agile",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Human Resources (HR)",
      "People Operations",
      "Agile Methodologies",
      "Talent Enablement",
      "Workforce Data"
    ],
    "description": "Specialist certification in modern Agile People Operations, employee experience optimization, culture design, workforce data operations, and adaptive HR frameworks."
  },
  {
    "id": "cert-alx-ai-career",
    "title": "Artificial Intelligence Career Essentials (AiCE)",
    "issuer": "ALX Africa",
    "issueDate": "May 2024",
    "credentialId": "ALX-AICE-2024-8842",
    "category": "Data & AI",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Artificial Intelligence",
      "Generative AI",
      "Prompt Engineering",
      "LLM Workflows",
      "Automation"
    ],
    "description": "Specialized ALX accredited certification mastering modern Artificial Intelligence workflows, generative AI platforms, prompt engineering, LLM orchestration, and intelligent workflow automation."
  },
  {
    "id": "cert-hirist-tech-recruiter",
    "title": "Certified Technical Recruiter",
    "issuer": "Hirist (by Cutshort)",
    "issueDate": "Nov 2023",
    "credentialId": "cert_bfxyxv9d",
    "category": "Management & Agile",
    "credentialUrl": "https://hirist.tech/certificate/cert_bfxyxv9d",
    "skills": [
      "Technical Recruitment",
      "Candidate Sourcing",
      "Talent Acquisition",
      "Engineering Screening",
      "Pipeline Analytics"
    ],
    "description": "Credentialed in modern technical recruiting, engineering candidate screening, talent pipeline data management, and recruitment negotiations with direct verifiable ID: cert_bfxyxv9d."
  },
  {
    "id": "cert-excelerate-data-viz",
    "title": "Data Visualization & BI Intern (Power BI & Tableau)",
    "issuer": "Excelerate",
    "issueDate": "Sep 2024",
    "credentialId": "EXC-DVI-2024-3401",
    "category": "Data & AI",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Power BI",
      "Tableau",
      "Interactive Dashboards",
      "Business Intelligence",
      "Analytical Storytelling",
      "DAX"
    ],
    "description": "Hands-on practical data visualization internship creating interactive dashboards in Power BI and Tableau, statistical visual analytics, and transforming raw business datasets into executive KPI insights."
  },
  {
    "id": "cert-hotjar-learning",
    "title": "Behavioral Product Analytics Specialist",
    "issuer": "Hotjar by Contentsquare",
    "issueDate": "Jul 2024",
    "expiresDate": "Dec 2030",
    "credentialId": "x3ftgg2pwb2f",
    "category": "Product & Design",
    "credentialUrl": "https://verify.skilljar.com/c/x3ftgg2pwb2f",
    "skills": [
      "Product Analytics",
      "Heatmaps",
      "Session Recordings",
      "User Behavior Analysis",
      "Funnel Optimization"
    ],
    "description": "Certified in behavioral product analytics, customer sentiment capture, heatmap interpretation, user session recordings, and funnel optimization with verifiable ID: x3ftgg2pwb2f."
  },
  {
    "id": "cert-betechified-cpm",
    "title": "Certified Product Manager (CPM)",
    "issuer": "BeTechified",
    "issueDate": "Feb 2024",
    "credentialId": "CPM-BT-2024-1829",
    "category": "Product & Design",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Product Management",
      "Product Strategy",
      "User Research",
      "Cross-functional Collaboration"
    ],
    "description": "Results-driven product professional credentialed in product strategy, user research, feature prioritization, and cross-functional engineering collaboration."
  },
  {
    "id": "cert-dev-design-uiux",
    "title": "UI/UX Design Certification",
    "issuer": "Dev and Design",
    "issueDate": "May 2024",
    "credentialId": "DD-UIUX-2024-5510",
    "category": "Product & Design",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Product Design",
      "UI/UX Design",
      "Wireframing",
      "User Research",
      "Prototyping"
    ],
    "description": "User experience and interface design certification covering end-to-end product design, wireframing, high-fidelity mockups, and usability principles."
  },
  {
    "id": "cert-prodefied-pm",
    "title": "Applied Product Management",
    "issuer": "Prodefied",
    "issueDate": "Oct 2024",
    "credentialId": "PDF-PM-2024-6012",
    "category": "Product & Design",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Product Management",
      "Product Roadmapping",
      "Feature Prioritization",
      "Agile Delivery"
    ],
    "description": "Applied product lifecycle management, market validation, roadmap development, feature prioritization, and stakeholder synchronization."
  },
  {
    "id": "cert-alx-virtual-assistant",
    "title": "Professional Virtual Assistant Certification",
    "issuer": "ALX Africa",
    "issueDate": "Dec 2023",
    "credentialId": "ALX-VA-2023-7190",
    "category": "Professional & Soft Skills",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Data Entry",
      "Executive Support",
      "Data Hygiene",
      "Workflow Organization",
      "Spreadsheet Auditing"
    ],
    "description": "Accredited virtual assistance training from ALX covering executive support, task prioritization, data management, and digital client communication."
  },
  {
    "id": "cert-fogdev-remote-work",
    "title": "Remote Work Professional",
    "issuer": "FOGDEV (Focus on Growth & Development)",
    "issueDate": "Jun 2024",
    "credentialId": "FOG-RWP-2024-2098",
    "category": "Professional & Soft Skills",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Remote Work",
      "Asynchronous Collaboration",
      "Distributed Team Tools",
      "Digital Productivity"
    ],
    "description": "Certified in remote work best practices, covering asynchronous communication, self-management, distributed documentation, and remote productivity tooling."
  },
  {
    "id": "cert-jobberman-soft-skills",
    "title": "Workplace Soft Skills & Emotional Intelligence",
    "issuer": "Jobberman Youth Engagement & Learning",
    "issueDate": "Oct 2020",
    "credentialId": "JBM-SS-2020-4491",
    "category": "Professional & Soft Skills",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Soft Skills",
      "Workplace Ethics",
      "Emotional Intelligence",
      "Teamwork",
      "Communication"
    ],
    "description": "In-depth soft skills qualification focusing on emotional intelligence, workplace collaboration, problem solving, and professional presentation."
  },
  {
    "id": "cert-unesco-digital-teacher",
    "title": "Certified Digital Educator",
    "issuer": "IOC of UNESCO (Intergovernmental Oceanographic Commission)",
    "issueDate": "Feb 2023",
    "expiresDate": "Aug 2030",
    "credentialId": "UNESCO-IOC-DT-2023",
    "category": "Professional & Soft Skills",
    "credentialUrl": "https://www.linkedin.com/in/opeyemiolamiju/details/certifications/",
    "skills": [
      "Digital Education",
      "Knowledge Facilitation",
      "Global Educational Standards",
      "EdTech Tools"
    ],
    "description": "International certification under the IOC of UNESCO preparing professionals in digital pedagogical delivery, modern e-learning tools, and knowledge dissemination."
  }
];

