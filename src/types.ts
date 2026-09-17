export interface ProjectCaseStudy {
  problem: string;
  dataset: string;
  process: {
    collection: string;
    cleaning: string;
    exploration: string;
    featureEngineering: string;
    modeling: string;
    evaluation: string;
  };
  results: string;
  lessons: string[];
  tools: string[];
  links: {
    github: string;
    demo: string;
  };
}

export interface ProjectDemoScreenshot {
  title: string;
  caption: string;
  url?: string;
  type?: 'streamlit' | 'analytics' | 'pipeline' | 'classification';
  accentColor?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  problemSummary: string;
  approachSummary: string;
  tools: string[];
  resultsSummary: string;
  links: {
    github: string;
    demo: string;
  };
  badge?: string;
  streamlitDeployment?: string;
  streamlitUrl?: string;
  screenshot?: ProjectDemoScreenshot;
  screenshots?: ProjectDemoScreenshot[];
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  category: 'Education' | 'Experience' | 'Certification';
  title: string;
  roleOrDegree: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  expiresDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  description?: string;
  category?: 'Data & AI' | 'Product & Design' | 'Management & Agile' | 'Professional & Soft Skills' | 'Cloud & Backend';
}

export interface GitHubRepo {
  name: string;
  displayName: string;
  description: string;
  language: string | null;
  html_url: string;
  homepage: string | null;
  category: 'Machine Learning' | 'Data Analysis' | 'Automation & Python' | 'Web & Tools';
  tags: string[];
  isFeatured?: boolean;
}

export interface AIVideoProject {
  id: string;
  title: string;
  category:
    | 'Commercial & Ads'
    | 'Product Showcase'
    | 'Cinematic & Narrative'
    | 'Tech & Personal Brand'
    | 'Culinary & ASMR';
  aspectRatio: '9:16' | '16:9';
  duration: string;
  tagline: string;
  description: string;
  tools: string[];
  generationWorkflow: {
    pipeline: 'Text-to-Video' | 'Image-to-Video' | 'Multi-Shot Continuity' | 'Video-to-Video';
    promptEngineering: string;
    motionDynamics: string;
    audioVoiceover?: string;
  };
  posterUrl: string;
  videoUrl?: string;
  keyVisualHighlights: string[];
}

export interface PortfolioConfig {
  name: string;
  title: string;
  subTitle: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  certificationsUrl?: string;
  avatarUrl?: string;
}
