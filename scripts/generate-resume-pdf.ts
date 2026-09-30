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
  const margin = 36;
  const contentWidth = pageWidth - margin * 2; // 540 pt

  let y = margin;

  // Colors
  const darkSlate = [15, 23, 42];      // #0f172a - rich deep slate
  const bodyText = [51, 65, 85];       // #334155 - comfortable readable slate
  const tealAccent = [13, 148, 136];    // #0d9488 - vibrant deep teal
  const tealDark = [15, 118, 110];     // #0f766e - dark teal
  const lightMuted = [100, 116, 139];  // #64748b - muted label slate
  const borderLight = [226, 232, 240]; // #e2e8f0 - soft divider line
  const tagBg = [241, 245, 249];       // #f1f5f9 - light tag background

  // Section Heading Helper
  const drawSectionHeading = (title: string, iconLetter?: string) => {
    y += 10;
    doc.setDrawColor(tealAccent[0], tealAccent[1], tealAccent[2]);
    doc.setFillColor(tealAccent[0], tealAccent[1], tealAccent[2]);
    doc.rect(margin, y - 9, 3, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    doc.text(title.toUpperCase(), margin + 8, y);

    const titleWidth = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.75);
    doc.line(margin + 12 + titleWidth, y - 3, margin + contentWidth, y - 3);

    y += 14;
  };

  // Page 1 Footer Helper
  const drawFooter = (pageNum: number, totalPages: number) => {
    const footerY = pageHeight - 22;
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 8, margin + contentWidth, footerY - 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
    doc.text('Opeyemi Olamiju — Curriculum Vitae', margin, footerY);
    
    const pageStr = `Page ${pageNum} of ${totalPages}`;
    const pageStrWidth = doc.getTextWidth(pageStr);
    doc.text(pageStr, margin + contentWidth - pageStrWidth, footerY);
  };

  // ==========================================
  // PAGE 1: HEADER & CORE PROFILE
  // ==========================================

  // Top Accent Band
  doc.setFillColor(15, 118, 110); // #0f766e
  doc.rect(margin, y, contentWidth, 3, 'F');
  y += 14;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('OPEYEMI OLAMIJU', margin, y);

  // Brand Sub-badge
  const nameWidth = doc.getTextWidth('OPEYEMI OLAMIJU');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
  doc.text('(BUILD WITH OPE)', margin + nameWidth + 8, y - 2);

  // Status Badge on Right
  doc.setFillColor(240, 253, 250); // teal-50
  doc.setDrawColor(153, 246, 228); // teal-200
  doc.roundedRect(margin + contentWidth - 148, y - 14, 148, 18, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
  doc.text('AVAILABLE FOR IMMEDIATE ROLES', margin + contentWidth - 143, y - 2.5);

  y += 15;

  // Professional Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
  doc.text('Data Scientist • Python & FastAPI Backend Developer • AI Video Creator', margin, y);

  y += 13;

  // Contact Row (No "Lagos, Nigeria" - clean & professional)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  
  const contacts = [
    'odunayoopamiju@gmail.com',
    'linkedin.com/in/opeyemiolamiju',
    'github.com/kikibillz',
    'Remote / Relocation Ready',
  ];
  doc.text(contacts.join('   •   '), margin, y);

  y += 10;
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(0.75);
  doc.line(margin, y, margin + contentWidth, y);
  y += 4;

  // 1. Professional Summary
  drawSectionHeading('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.4);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const summaryText =
    'Data Scientist, Python Backend Developer, and AI Integration Specialist with a solid Computer Science foundation (BSc from Olabisi Onabanjo University). Combines applied machine learning, production API engineering (FastAPI), and generative AI workflows to build scalable software solutions that deliver immediate business impact. Proven expertise in building sub-50ms ML inference pipelines, robust REST APIs with strict Pydantic v2 schemas, and directing high-conversion commercial generative media. Dedicated to accelerating technical velocity and engineering reliable digital products.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 10.5 + 4;

  // 2. Core Technical Proficiencies
  drawSectionHeading('Core Technical Proficiencies');
  const skillsCategories = [
    { label: 'Programming & Web', items: 'Python, TypeScript, JavaScript, SQL, HTML5, CSS3, REST APIs' },
    { label: 'Databases & Storage', items: 'SQL (PostgreSQL, MySQL, SQLite), NoSQL (MongoDB), Schema Design, Complex Joins, Window Functions, Indexing, Redis' },
    { label: 'Data Science & ML', items: 'Pandas, NumPy, Scikit-learn, XGBoost, Random Forest, SMOTE, Model Serialization (Joblib)' },
    { label: 'Backend & Architecture', items: 'FastAPI, Pydantic v2, Uvicorn ASGI, Docker, OpenAPI / Swagger, SQLAlchemy, Pytest (>90% cov)' },
    { label: 'Generative AI & Media', items: 'Google Veo 3, Runway Gen-3, Kling AI, Luma Dream Machine, Midjourney v6.1, ElevenLabs' },
    { label: 'Visualization & Interfaces', items: 'Streamlit, Matplotlib, Seaborn, Plotly Dashboards, React, Tailwind CSS' },
    { label: 'DevOps & Workflows', items: 'Git, GitHub, Docker, Postman, Linux CLI, Jupyter Lab, VS Code, CI/CD, Vercel' },
  ];

  doc.setFontSize(8);
  skillsCategories.forEach((cat) => {
    // Label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    const labelText = `${cat.label}: `;
    doc.text(labelText, margin, y);
    const labelWidth = doc.getTextWidth(labelText);

    // Items
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
    const valLines = doc.splitTextToSize(cat.items, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += valLines.length * 9.5 + 2;
  });

  y += 2;

  // 3. Professional Experience
  drawSectionHeading('Professional Experience');

  const experiences = [
    {
      role: 'Machine Learning Developer & Data Analyst',
      org: 'Independent & Applied Open-Source Deployments',
      location: 'Remote / Global',
      period: '2023 – Present',
      bullets: [
        'Architected, evaluated, and deployed machine learning systems and interactive applications using Python, Streamlit, and FastAPI.',
        'Serialized trained classification models (XGBoost, Random Forest) via Joblib, enabling sub-50ms real-time inference latency.',
        'Engineered domain-specific interaction variables, resolved high-cardinality categorical data, and countered severe class imbalance with SMOTE.',
        'Built asynchronous REST API endpoints with FastAPI and Pydantic v2 validation contracts, achieving >90% test coverage with Pytest.',
      ],
    },
    {
      role: 'People Leader (Promoted) & Agile People Operations Specialist',
      org: 'Culturelligence',
      location: 'Hybrid / Remote',
      period: 'Aug 2024 – Jul 2025',
      bullets: [
        'Managed workforce databases, monitored recruitment funnels, and optimized internal employee onboarding data operations.',
        'Prepared departmental headcount distributions, tenure analytics, and employee retention summaries for leadership review.',
        'Rapidly promoted to People Leader for workflow efficiency, cross-team accountability, and operational excellence.',
      ],
    },
    {
      role: 'Administrative Support & Virtual Assistant',
      org: 'Freelance & Private Clients',
      location: 'Remote',
      period: 'Dec 2024 – Present',
      bullets: [
        'Automated administrative workflows, maintaining structured tracking spreadsheets and executive databases with zero error rate.',
        'Standardized operational SOPs, cleaned multi-source business data, and authored weekly KPI progress briefs for stakeholders.',
      ],
    },
  ];

  experiences.forEach((exp) => {
    // Role Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(exp.role, margin, y);

    // Date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    const periodWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, margin + contentWidth - periodWidth, y);

    y += 10.5;

    // Org & Location
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
    doc.text(`${exp.org}  •  ${exp.location}`, margin, y);

    y += 9.5;

    // Bullets
    exp.bullets.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.9);
      doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);

      // Bullet dot
      doc.setFillColor(tealAccent[0], tealAccent[1], tealAccent[2]);
      doc.circle(margin + 4, y - 2.5, 1.2, 'F');

      const bulletLines = doc.splitTextToSize(bullet, contentWidth - 14);
      doc.text(bulletLines, margin + 12, y);
      y += bulletLines.length * 9.2 + 1.2;
    });

    y += 3.5;
  });

  // Footer for Page 1
  drawFooter(1, 2);

  // ==========================================
  // PAGE 2: PROJECTS, EDUCATION & CREDENTIALS
  // ==========================================
  doc.addPage();
  y = margin;

  // Mini Header on Page 2
  doc.setFillColor(15, 118, 110);
  doc.rect(margin, y, contentWidth, 2, 'F');
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('OPEYEMI OLAMIJU', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
  doc.text('Curriculum Vitae  •  odunayoopamiju@gmail.com  •  github.com/kikibillz', margin + 115, y);

  y += 6;
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentWidth, y);
  y += 4;

  // 4. Key Applied Projects
  drawSectionHeading('Key Applied Projects');

  const projects = [
    {
      name: 'Enterprise Hybrid Data Platform (PostgreSQL & MongoDB)',
      stack: 'SQL • PostgreSQL • NoSQL • MongoDB • PyMongo • SQLAlchemy • Docker',
      desc: 'Dual-engine data platform integrating ACID relational PostgreSQL schemas with MongoDB document collections for real-time telemetry, 4.5x indexing speedup, and sub-25ms analytical queries across 1.2M+ records.',
    },
    {
      name: 'FastAPI Production ML Inference & Validation Service',
      stack: 'FastAPI • Pydantic v2 • Uvicorn • Docker • Scikit-learn',
      desc: 'High-throughput asynchronous REST API serving ML models with strict request validation, automated interactive Swagger UI docs, and sub-15ms response latency.',
    },
    {
      name: 'Bank Customer Churn Predictor & Retention Engine',
      stack: 'Python • Scikit-learn • XGBoost • Streamlit • Pandas',
      desc: 'Supervised classification platform predicting customer churn with 86% ROC-AUC, interactive risk probability gauges, and dynamic retention recommendations.',
    },
    {
      name: 'HR Analytics & Employee Attrition Intelligence',
      stack: 'Python • Streamlit • Seaborn • Random Forest',
      desc: 'Workforce analytics platform diagnosing turnover drivers across tenure, salary, and satisfaction metrics to forecast retention risks with real-time scoring.',
    },
    {
      name: 'Commercial Generative AI Video Productions',
      stack: 'Google Veo 3 • Runway Gen-3 • Kling AI • ElevenLabs',
      desc: 'Directed commercial video campaigns (Indomie Noodles, Luxury Real Estate, AI Tech Promos) engineering cinematic prompts, motion brush cameras, and audio design.',
    },
  ];

  projects.forEach((p) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(p.name, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    const stackWidth = doc.getTextWidth(p.stack);
    doc.text(p.stack, margin + contentWidth - stackWidth, y);

    y += 9.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.9);
    doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
    const descLines = doc.splitTextToSize(p.desc, contentWidth - 6);
    doc.text(descLines, margin + 6, y);
    y += descLines.length * 9.2 + 3.5;
  });

  y += 2;

  // 5. Education
  drawSectionHeading('Education & Academic Background');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Bachelor of Science (BSc) in Computer Science', margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
  const dateStr = '2019 – 2023';
  doc.text(dateStr, margin + contentWidth - doc.getTextWidth(dateStr), y);

  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.4);
  doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
  doc.text('Olabisi Onabanjo University (OOU)', margin, y);

  y += 9.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const eduDetails =
    'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (Python/Java), Database Management Systems (SQL), Software Engineering, Probability & Statistics, Discrete Mathematics, Computer Architecture.';
  const eduLines = doc.splitTextToSize(eduDetails, contentWidth);
  doc.text(eduLines, margin, y);
  y += eduLines.length * 9 + 4;

  // 6. Verified Certifications & Licenses
  drawSectionHeading('Verified Certifications & Licenses (13 Total)');

  const certsCol1 = [
    { title: 'Certified Data Scientist', issuer: 'New Horizons', date: 'Aug 2026' },
    { title: 'Certified Product Manager (CPM)', issuer: 'BeTechified', date: 'Feb 2025' },
    { title: 'Agile People Operation Specialist', issuer: 'Culturelligence', date: 'Jul 2025' },
    { title: 'UI/UX Design', issuer: 'Dev and Design', date: 'May 2025' },
    { title: 'Product Management', issuer: 'Prodefied', date: 'Oct 2025' },
    { title: 'AI Career Essentials', issuer: 'alx_africa (Generative AI)', date: 'Certified' },
    { title: 'Hotjar Behavioral Analytics', issuer: 'Contentsquare (ID: x3ftgg2pwb2f)', date: '2024–2030' },
  ];

  const certsCol2 = [
    { title: 'Tech Recruiter', issuer: 'hirist (ID: cert_bfxyxv9d)', date: 'Certified' },
    { title: 'Remote Work Certification', issuer: 'FOGDEV (Distributed Ops)', date: 'Jun 2024' },
    { title: 'Data Visualization Intern', issuer: 'Excelerate (Dashboards)', date: 'Sep 2024' },
    { title: 'Digital Teacher', issuer: 'UNESCO IOC (E-Learning)', date: '2023–2030' },
    { title: 'Virtual Assistant', issuer: 'alx_africa (Executive Support)', date: 'Certified' },
    { title: 'Jobberman Soft Skills Training', issuer: 'Jobberman (Emotional Intel)', date: 'Oct 2020' },
  ];

  const colWidth = (contentWidth - 16) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 16;
  const certStartY = y;

  let y1 = certStartY;
  certsCol1.forEach((c) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(c.title, col1X, y1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    const dWidth = doc.getTextWidth(c.date);
    doc.text(c.date, col1X + colWidth - dWidth, y1);

    y1 += 8.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
    doc.text(c.issuer, col1X, y1);

    y1 += 9.5;
  });

  let y2 = certStartY;
  certsCol2.forEach((c) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(c.title, col2X, y2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(tealDark[0], tealDark[1], tealDark[2]);
    const dWidth = doc.getTextWidth(c.date);
    doc.text(c.date, col2X + colWidth - dWidth, y2);

    y2 += 8.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
    doc.text(c.issuer, col2X, y2);

    y2 += 9.5;
  });

  y = Math.max(y1, y2) + 2;

  // LinkedIn Verification Callout Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(lightMuted[0], lightMuted[1], lightMuted[2]);
  doc.text(
    '✓ All 13 credentials, licenses, and verified skill badges are publicly authenticated on LinkedIn: linkedin.com/in/opeyemiolamiju/details/certifications/',
    margin + 8,
    y + 11.5
  );

  // Footer for Page 2
  drawFooter(2, 2);

  // Output
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  const outputPath = path.join(process.cwd(), 'public', 'Opeyemi_Olamiju_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBuffer);

  const resumeCopy = path.join(process.cwd(), 'public', 'resume.pdf');
  fs.writeFileSync(resumeCopy, pdfBuffer);

  console.log(`Successfully generated premium resume PDF at ${outputPath} (${pdfBuffer.length} bytes)`);
}

generateResumePdf();
