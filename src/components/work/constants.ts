export type SectionId =
  | 'overview'
  | 'experience'
  | 'projects'
  | 'publications'
  | 'skills'
  | 'education'
  | 'additional';

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'additional', label: 'Additional' },
];

export const SECTION_INDEX = Object.fromEntries(
  SECTIONS.map(({ id }, idx) => [id, idx])
) as Record<SectionId, number>;

export type Experience = {
  role: string;
  company: string;
  dateRange: string;
  highlights: string[];
};

export type Project = {
  name: string;
  summary: string;
  featured?: boolean;
  highlights?: string[];
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  summary?: string;
  highlights?: string[];
};

export type EducationItem = {
  title: string;
  meta: string;
  summary: string;
};

export type AdditionalItem = {
  title: string;
  meta: string;
  summary: string;
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'Frontend Engineer — Carbonteq',
    company: 'Carbonteq',
    dateRange: 'May 2025 — Present',
    highlights: [
      'Built and maintained scalable frontend systems using Next.js',
      'Improved performance and accessibility through optimization techniques',
      'Contributed to design systems and reusable component architecture',
      'Collaborated across teams to deliver production features',
    ],
  },
  {
    role: 'AI Project Lead — NiftyBooks',
    company: 'NiftyBooks',
    dateRange: 'Jul 2024 — May 2025',
    highlights: [
      'Led development of AI-powered illustration tools',
      'Managed sprint planning and cross-team collaboration',
      'Built and evaluated LoRA-based models for production use',
    ],
  },
  {
    role: 'Machine Learning Intern — Innonexus Tech',
    company: 'Innonexus Tech',
    dateRange: 'May 2023 — Aug 2023',
    highlights: [
      'Developed NLP-based legal chatbot',
      'Improved processing time by 35%',
      'Implemented retrieval-augmented generation',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Custom POS System',
    featured: true,
    summary:
      'A full-featured point-of-sale system designed for real-time retail workflows.',
    highlights: [
      'Built scalable frontend architecture using Next.js',
      'Designed UI and reusable design system',
      'Implemented complex pricing logic',
      'Integrated APIs for seamless checkout',
    ],
  },
  {
    name: 'Style Change Detection System',
    summary: 'ML model for detecting stylistic shifts in text',
  },
  {
    name: 'Music Generation System',
    summary: 'Prompt-based music generation using emotion classification',
  },
  {
    name: 'Car Speed Detection',
    summary: 'Real-time tracking system using YOLOv8',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Multi-Modular Diagnosis and Stage Classification of Alzheimer's Disease",
    venue: 'IEEE Access',
    year: '2025',
    summary:
      'A multi-modal deep learning framework combining MRI and clinical data.',
    highlights: [
      'Focused on improving early-stage detection',
      'Designed model combining multiple data sources',
    ],
  },
];

export const SKILL_GROUPS: Array<{ label: string; skills: string[] }> = [
  { label: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS'] },
  { label: 'UI Systems', skills: ['Design tokens', 'Component composition', 'Accessibility'] },
  { label: 'Tooling', skills: ['Git', 'ESLint', 'Prettier'] },
  { label: 'Collaboration', skills: ['Product collaboration', 'Code reviews', 'Documentation'] },
];

export const EDUCATION: EducationItem[] = [
  {
    title: 'BS Computer Science',
    meta: 'National University of Sciences and Technology',
    summary: '2021 — 2025',
  },
];

export const ADDITIONAL: AdditionalItem[] = [
  {
    title: 'Machine Learning Specialization — DeepLearning.AI',
    meta: 'Advanced ML concepts and model building',
    summary: '',
  },
  {
    title: 'Web Development — Meta',
    meta: 'React, JavaScript, version control',
    summary: '',
  },
  {
    title: 'Computer Networking — Cisco',
    meta: 'Networking fundamentals',
    summary: '',
  },
];
