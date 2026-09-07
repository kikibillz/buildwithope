import { ExperienceItem, PortfolioConfig, Project, SkillCategory } from '../types';

export const initialConfig: PortfolioConfig = {
  name: 'Build with Ope',
  title: 'Data Scientist & AI Video Creator',
  subTitle: 'Data Scientist | AI Video Creator & Generative Media | Python Developer',
  email: 'odunayoopamiju@gmail.com',
  location: 'Lagos, Nigeria',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com/kikibillz',
  resumeUrl: '#',
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
    description: 'Core programming language used for scripting, analysis, and data pipelines.',
    skills: ['Python'],
  },
  {
    title: 'Data',
    description: 'Libraries and query languages for manipulating, querying, and structuring tabular data.',
    skills: ['Pandas', 'NumPy', 'SQL', 'Data Cleaning'],
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
    title: 'Tools',
    description: 'Environment, version control, and lightweight prototyping utilities.',
    skills: ['Git', 'GitHub', 'Streamlit', 'Jupyter Notebook', 'VS Code'],
  },
];

export const projects: Project[] = [
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
    resultsSummary: 'Model evaluation metrics available in the project documentation.',
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
    resultsSummary: 'Model evaluation metrics available in the project documentation.',
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
    resultsSummary: 'Model evaluation metrics available in the project documentation.',
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
    title: 'SafeSite — Workplace Injury Risk Prediction',
    tagline: 'Supervised classification model analyzing occupational incident reports to assess injury severity and risk tiers.',
    description:
      'A machine learning application designed to analyze workplace incident data and classify injury risk levels into actionable operational tiers.',
    category: 'Machine Learning & Safety Analytics',
    problemSummary:
      'Workplace incident logs contain valuable historical patterns, but safety officers often review them reactively. SafeSite analyzes structured incident parameters to categorize risk levels before severe occurrences escalate.',
    approachSummary:
      'Handled sparse categorical incident factors, performed feature encoding on department/shift variables, trained multiple classification algorithms, and deployed an interactive inference tool via Streamlit.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Streamlit', 'Joblib'],
    resultsSummary: 'Model evaluation metrics available in the project documentation.',
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
    resultsSummary: 'Pipeline execution logs and schema definitions available in project repository.',
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
    resultsSummary: 'Model evaluation metrics available in the project documentation.',
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
