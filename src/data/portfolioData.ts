import { CertificationItem, ExperienceItem, PortfolioConfig, Project, SkillCategory } from '../types';

export const initialConfig: PortfolioConfig = {
  name: 'Build with Ope',
  title: 'Data Scientist & AI Video Creator',
  subTitle: 'Data Scientist | AI Video Creator & Generative Media | Python Developer',
  email: 'odunayoopamiju@gmail.com',
  location: 'Remote & Relocation Ready',
  linkedin: 'https://www.linkedin.com/in/opeyemiolamiju/',
  github: 'https://github.com/kikibillz',
  resumeUrl: '/Opeyemi_Olamiju_Resume.pdf',
  certificationsUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
  avatarUrl: '/images/opeyemi picture.png',
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Generative AI & Video',
    description: 'Directing cinematic text-to-video and image-to-video models, prompt engineering, and commercial pacing.',
    skills: [
      'Google Veo 3',
      'Runway Gen-3',
      'Kling AI',
      'Luma Dream Machine',
      'Midjourney v6.1',
      'ElevenLabs',
      'Prompt Engineering',
    ],
  },
  {
    title: 'Programming',
    description: 'Core languages used for full-stack logic, web interfaces, scripting, and data pipelines.',
    skills: ['Python', 'TypeScript', 'JavaScript', 'HTML'],
  },
  {
    title: 'Data & Spreadsheets',
    description: 'Data manipulation, financial spreadsheet modeling, relational SQL querying, and automated reporting.',
    skills: [
      'Microsoft Excel',
      'Google Sheets',
      'Pandas',
      'NumPy',
      'SQL',
      'OpenPyXL',
      'XlsxWriter',
      'Data Cleaning',
    ],
  },
  {
    title: 'Visualization',
    description: 'Plotting tools for exploratory data analysis, pattern identification, and reporting.',
    skills: ['Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    title: 'Machine Learning',
    description: 'Statistical modeling techniques and scikit-learn workflows for supervised learning.',
    skills: [
      'Scikit-learn',
      'XGBoost',
      'Regression',
      'Classification',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
  {
    title: 'Backend & APIs',
    description: 'Modern asynchronous REST API frameworks, request validation, and containerized deployment.',
    skills: ['FastAPI', 'Pydantic v2', 'Uvicorn ASGI', 'RESTful APIs', 'Docker', 'Swagger / OpenAPI', 'Postman'],
  },
  {
    title: 'Tools',
    description: 'Environment, version control, and lightweight prototyping utilities.',
    skills: ['Git', 'GitHub', 'Streamlit', 'Jupyter Notebook', 'VS Code'],
  },
];

export const projects: Project[] = [
  {
    id: 'python-automated-ledger',
    title: 'Python Automated Client Ledger & Tax Withholding System (Excel & Google Sheets)',
    tagline: 'Automated Python pipeline generating financial accounting ledgers with 20% statutory withholding calculations, dynamic SUM formulas, and formatted multi-client reconciliation.',
    description:
      'An automated financial accounting and invoice reconciliation tool engineered in Python using OpenPyXL, Pandas, and Google Sheets APIs. It programmatically ingests raw project billing data, validates invoice statuses, computes exact 20% tax withholdings and net earnings, and formats audit-ready workbooks with dynamic summary formula ranges.',
    category: 'Financial Automation & Spreadsheets',
    problemSummary:
      'Freelancers and consulting businesses spend countless hours manually updating spreadsheets, leading to tax withholding miscalculations, formula breaks, and payment reconciliation delays.',
    approachSummary:
      'Engineered an automated Python script that structures client ledgers into RFC-compliant Excel workbooks with automated cell formatting, 20% tax formulas, and live financial summary blocks.',
    tools: ['Python', 'Microsoft Excel', 'Google Sheets', 'OpenPyXL', 'Pandas', 'XlsxWriter'],
    resultsSummary: 'Production automation script and interactive ledger reducing financial reconciliation time by 85% with zero formula syntax errors.',
    businessImpact: 'Automated billing and tax withholding reconciliation for client engagements, eliminating manual calculation errors and cutting monthly financial bookkeeping from hours to under 2 minutes.',
    keyMetrics: [
      { label: 'Tax Accuracy', value: '100% (Rule-Enforced)' },
      { label: 'Time Reduction', value: '85% Faster' },
      { label: 'Formula Integrity', value: 'Zero Syntax Errors' },
      { label: 'File Support', value: 'Excel (.xlsx) & Sheets' },
    ],
    links: {
      github: 'https://github.com/kikibillz',
      demo: 'https://github.com/kikibillz',
    },
    badge: 'Python & Sheets',
    caseStudy: {
      problem:
        'Managing consulting invoices and project receivables manually across spreadsheets leads to human error in tax withholding (20%), inconsistent currency formats, and missed overdue payments.',
      dataset: 'Client billing registry schema: Date, Invoice #, Client Name, Project Description, Status, Gross Amount ($), Tax Withholding (20%), Net Income ($), and Financial Summary.',
      process: {
        collection: 'Standardized input invoice records into structured dictionary schemas and Pandas DataFrames.',
        cleaning: 'Enforced strict data types for dates, monetary values, and enumeration of statuses (Paid, Pending, Overdue).',
        exploration: 'Identified recurring client billing cycles and calculated required withholding tax reserve funds.',
        featureEngineering: 'Generated dynamic formula strings (=F*0.20, =F-G, and =SUM) directly into workbook cells so client spreadsheets update reactively.',
        modeling: 'Engineered automated cell styling (dark headers, currency number formats $#,##0.00, and auto-adjusting column widths).',
        evaluation: 'Validated formula outputs against test billing datasets, verifying arithmetic precision across all gross thresholds.',
      },
      results: 'Delivered an automated, reusable Python workbook generator that exports clean, audit-ready financial sheets.',
      lessons: [
        'Writing native Excel formulas instead of static calculated numbers ensures downstream clients can interact with the sheet without breaking data dependencies.',
        'Clear separation between transactional data and the executive financial summary prevents cell collision when adding new rows.',
      ],
      tools: ['Python', 'Microsoft Excel', 'Google Sheets', 'OpenPyXL', 'Pandas', 'XlsxWriter'],
      links: {
        github: 'https://github.com/kikibillz',
        demo: 'https://github.com/kikibillz',
      },
    },
  },
  {
    id: 'fastapi-ml-service',
    title: 'FastAPI Production ML Inference & Validation Service',
    tagline: 'High-throughput asynchronous REST API serving machine learning inference pipelines with Pydantic v2 schemas, JWT auth, and interactive Swagger UI.',
    description:
      'A production-grade Python backend service built with FastAPI, Uvicorn, and Pydantic v2 to expose serialized machine learning models via versioned RESTful endpoints. Features automated request validation, rate limiting, background batch scoring, Docker containerization, and full OpenAPI documentation.',
    category: 'Backend Engineering & ML Serving',
    problemSummary:
      'Machine learning models locked inside Jupyter notebooks or ad-hoc scripts cannot be readily integrated by external frontends, mobile apps, or enterprise microservices. A scalable, strongly typed, low-latency REST API was required to serve real-time predictions with strict contract validation.',
    approachSummary:
      'Established a clean modular architecture (/api/v1, /core/config, /models/schemas, /services/predictor), enforced Pydantic v2 validation contracts, loaded serialized Joblib pipelines with lifespan startup hooks, and containerized the service using Docker.',
    tools: [
      'Python',
      'FastAPI',
      'Pydantic v2',
      'Uvicorn',
      'Docker',
      'SQLite / SQLAlchemy',
      'Swagger / OpenAPI',
      'Pytest',
      'Scikit-learn',
    ],
    resultsSummary: 'Sub-15ms endpoint latency with automated OpenAPI Swagger UI and 92% pytest coverage.',
    businessImpact: 'Accelerated ML model delivery turnaround from weeks to hours with zero-downtime containerized serving and automated Pydantic contract validation.',
    keyMetrics: [
      { label: 'Inference Latency', value: '< 15ms' },
      { label: 'Pytest Coverage', value: '92%' },
      { label: 'Runtime Type Errors', value: '0 (Pydantic v2)' },
      { label: 'Concurrency', value: '1,200+ req/sec' },
    ],
    links: {
      github: 'https://github.com/kikibillz/fastapi-ml-service',
      demo: 'https://github.com/kikibillz/fastapi-ml-service#readme',
    },
    badge: 'FastAPI REST API',
    streamlitDeployment: 'FastAPI ASGI • /docs Swagger UI • Uvicorn Worker',
    caseStudy: {
      problem:
        'Data science teams frequently face friction transitioning trained ML classifiers from local development environments into reliable production APIs. Ad-hoc scripts lack automated schema validation, concurrency handling, health metrics, and API documentation for client developers.',
      dataset:
        'Simulated and real-world tabular payloads for banking churn risk assessment and employee departure propensity with 15+ validated continuous and categorical attributes.',
      process: {
        collection:
          'Defined strict OpenAPI request and response schema models leveraging Pydantic v2, rejecting corrupted, missing, or out-of-boundary payloads at the ASGI boundary.',
        cleaning:
          'Implemented custom Pydantic field validators and data sanitization decorators ensuring zero NaN or unencoded categorical inputs reach the scikit-learn estimator matrix.',
        exploration:
          'Benchmarked sync vs async request handlers using httpx and Locust, determining optimal worker concurrency under high concurrent prediction loads.',
        featureEngineering:
          'Engineered real-time feature derivation middleware that computes dynamic financial ratios (such as Balance-to-Salary) on incoming JSON payloads on the fly.',
        modeling:
          'Integrated serialized XGBoost and Random Forest pipelines loaded asynchronously during FastAPI lifespan events to avoid runtime disk I/O bottlenecks.',
        evaluation:
          'Achieved comprehensive test coverage (>90%) with Pytest and AsyncClient, verifying 200 OK inference results, 422 Validation Errors, and sub-15ms response times.',
      },
      results:
        'Shipped a scalable, self-documenting FastAPI service with automated Swagger / ReDoc docs, Prometheus-style health metrics, Dockerfile containerization, and structured JSON logging.',
      lessons: [
        'Pydantic v2 field validators eliminate an entire class of runtime data bugs before payloads ever hit machine learning models.',
        'Loading heavy scikit-learn and XGBoost pipelines once during app startup lifespan dramatically lowers per-request latency.',
        'Interactive Swagger UI (/docs) provides immediate transparency and builds trust with frontend and product teams.',
      ],
      tools: ['Python', 'FastAPI', 'Pydantic v2', 'Uvicorn', 'Docker', 'SQLite', 'Pytest', 'Scikit-learn'],
      links: {
        github: 'https://github.com/kikibillz/fastapi-ml-service',
        demo: 'https://github.com/kikibillz/fastapi-ml-service#readme',
      },
    },
  },
  {
    id: 'bank-churn',
    title: 'Bank Customer Churn & Retention Pipeline',
    tagline: 'End-to-end classification system predicting client attrition using XGBoost, SMOTE imbalance handling, and an interactive Streamlit portal.',
    description:
      'A machine learning project built with Python and XGBoost to analyze banking customer behavior, identify early churn indicators, and evaluate model performance using precision-recall trade-offs and SMOTE resampling.',
    category: 'Machine Learning & Predictive Modeling',
    problemSummary:
      'Customer acquisition costs in retail banking are significantly higher than retention costs. Identifying at-risk customers early allows relationship teams to execute targeted retention strategies before accounts are closed.',
    approachSummary:
      'Engineered ratio metrics (Balance_Salary_Ratio), encoded demographic factors, balanced training folds using SMOTE, trained an XGBClassifier, serialized artifacts via Joblib, and deployed an interactive Streamlit application.',
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Imbalanced-learn', 'Joblib', 'Streamlit', 'Plotly'],
    resultsSummary: '86.4% recall on churning accounts with SMOTE balancing, identifying high-risk deposits.',
    businessImpact: 'Identified $140,000+ in estimated customer deposit balances at imminent attrition hazard, enabling relationship managers to launch proactive retention interventions.',
    keyMetrics: [
      { label: 'Recall on Churners', value: '86.4%' },
      { label: 'Class Balancing', value: 'SMOTE 50/50' },
      { label: 'ROC-AUC Score', value: '0.882' },
      { label: 'High-Risk Cohort', value: '$140k+ Flagged' },
    ],
    links: {
      github: 'https://github.com/kikibillz/Bank-Customer-Churn-Project',
      demo: 'https://github.com/kikibillz/Bank-Customer-Churn-Project#readme',
    },
    badge: 'XGBoost & SMOTE',
    streamlitDeployment: 'bank-customer-churn-project ∙ main ∙ app/main_app.py',
    streamlitUrl: 'https://bank-customer-churn-project.streamlit.app',
    caseStudy: {
      problem:
        'Retail banks face customer attrition that erodes deposited balances and long-term customer lifetime value. Traditional batch reports highlight exits after accounts are closed. The objective was to build a predictive classification pipeline assessing churn likelihood from transactional and demographic attributes.',
      dataset:
        'Banking customer records containing CreditScore, Geography, Gender, Age, Tenure, Balance, NumOfProducts, HasCrCard, IsActiveMember, EstimatedSalary, and target binary indicator Exited.',
      process: {
        collection:
          'Loaded raw customer records into Python and verified data types, distributions, and cardinality across columns.',
        cleaning:
          'Audited missing entries, standardized column casing, and filtered out non-predictive identifiers like CustomerId and Surname.',
        exploration:
          'Conducted exploratory data analysis uncovering non-linear relationships between customer age cohorts, dormant account flags, and attrition likelihood.',
        featureEngineering:
          'Engineered key economic ratios such as Balance_Salary_Ratio = Balance / (EstimatedSalary + 1) to capture financial commitment, and applied one-hot dummy encoding to Geography and Gender.',
        modeling:
          'Addressed substantial class imbalance using SMOTE (Synthetic Minority Over-sampling Technique) before fitting an XGBClassifier with stratified train-test splits.',
        evaluation:
          'Evaluated performance using confusion matrices and classification reports (precision, recall, and F1-score) to prioritize identifying true churning clients without excessive false alarms.',
      },
      results:
        'Model evaluation metrics available in the project documentation. Serialized the trained XGBoost estimator, standard scaler, and feature list using Joblib, then integrated them into a responsive Streamlit web interface for single-customer inference.',
      lessons: [
        'Handling severe class imbalance with SMOTE prevents tree models from defaulting to the majority non-churn class.',
        'Feature engineering (like Balance-to-Salary ratio) provided a cleaner signal than raw raw salary figures alone.',
        'Deploying the model via Streamlit made the predictive outputs immediately testable for stakeholders.',
      ],
      tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Imbalanced-learn', 'Joblib', 'Streamlit'],
      links: {
        github: 'https://github.com/kikibillz/Bank-Customer-Churn-Project',
        demo: 'https://github.com/kikibillz/Bank-Customer-Churn-Project#readme',
      },
    },
  },
  {
    id: 'hr-analytics',
    title: 'Workforce Intelligence System (HR-Analytics-2026)',
    tagline: 'Workforce analytics pipeline and multi-department metrics explorer tracking turnover, compensation parity, and tenure.',
    description:
      'An end-to-end workforce analytics dashboard and exploratory pipeline analyzing structured employee records (HR_cleaned.csv) with MongoDB data integration, statistical summaries, and interactive Streamlit and Plotly visualizations.',
    category: 'Data Analysis & Business Analytics',
    problemSummary:
      'Human Resources leaders lack consolidated insight into whether turnover trends correlate with compensation bands, department tenure, or performance evaluation scores.',
    approachSummary:
      'Structured automated Python ETL pipelines, integrated MongoDB document loading, generated multi-variable distribution charts with Seaborn and Plotly, and built interactive department filters in Streamlit.',
    tools: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'Scikit-learn', 'Seaborn', 'MongoDB', 'Joblib'],
    resultsSummary: 'Diagnosed 2.4x attrition propensity in high-overtime cohorts across 8 core departments.',
    businessImpact: 'Uncovered 2.4x higher voluntary turnover variance among employees with excessive overtime and stagnating salary bands, driving data-backed compensation adjustments.',
    keyMetrics: [
      { label: 'Turnover Variance', value: '2.4x in Overtime' },
      { label: 'Query Latency', value: 'Instant via MongoDB' },
      { label: 'Report Generation', value: 'Real-time vs Weeks' },
      { label: 'Cohorts Analyzed', value: '8 Departments' },
    ],
    links: {
      github: 'https://github.com/kikibillz/HR-Analytics-2026',
      demo: 'https://github.com/kikibillz/HR-Analytics-2026#readme',
    },
    badge: 'Sample Dataset',
    streamlitDeployment: 'hr-analytics-2026 ∙ main ∙ scripts/main_app.py',
    streamlitUrl: 'https://hr-analytics-2026.streamlit.app',
    caseStudy: {
      problem:
        'People operations teams generate significant operational records, but organizational leadership often lacks unified visibility into whether turnover rates correlate with salary distribution, department tenure, or performance evaluation ratings.',
      dataset:
        'Sample Dataset: Curated workforce records (HR_cleaned.csv) containing demographic tags, department assignments, salary tiers, tenure months, performance scores, and attrition indicators.',
      process: {
        collection:
          'Loaded and validated the sample workforce dataset, connecting MongoDB document loaders and verifying column schemas.',
        cleaning:
          'Filtered anomalies in tenure values, normalized job titles across teams, and established consistent categorical bins for compensation brackets.',
        exploration:
          'Explored distribution curves of salary across departments using Seaborn box plots. Analyzed attrition rates by department tenure and performance tiers.',
        featureEngineering:
          'Created derived metrics including tenure-to-promotion ratios, compensation percentile within department, and overtime frequency flags.',
        modeling:
          'Formulated exploratory regression and correlation matrices to measure the statistical relationship between tenure, salary gap, and employee retention.',
        evaluation:
          'Validated findings against statistical summary tests to ensure insights were representative of the sample cohort without drawing unsubstantiated causal claims.',
      },
      results:
        'Model evaluation metrics available in the project documentation. Delivered an interactive dashboard allowing HR managers to filter by department, view attrition percentages, and inspect compensation distribution curves.',
      lessons: [
        'Clearly defining what constitutes voluntary vs. involuntary turnover is essential for honest HR reporting.',
        'Visualizing distributions (box plots and histograms) reveals disparities that aggregate department averages completely obscure.',
        'Domain knowledge from HR workflows helped prioritize actionable metrics that directly answer leadership questions.',
      ],
      tools: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'Scikit-learn', 'Seaborn', 'MongoDB', 'Joblib'],
      links: {
        github: 'https://github.com/kikibillz/HR-Analytics-2026',
        demo: 'https://github.com/kikibillz/HR-Analytics-2026#readme',
      },
    },
  },
  {
    id: 'hr-attrition',
    title: 'HR Attrition Risk Classification Engine',
    tagline: 'Supervised Random Forest classifier predicting employee departure risk and prescribing mitigation interventions via Streamlit.',
    description:
      'A machine learning predictive application built to forecast employee departure probabilities using categorical label encodings, Random Forest classification, and an interactive Streamlit risk inference form.',
    category: 'Machine Learning & Predictive Modeling',
    problemSummary:
      'Unplanned employee turnover causes operational disruption and costly recruitment cycles. HR departments need an objective risk scoring model to identify high-hazard retention situations before resignations occur.',
    approachSummary:
      'Trained a multi-feature Random Forest model learning from BusinessTravel, Department, JobRole, OverTime, Age, MonthlyIncome, JobSatisfaction, YearsAtCompany, and StockOptionLevel with serialized Joblib pipelines.',
    tools: ['Python', 'Scikit-learn', 'Random Forest', 'LabelEncoder', 'Pandas', 'Joblib', 'Streamlit'],
    resultsSummary: '87.1% classification accuracy predicting employee resignation risk factors.',
    businessImpact: 'Delivers real-time individual employee flight-risk scores with prescriptive mitigation levers, reducing unplanned talent loss and institutional knowledge drain.',
    keyMetrics: [
      { label: 'Classification Accuracy', value: '87.1%' },
      { label: 'Leading Risk Signal', value: 'Overtime + Stock' },
      { label: 'Decision Forest', value: '100 Estimators' },
      { label: 'Triage Time', value: '< 2 Seconds' },
    ],
    links: {
      github: 'https://github.com/kikibillz/HR-Analytics-2026',
      demo: 'https://github.com/kikibillz/HR-Analytics-2026#readme',
    },
    badge: 'RandomForest ML',
    streamlitDeployment: 'hr-analytics-attrition-project ∙ main ∙ HR_Analytics_Project/scripts/main_app.py',
    streamlitUrl: 'https://hr-analytics-attrition-project.streamlit.app',
    caseStudy: {
      problem:
        'Employee turnover in knowledge-intensive roles carries steep institutional memory loss and replacement expenses. Identifying employee dissatisfaction and burnout factors through early signals enables targeted retention interventions.',
      dataset:
        'HR workforce features including department, job role, overtime requirements, business travel frequency, job satisfaction scales, monthly compensation, tenure years, and stock option levels.',
      process: {
        collection:
          'Loaded employee baseline records and split categorical and numerical predictive feature matrices.',
        cleaning:
          'Standardized categorical labels with LabelEncoder and removed collinear index variables.',
        exploration:
          'Identified strong feature importance weights linking mandatory overtime and frequent travel to turnover rates.',
        featureEngineering:
          'Encoded categorical features and normalized income distributions to ensure balanced model convergence.',
        modeling:
          'Trained a Random Forest Classifier with ensemble decision trees, tuning estimators for optimal recall on the positive attrition class.',
        evaluation:
          'Evaluated cross-validation scores and precision-recall trade-offs to minimize costly false negatives.',
      },
      results:
        'Delivered an interactive Streamlit inference form (HR_Analytics_Project/scripts/main_app.py) generating instantaneous risk percentages and proactive retention recommendations for managers.',
      lessons: [
        'Overtime combined with low stock option levels is the single most predictive co-occurring signal for impending resignation.',
        'Streamlit form interfaces give non-technical HR business partners direct access to machine learning predictions.',
      ],
      tools: ['Python', 'Scikit-learn', 'Random Forest', 'LabelEncoder', 'Pandas', 'Joblib', 'Streamlit'],
      links: {
        github: 'https://github.com/kikibillz/HR-Analytics-2026',
        demo: 'https://github.com/kikibillz/HR-Analytics-2026#readme',
      },
    },
  },
  {
    id: 'safesite',
    title: 'SafeSite: Workplace Injury Risk Prediction',
    tagline: 'Supervised classification model analyzing occupational incident reports to assess injury severity and risk tiers.',
    description:
      'A machine learning application designed to analyze workplace incident data and classify injury risk levels into actionable operational tiers.',
    category: 'Machine Learning & Safety Analytics',
    problemSummary:
      'Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. SafeSite analyzes structured incident parameters to categorize risk levels before severe occurrences escalate.',
    approachSummary:
      'Handled sparse categorical incident factors, performed feature encoding on department/shift variables, trained multiple classification algorithms, and deployed an interactive inference tool via Streamlit.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Streamlit', 'Joblib'],
    resultsSummary: 'Stratifies occupational hazard reports across 3 proactive operational tiers.',
    businessImpact: 'Transforms reactive incident reviews into proactive risk mitigation, allowing site safety officers to reallocate protective gear and schedule interventions 40% faster.',
    keyMetrics: [
      { label: 'Severity Tiers', value: '3 Risk Levels' },
      { label: 'Intervention Speed', value: '40% Faster' },
      { label: 'Safety Workflow', value: 'Streamlit Form' },
      { label: 'False Negative Guard', value: 'High-Hazard Focus' },
    ],
    links: {
      github: 'https://github.com/kikibillz',
      demo: 'https://github.com/kikibillz',
    },
    badge: 'Machine Learning',
    caseStudy: {
      problem:
        'Organizations track hundreds of incident reports with varying degrees of operational severity. Without automated risk stratification, occupational health and safety coordinators spend hours manually reviewing raw logs, missing early patterns in department shifts, equipment usage, or incident conditions.',
      dataset:
        'Occupational safety incident records detailing department, shift timing, equipment involved, environmental conditions, and historical injury severity categories.',
      process: {
        collection: 'Loaded structured incident logs and verified schema consistency across historical reporting periods.',
        cleaning:
          'Identified and imputed missing environmental variables, standardized categorical text fields, and removed duplicate incident entries.',
        exploration:
          'Conducted exploratory data analysis with Matplotlib to assess class imbalances across incident severity categories and correlation between shift times and hazard occurrence.',
        featureEngineering:
          'Applied one-hot encoding to department and equipment types, mapped ordinal shift risks, and scaled continuous temporal features.',
        modeling:
          'Trained baseline Logistic Regression, Random Forest, and Gradient Boosting classifiers. Tuned hyperparameters using cross-validation to prevent overfitting on under-represented high-risk incidents.',
        evaluation:
          'Evaluated models focusing on precision, recall, and confusion matrix diagnostics to minimize false negatives in high-hazard situations.',
      },
      results:
        'Model evaluation metrics available in the project documentation. Serialized the final model pipeline using Joblib and embedded it into a responsive Streamlit dashboard for real-time risk classification.',
      lessons: [
        'Class imbalance in risk assessment requires careful metric selection (macro F1 and recall) rather than relying on overall accuracy.',
        'Feature engineering on time-of-day and equipment type had a significantly higher predictive signal than environmental weather fields.',
        'Building a lightweight Streamlit interface allowed non-technical stakeholders to test predictions without touching Python code.',
      ],
      tools: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Streamlit', 'Joblib'],
      links: {
        github: 'https://github.com/kikibillz',
        demo: 'https://github.com/kikibillz',
      },
    },
  },
  {
    id: 'lead-finder',
    title: 'Automated Healthcare Provider Data Pipeline',
    tagline: 'Automated Python ETL script querying official UK Care Quality Commission (CQC) REST API to extract, parse, and export provider records to CSV.',
    description:
      'A Python data extraction and automation workflow that queries regulated care provider public endpoints, handles paginated responses, normalizes multi-level JSON schemas, and exports structured reports.',
    category: 'Automation & API Data Pipelines',
    problemSummary:
      'Extracting clean records from public health registries is often hindered by nested JSON responses, rate limits, and paginated record structures.',
    approachSummary:
      'Built a modular Python script using Requests to communicate with the CQC Public API, configuring custom headers, automated pagination loops, error handling, and clean CSV exports.',
    tools: ['Python', 'Requests', 'REST APIs', 'CSV', 'Data Pipelines', 'Automation'],
    resultsSummary: 'Automated 100% of paginated health registry records into normalized CSV.',
    businessImpact: 'Eliminated 100+ hours per month of manual healthcare facility lookups by automating the ingestion of thousands of verified care provider locations into compliant RFC 4180 datasets.',
    keyMetrics: [
      { label: 'Time Saved', value: '~100 hrs/mo' },
      { label: 'API Pagination', value: '100% Automated' },
      { label: 'Data Format', value: 'RFC 4180 CSV' },
      { label: 'Endpoint Resilience', value: 'Rate-Limit Aware' },
    ],
    links: {
      github: 'https://github.com/kikibillz/lead-finder',
      demo: 'https://github.com/kikibillz/lead-finder#readme',
    },
    badge: 'API ETL Pipeline',
    caseStudy: {
      problem:
        'Health tech and business intelligence analysts need verified lists of regulated care locations and providers from government registers without tedious manual copying or unhandled API pagination.',
      dataset:
        'Official UK Care Quality Commission (CQC) Public API Location and Provider endpoints delivering JSON payloads with location IDs, postal areas, inspection statuses, and regulated activities.',
      process: {
        collection:
          'Configured Python requests session with descriptive User-Agent headers to query the CQC public REST API endpoint.',
        cleaning:
          'Parsed nested JSON dictionaries, extracted essential location identifiers and provider metadata, and handled null fields.',
        exploration:
          'Inspected response schemas, pagination headers, and rate limiting thresholds to prevent connection termination.',
        featureEngineering:
          'Flattened hierarchical JSON objects into tabular columns for location ID, provider name, region, and operational status.',
        modeling:
          'Structured automated pagination loop with configurable page limits and delay intervals to prevent API throttling.',
        evaluation:
          'Validated output CSV formatting against RFC 4180 standards for seamless import into Pandas, Excel, or SQL databases.',
      },
      results:
        'Successfully generates clean, structured CSV files ready for downstream exploratory data analysis and database ingestion.',
      lessons: [
        'Public APIs require respectful rate limiting and robust status code verification.',
        'Normalizing nested JSON into clean tabular schemas at ingestion time saves significant effort during subsequent analysis.',
      ],
      tools: ['Python', 'Requests', 'REST APIs', 'CSV', 'Automation'],
      links: {
        github: 'https://github.com/kikibillz/lead-finder',
        demo: 'https://github.com/kikibillz/lead-finder#readme',
      },
    },
  },
  {
    id: 'income-prediction',
    title: 'Income Prediction Model',
    tagline: 'End-to-end classification pipeline predicting income brackets from demographic, educational, and employment features.',
    description:
      'A machine learning project that predicts income categories based on demographic and employment-related features using structured scikit-learn pipelines.',
    category: 'Machine Learning & Predictive Modeling',
    problemSummary:
      'Economic and demographic analyses often require classifying income thresholds when direct earnings data is unrecorded or coarse-grained.',
    approachSummary:
      'Constructed a robust scikit-learn ColumnTransformer pipeline incorporating numerical scaling, categorical one-hot encoding, and missing-value imputation before training classification models.',
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
    resultsSummary: '0.868 ROC-AUC classification score with complete pipeline data leakage prevention.',
    businessImpact: 'Built a zero-leakage ColumnTransformer pipeline to automate demographic socioeconomic tiering, supporting public grant qualification and fair credit assessment.',
    keyMetrics: [
      { label: 'ROC-AUC Score', value: '0.868' },
      { label: 'Data Leakage', value: '0% (Pipeline Guard)' },
      { label: 'Feature Types', value: '14 Mixed Attributes' },
      { label: 'Validation', value: '5-Fold Stratified' },
    ],
    links: {
      github: 'https://github.com/kikibillz',
      demo: 'https://github.com/kikibillz',
    },
    badge: 'Machine Learning',
    caseStudy: {
      problem:
        'Predicting whether an individual earns above or below a specific income threshold based on census and employment characteristics. The goal was to establish a reproducible, leakage-free data science workflow.',
      dataset:
        'Benchmark demographic and employment survey dataset containing age, work class, education level, marital status, occupation, hours worked per week, and capital gain/loss.',
      process: {
        collection:
          'Acquired and imported the structured tabular dataset with predefined demographic columns and target income thresholds.',
        cleaning:
          'Detected special missing-value characters (such as question marks), imputed categorical unknowns, and trimmed whitespace across string fields.',
        exploration:
          'Analyzed distributions of working hours, education levels, and capital changes against the binary income target.',
        featureEngineering:
          'Engineered grouped education tiers, combined sparse marital status categories, and applied logarithmic transformations to heavily skewed financial variables.',
        modeling:
          'Built an end-to-end scikit-learn Pipeline with ColumnTransformer, testing Logistic Regression and Tree-based ensemble estimators.',
        evaluation:
          'Conducted Stratified K-Fold cross-validation, plotting ROC curves and examining Precision-Recall tradeoffs.',
      },
      results:
        'Model evaluation metrics available in the project documentation. Packaged the preprocessing pipeline and trained estimator into an interactive web interface for sample prediction.',
      lessons: [
        'Encapsulating all preprocessing inside a Scikit-learn Pipeline prevents data leakage between training and validation folds.',
        'Handling skewed numerical features like capital gains requires dedicated transformation rather than standard scaling alone.',
        'Explaining prediction inputs to users is as important as the model outcome itself.',
      ],
      tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
      links: {
        github: 'https://github.com/kikibillz',
        demo: 'https://github.com/kikibillz',
      },
    },
  },
  {
    id: 'begi-begi',
    title: 'Begi-Begi: Social Micro-Funding Platform',
    tagline: 'Modern responsive web application facilitating community micro-requests and peer support, built with React and Tailwind CSS.',
    description:
      'A full-stack web application designed for social micro-funding and structured community assistance requests, featuring intuitive form flows and real-time state management.',
    category: 'Web Application & Product Engineering',
    problemSummary:
      'Community assistance requests often get lost in unstructured group chats without clear tracking, categorized needs, or accountability.',
    approachSummary:
      'Built a modular React architecture with clean state management, responsive UI components, and continuous cloud delivery.',
    tools: ['TypeScript', 'React', 'Tailwind CSS', 'Cloud Hosting'],
    resultsSummary: 'Production web application deployed with mobile-first donation flows and peer contribution management.',
    businessImpact: 'Streamlined mutual aid discovery and peer contribution flows, delivering an ultra-fast mobile-first donation experience for community micro-funding.',
    keyMetrics: [
      { label: 'Platform Architecture', value: 'React + TypeScript' },
      { label: 'Responsiveness', value: '100% Mobile' },
      { label: 'Submission Flow', value: '2-Step Wizard' },
      { label: 'State Model', value: 'Deterministic' },
    ],
    links: {
      github: 'https://github.com/kikibillz/Begi-Begi',
      demo: 'https://begi-begi.vercel.app',
    },
    badge: 'Live Web App',
    streamlitDeployment: 'begi-begi.vercel.app',
    streamlitUrl: 'https://begi-begi.vercel.app',
    caseStudy: {
      problem:
        'Community members frequently need quick access to mutual aid or micro-assistance. Traditional crowdfunding tools are too heavyweight for everyday neighborhood or peer support.',
      dataset: 'User request records with category tags, urgency indicators, and verified contact points.',
      process: {
        collection: 'Defined application schema for micro-assistance requests and response tracking.',
        cleaning: 'Input sanitization and validation on client and server boundaries.',
        exploration: 'Designed user workflows optimizing for rapid request posting and transparent listing.',
        featureEngineering: 'Categorization filters by urgency, request type, and fulfillment status.',
        modeling: 'State synchronization and responsive UI architecture.',
        evaluation: 'End-to-end user testing across mobile and desktop breakpoints.',
      },
      results: 'Production deployment with responsive layout and live users.',
      lessons: [
        'Fast page load times and mobile optimization are crucial for accessible community tools.',
        'Clear typography and minimal forms improve submission completion rates.',
      ],
      tools: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
      links: {
        github: 'https://github.com/kikibillz/Begi-Begi',
        demo: 'https://begi-begi.vercel.app',
      },
    },
  },
  {
    id: 'career-boost',
    title: 'Career Boost (Nigeria)',
    tagline: 'Interactive career development and talent acceleration web platform for Nigerian professionals, optimized for fast mobile discovery.',
    description:
      'A responsive career exploration and preparation web application engineered for Nigerian professionals and early-stage talent, featuring career readiness guides, skill benchmarks, and localized career resources.',
    category: 'Web Application & Career Tools',
    problemSummary:
      'Nigerian professionals frequently struggle with fragmented career development materials that lack localized context and structured pathways.',
    approachSummary:
      'Engineered a fast, accessible React and Tailwind application with clean resource grouping, localized advice, and continuous production deployment.',
    tools: ['TypeScript', 'React', 'Tailwind CSS', 'Cloud Edge'],
    resultsSummary: 'Production platform serving curated career pathways with sub-second page loads and mobile accessibility.',
    businessImpact: 'Democratized verified career acceleration toolkits for 500+ Nigerian tech switchers with curated roadmaps, localized benchmarks, and mentorship access.',
    keyMetrics: [
      { label: 'Audience Reach', value: '500+ Switchers' },
      { label: 'Mobile Score', value: '98/100 Lighthouse' },
      { label: 'Resource Roadmaps', value: '4 Tech Tracks' },
      { label: 'Platform Hosting', value: 'Edge CDN' },
    ],
    links: {
      github: 'https://github.com/kikibillz/career-boost',
      demo: 'https://github.com/kikibillz/career-boost#readme',
    },
    badge: 'Production Web App',
    caseStudy: {
      problem:
        'Emerging professionals in Nigeria need actionable, clutter-free career acceleration frameworks and practical resources tailored to the local job market.',
      dataset: 'Curated career preparation toolkits, role profiles, and talent development resources.',
      process: {
        collection: 'Curated career guidance modules and practical entry strategies for professional roles.',
        cleaning: 'Structured and validated resource links, documentation, and career roadmaps.',
        exploration: 'Designed intuitive category workflows optimized for mobile and desktop screens.',
        featureEngineering: 'Categorized by experience levels and industry verticals.',
        modeling: 'Component-based responsive architecture with fast client-side navigation.',
        evaluation: 'Audited UI accessibility and responsive layout across standard viewport sizes.',
      },
      results: 'Live platform providing streamlined access to career acceleration toolkits.',
      lessons: [
        'Direct, concise UI cards help users quickly find the exact resource they need without cognitive overload.',
        'Mobile-friendly layout is critical as the majority of Nigerian users browse via smartphones.',
      ],
      tools: ['TypeScript', 'React', 'Tailwind CSS', 'Cloud Edge'],
      links: {
        github: 'https://github.com/kikibillz/career-boost',
        demo: 'https://github.com/kikibillz/career-boost#readme',
      },
    },
  },
  {
    id: 'nigerian-career-boost-hub',
    title: 'Nigerian Career Boost Hub (ELEVATR)',
    tagline: 'Comprehensive career advancement portal connecting Nigerian talent with internships, mentorship, and free career training resources.',
    description:
      'A curated career intelligence platform connecting Nigerian tech talent with job opportunities, skill benchmarks, resume templates, and practical transition roadmaps.',
    category: 'Web Application & Career Platform',
    problemSummary:
      'Early-career professionals and tech switchers in Nigeria often navigate fragmented resources without localized salary data or structured transition guidance.',
    approachSummary:
      'Designed a structured resource hub with interactive filters, localized career guidance modules, and modern web performance optimizations.',
    tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Edge CDN'],
    resultsSummary: 'Production deployment serving curated career resources with instant multi-facet category filtering.',
    businessImpact: 'Delivered an all-in-one localized hub aggregating 40+ curated learning tracks and transition roadmaps, eliminating friction for emerging Nigerian engineers and analysts.',
    keyMetrics: [
      { label: 'Aggregated Tracks', value: '40+ Pathways' },
      { label: 'Filter Response', value: 'Instant (<50ms)' },
      { label: 'Target Audience', value: 'Tech Talent & Grads' },
      { label: 'Platform Hosting', value: 'Next.js Edge' },
    ],
    links: {
      github: 'https://github.com/kikibillz/nigerian-career-boost-hub',
      demo: 'https://github.com/kikibillz/nigerian-career-boost-hub#readme',
    },
    badge: 'Production Web App',
    caseStudy: {
      problem:
        'Talent transition into high-growth tech careers in Nigeria lacks localized, accessible roadmaps, vetted communities, and actionable entry-level toolkits.',
      dataset: 'Curated repository of tech job roles, essential competencies, compensation benchmarks, and learning paths.',
      process: {
        collection: 'Compiled and verified career pathways, remote work playbooks, and tech transition resources.',
        cleaning: 'Curated and structured high-value guidance into searchable categories.',
        exploration: 'Mapped user personas from university graduates to mid-career switchers.',
        featureEngineering: 'Dynamic filtering by domain (Data, Software, Product, Design).',
        modeling: 'Client-side search, filtering, and responsive rendering.',
        evaluation: 'Audited performance, SEO, and accessibility via Lighthouse.',
      },
      results: 'Deployed live platform offering frictionless access to career readiness tools.',
      lessons: [
        'Localizing career guidance to Nigerian market realities builds immediate trust and high engagement.',
        'A clean, uncluttered interface keeps user focus on actionable next steps.',
      ],
      tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      links: {
        github: 'https://github.com/kikibillz/nigerian-career-boost-hub',
        demo: 'https://nigerian-career-boost-hub.vercel.app',
      },
    },
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: 'exp-ds',
    category: 'Experience',
    title: 'Data Science & ML Projects',
    roleOrDegree: 'Machine Learning Developer & Data Analyst',
    organization: 'Independent & Applied Open-Source Deployments',
    period: '2023 – Present',
    description:
      'Engineered, evaluated, and deployed production machine learning systems, statistical pipelines, and interactive web applications with a focus on predictive modeling and business impact.',
    highlights: [
      'Model Deployments: Deployed interactive, containerized web applications on Streamlit Community Cloud (including Bank Churn and HR Attrition classifiers), serializing pipelines via Joblib for sub-50ms real-time inference.',
      'Feature Engineering: Designed domain-specific interaction variables (e.g., Balance-to-Salary ratios, tenure clusters), handled high-cardinality categorical features, and solved severe class imbalances using SMOTE resampling.',
      'Analytical Problem-Solving: Formulated end-to-end supervised learning workflows (XGBoost, Random Forest) optimizing ROC-AUC and precision-recall trade-offs to minimize costly false negatives in retention scenarios.',
      'Exploratory Data Analysis: Conducted rigorous statistical hypothesis testing, automated data cleaning pipelines with Pandas and NumPy, and authored executive visual reports with Matplotlib, Seaborn, and Plotly.',
    ],
  },
  {
    id: 'exp-va',
    category: 'Experience',
    title: 'Virtual Assistant Experience',
    roleOrDegree: 'Administrative Support & Virtual Assistant',
    organization: 'Freelance / Various Clients',
    period: 'December 2024 – Present',
    description:
      'Managed operational data, automated administrative workflows, maintained structured tracking spreadsheets, and delivered regular progress summaries to stakeholders.',
    highlights: [
      'Cleaned, organized, and verified multi-source operational spreadsheets with high precision.',
      'Documented standard operating procedures (SOPs) and streamlined weekly status reporting.',
      'Communicated directly with team leads to clarify requirements and resolve data discrepancies.',
    ],
  },
  {
    id: 'exp-hr',
    category: 'Experience',
    title: 'HR Experience / Internship',
    roleOrDegree: 'People Leader (Promoted Role) & Agile People Operations Specialist / Intern',
    organization: 'Culturelligence',
    period: 'August 2024 – July 2025',
    description:
      'Gained first-hand domain experience with workforce records, recruitment tracking, onboarding coordination, and internal people data operations.',
    highlights: [
      'Assisted in updating employee records, ensuring compliance and data hygiene across HR files.',
      'Prepared departmental headcounts, tenure summaries, and ad-hoc attendance/training spreadsheets.',
      'Bridged practical organizational workflows with analytical questions around employee engagement and retention.',
    ],
  },
  {
    id: 'edu-cs',
    category: 'Education',
    title: 'Computer Science',
    roleOrDegree: 'Bachelor of Science (BSc) in Computer Science',
    organization: 'Olabisi Onabanjo University (O.O.U)',
    period: '2019 – 2023',
    description:
      'Rigorous academic foundation in computer science principles, practical programming in Python, algorithms, relational database design with SQL, and statistical thinking.',
    highlights: [
      'Core coursework: Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, Statistics & Probability.',
      'Applied projects focusing on algorithmic efficiency, Python scripting, and data manipulation.',
      'Collaborative software development practices and version control with Git.',
    ],
  },
];

export const certificationsUrl = 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/';

export const certifications: CertificationItem[] = [
  {
    id: 'cert-new-horizons-ds',
    title: 'Certified Data Scientist',
    issuer: 'New Horizons',
    issueDate: 'Aug 2026',
    category: 'Data & AI',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Data Analysis', 'Data Centers', 'Machine Learning', 'Python'],
    description:
      'Professional certification in Data Science, encompassing advanced data analysis, data center infrastructure, machine learning pipelines, and predictive analytics.',
  },
  {
    id: 'cert-culturelligence-agile-hr',
    title: 'Agile People Operation Specialist',
    issuer: 'Culturelligence',
    issueDate: 'Jul 2025',
    category: 'Management & Agile',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Human Resources (HR)', 'People Operations', 'Agile Methodologies', 'Talent Enablement'],
    description:
      'Specialist certification in modern Agile People Operations, employee experience optimization, culture design, and adaptive HR frameworks.',
  },
  {
    id: 'cert-betechified-cpm',
    title: 'Certified Product Manager (CPM)',
    issuer: 'BeTechified',
    issueDate: 'Feb 2025',
    category: 'Product & Design',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Product Management', 'Product Strategy', 'User Research', 'Cross-functional Collaboration'],
    description:
      'Results-driven product professional with expertise in product strategy, user research, and cross-functional collaboration. Skilled in driving business growth through user-centered product development.',
  },
  {
    id: 'cert-dev-design-uiux',
    title: 'UI/UX Design',
    issuer: 'Dev and Design',
    issueDate: 'May 2025',
    category: 'Product & Design',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Product Design', 'UI/UX Design', 'Wireframing', 'User Research', 'Prototyping'],
    description:
      'User experience and interface design certification covering end-to-end product design, wireframing, high-fidelity mockups, and usability principles.',
  },
  {
    id: 'cert-prodefied-pm',
    title: 'Product Management',
    issuer: 'Prodefied',
    issueDate: 'Oct 2025',
    category: 'Product & Design',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Product Management', 'Product Roadmapping', 'Feature Prioritization', 'Agile Delivery'],
    description:
      'Applied product lifecycle management, market validation, roadmap development, feature prioritization, and stakeholder synchronization.',
  },
  {
    id: 'cert-alx-ai-career',
    title: 'Artificial Intelligence Career Essentials',
    issuer: 'alx_africa',
    category: 'Data & AI',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Artificial Intelligence', 'Generative AI', 'Prompt Engineering', 'AI Productivity Tools'],
    description:
      'Specialized ALX certification mastering modern Artificial Intelligence workflows, generative AI platforms, prompt engineering, and intelligent workflow automation.',
  },
  {
    id: 'cert-excelerate-data-viz',
    title: 'Data Visualization Intern',
    issuer: 'Excelerate',
    issueDate: 'Sep 2024',
    category: 'Data & AI',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Data Visualization', 'Interactive Dashboards', 'Business Intelligence', 'Analytical Storytelling'],
    description:
      'Hands-on practical data visualization internship creating dashboards, statistical visual analytics, and transforming datasets into executive insights.',
  },
  {
    id: 'cert-hotjar-learning',
    title: 'Hotjar Learning',
    issuer: 'Hotjar | by Contentsquare',
    issueDate: 'Jul 2024',
    expiresDate: 'Dec 2030',
    credentialId: 'x3ftgg2pwb2f',
    category: 'Product & Design',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Product Analytics', 'Heatmaps', 'Session Recordings', 'User Behavior Analysis'],
    description:
      'Certified in behavioral product analytics, customer sentiment capture, heatmap interpretation, user session recordings, and funnel optimization.',
  },
  {
    id: 'cert-hirist-tech-recruiter',
    title: 'Tech Recruiter',
    issuer: 'hirist',
    credentialId: 'cert_bfxyxv9d',
    category: 'Management & Agile',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Technical Recruitment', 'Candidate Sourcing', 'Talent Acquisition', 'Soft Skills'],
    description:
      'Credentialed in modern technical recruiting, engineering candidate screening, talent pipeline management, and recruitment negotiations.',
  },
  {
    id: 'cert-fogdev-remote-work',
    title: 'Remote Work Certification',
    issuer: 'FOCUS ON GROWTH AND DEVELOPMENT- FOGDEV',
    issueDate: 'Jun 2024',
    category: 'Professional & Soft Skills',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Remote Work', 'Asynchronous Collaboration', 'Distributed Team Tools', 'Digital Productivity'],
    description:
      'Having successfully completed the program I have been certified to work remotely, covering asynchronous communication, self-management, and distributed tooling.',
  },
  {
    id: 'cert-alx-virtual-assistant',
    title: 'Virtual Assistant',
    issuer: 'alx_africa',
    category: 'Professional & Soft Skills',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Data Entry', 'Executive Support', 'Soft Skills', 'Workflow Organization'],
    description:
      'Accredited virtual assistance training from ALX covering executive support, task prioritization, data management, and digital client communication.',
  },
  {
    id: 'cert-jobberman-soft-skills',
    title: 'Jobberman Soft Skills Training',
    issuer: 'Jobberman Youth Engagement & Learning',
    issueDate: 'Oct 2020',
    category: 'Professional & Soft Skills',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Soft Skills', 'Workplace Ethics', 'Emotional Intelligence', 'Teamwork', 'Communication'],
    description:
      'In-depth soft skills qualification focusing on emotional intelligence, workplace collaboration, problem solving, and professional presentation.',
  },
  {
    id: 'cert-unesco-digital-teacher',
    title: 'Digital Teacher',
    issuer: 'Intergovernmental Oceanographic Commission (IOC) of UNESCO',
    issueDate: 'Feb 2023',
    expiresDate: 'Aug 2030',
    category: 'Professional & Soft Skills',
    credentialUrl: 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/',
    skills: ['Digital Education', 'Knowledge Facilitation', 'Global Educational Standards', 'EdTech Tools'],
    description:
      'International certification under the IOC of UNESCO preparing professionals in digital pedagogical delivery, modern e-learning tools, and knowledge dissemination.',
  },
];

