import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

function generateResumePdf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2; // 532 pt

  let y = margin;

  // Colors
  const darkColor = [24, 24, 27]; // #18181b
  const accentColor = [16, 115, 85]; // #107355 (Forest/Emerald)
  const mutedColor = [82, 82, 91]; // #52525b
  const lightBgColor = [244, 244, 245]; // #f4f4f5
  const lineCol = [228, 228, 231]; // #e4e4e7

  // Helpers
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  const drawSectionHeading = (title: string) => {
    checkPageBreak(30);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(title.toUpperCase(), margin, y);

    // Section underline
    const textWidth = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(1.5);
    doc.line(margin, y + 3, margin + textWidth + 10, y + 3);

    doc.setDrawColor(lineCol[0], lineCol[1], lineCol[2]);
    doc.setLineWidth(0.5);
    doc.line(margin + textWidth + 12, y + 3, margin + contentWidth, y + 3);

    y += 16;
  };

  // 1. Header (Name, Title, Contact Info)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('ODUNAYO OPAMIJU', margin, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('(BUILD WITH OPE)', margin + doc.getTextWidth('ODUNAYO OPAMIJU') + 8, y + 3);

  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Data Scientist | Python & FastAPI Developer | AI Video Creator', margin, y);

  y += 14;

  // Contact line
  doc.setFontSize(8.5);
  const contactParts = [
    'Email: odunayoopamiju@gmail.com',
    'Location: Lagos, Nigeria',
    'GitHub: github.com/kikibillz',
    'LinkedIn: linkedin.com',
  ];
  doc.text(contactParts.join('   •   '), margin, y);

  y += 12;

  // Top divider
  doc.setDrawColor(lineCol[0], lineCol[1], lineCol[2]);
  doc.setLineWidth(0.75);
  doc.line(margin, y, margin + contentWidth, y);
  y += 4;

  // 2. Professional Summary
  drawSectionHeading('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  const summaryText =
    'Results-driven Data Scientist, Python Developer, and Generative Media Specialist with a BSc in Computer Science. Experienced in architecting production machine learning systems, high-throughput asynchronous REST APIs (FastAPI, Pydantic v2), and interactive data products (Streamlit). Skilled in exploratory data analysis, predictive modeling (XGBoost, Scikit-learn), feature engineering, and directing commercial-grade AI video productions (Google Veo, Runway, Kling AI). Proven track record delivering scalable, verifiable software and cross-functional operations.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11 + 4;

  // 3. Technical Skills
  drawSectionHeading('Technical Skills');
  const skillsData = [
    { cat: 'Programming', items: 'Python, TypeScript, JavaScript, HTML, SQL' },
    { cat: 'Data Science & ML', items: 'Pandas, NumPy, Scikit-learn, XGBoost, Regression, Classification, Feature Engineering, SMOTE' },
    { cat: 'Backend & APIs', items: 'FastAPI, Pydantic v2, Uvicorn ASGI, RESTful APIs, Docker, SQLAlchemy, OpenAPI / Swagger, Pytest' },
    { cat: 'Visualization & UI', items: 'Matplotlib, Seaborn, Plotly, Streamlit, React, Tailwind CSS' },
    { cat: 'Generative AI & Video', items: 'Google Veo 3, Runway Gen-3, Kling AI, Luma Dream Machine, Midjourney v6.1, ElevenLabs, Prompt Engineering' },
    { cat: 'Tools & DevOps', items: 'Git, GitHub, Docker, Postman, Linux, Jupyter Notebook, VS Code, Vercel' },
  ];

  doc.setFontSize(8.5);
  skillsData.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    const label = `${s.cat}: `;
    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const valLines = doc.splitTextToSize(s.items, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += valLines.length * 10.5 + 2;
  });

  // 4. Professional Experience
  drawSectionHeading('Professional Experience');

  const experiences = [
    {
      role: 'Machine Learning Developer & Data Analyst',
      org: 'Independent & Applied Open-Source Deployments',
      period: '2023 – Present',
      bullets: [
        'Engineered, evaluated, and deployed machine learning pipelines and interactive web applications using Streamlit and FastAPI.',
        'Serialized trained classification models (XGBoost, Random Forest) via Joblib, enabling sub-50ms real-time inference latency.',
        'Engineered interaction variables, resolved high-cardinality categorical features, and handled severe class imbalance using SMOTE.',
        'Built asynchronous REST API endpoints with FastAPI and Pydantic v2 validation contracts, achieving >90% test coverage with Pytest.',
      ],
    },
    {
      role: 'Administrative Support & Virtual Assistant',
      org: 'Freelance / Various Clients',
      period: 'Dec 2024 – Present',
      bullets: [
        'Managed operational datasets, automated administrative workflows, and maintained structured tracking spreadsheets with zero error rate.',
        'Standardized standard operating procedures (SOPs), cleaned multi-source business data, and delivered weekly progress summaries.',
      ],
    },
    {
      role: 'People Leader (Promoted) & Agile People Operations Specialist',
      org: 'Culturelligence',
      period: 'Aug 2024 – Jul 2025',
      bullets: [
        'Maintained workforce records, monitored recruitment analytics, and optimized internal onboarding data pipelines.',
        'Prepared departmental headcount, tenure summaries, and attrition indicators for leadership review.',
        'Promoted to People Leader for workflow efficiency, cross-team accountability, and operational excellence.',
      ],
    },
  ];

  experiences.forEach((exp) => {
    checkPageBreak(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(exp.period, margin + contentWidth - doc.getTextWidth(exp.period), y);

    y += 11;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(exp.org, margin, y);

    y += 10;

    exp.bullets.forEach((bullet) => {
      checkPageBreak(25);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

      // Bullet dot
      doc.text('•', margin + 4, y);
      const bulletLines = doc.splitTextToSize(bullet, contentWidth - 16);
      doc.text(bulletLines, margin + 14, y);
      y += bulletLines.length * 10 + 1.5;
    });

    y += 4;
  });

  // 5. Featured Projects
  drawSectionHeading('Featured Projects');

  const featuredProjects = [
    {
      name: 'FastAPI Production ML Inference & Validation Service',
      stack: 'FastAPI, Pydantic v2, Uvicorn, Docker, Scikit-learn',
      desc: 'Production-ready asynchronous REST API serving ML models with dynamic request validation, automated Swagger UI docs, and sub-15ms latency.',
    },
    {
      name: 'Bank Customer Churn Predictor & Retention Engine',
      stack: 'Python, Scikit-learn, XGBoost, Streamlit, Pandas',
      desc: 'Supervised classification app predicting customer departure with 86% ROC-AUC, interactive risk dials, and automated financial retention suggestions.',
    },
    {
      name: 'HR Analytics & Employee Attrition Intelligence',
      stack: 'Python, Streamlit, Seaborn, Random Forest',
      desc: 'Diagnostic platform uncovering turnover drivers across salary, tenure, and department metrics with real-time risk scoring.',
    },
    {
      name: 'Commercial AI Video Productions (Google Veo & Runway Gen-3)',
      stack: 'Google Veo 3, Runway Gen-3, Kling AI, ElevenLabs',
      desc: 'High-retention commercial adverts (e.g. Indomie, Luxury Real Estate, AI Tech Promos) directing prompt cinematography and dynamic voiceovers.',
    },
  ];

  featuredProjects.forEach((proj) => {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(proj.name, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    const stackText = `[${proj.stack}]`;
    doc.text(stackText, margin + contentWidth - doc.getTextWidth(stackText), y);

    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const descLines = doc.splitTextToSize(proj.desc, contentWidth - 8);
    doc.text(descLines, margin + 8, y);
    y += descLines.length * 9.5 + 4;
  });

  // 6. Education
  drawSectionHeading('Education');
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('Bachelor of Science (BSc) in Computer Science', margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const eduPeriod = '2019 – 2023';
  doc.text(eduPeriod, margin + contentWidth - doc.getTextWidth(eduPeriod), y);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Olabisi Onabanjo University (O.O.U) — Ogun State, Nigeria', margin, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const eduDetails = 'Key Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (SQL), Software Engineering, Probability & Statistics.';
  const eduLines = doc.splitTextToSize(eduDetails, contentWidth);
  doc.text(eduLines, margin, y);

  // Output
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  const outputPath = path.join(process.cwd(), 'public', 'Odunayo_Opamiju_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBuffer);

  // Also write a copy as resume.pdf
  const resumeCopy = path.join(process.cwd(), 'public', 'resume.pdf');
  fs.writeFileSync(resumeCopy, pdfBuffer);

  console.log(`Successfully generated resume PDF at ${outputPath} (${pdfBuffer.length} bytes)`);
}

generateResumePdf();
