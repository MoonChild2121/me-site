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

export type ExperienceGroupId = 'current' | 'previous' | 'early';

export type Experience = {
  group: ExperienceGroupId;
  title: string;
  company: string;
  dateRange: string;
  location?: string;
  summary: string;
  tags: string[];
  expanded: {
    overview: string[];
    focusAreas: Array<{
      label: string;
      lines: string[];
    }>;
    howIWork: string[];
    impact: string[];
  };
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
    group: 'current',
    title: 'Associate Software Engineer',
    company: 'Carbonteq',
    dateRange: 'May 2025 — Present',
    location: 'Pakistan',
    summary: 'Building and scaling frontend systems for production applications using Next.js.',
    tags: ['Next.js Systems', 'Performance', 'Design Systems', 'APIs'],
    expanded: {
      overview: [
        'Working on production-grade frontend systems where scalability, performance, and maintainability are baseline constraints.',
        'Contributing across product delivery and internal design-system work in a Next.js environment.',
      ],
      focusAreas: [
        {
          label: 'Frontend Systems',
          lines: [
            'Build and maintain scalable Next.js applications with reusable components and clear separation of concerns.',
            'Design patterns that remain legible as the surface area grows.',
          ],
        },
        {
          label: 'Performance & Accessibility',
          lines: [
            'Improve performance using code-splitting, lazy loading, and efficient rendering strategies.',
            'Raise Lighthouse scores across performance and accessibility and keep interfaces consistently usable.',
          ],
        },
        {
          label: 'Design Systems',
          lines: [
            'Extend and integrate design systems across products, with consistency, accessibility, and reuse built-in.',
          ],
        },
      ],
      howIWork: [
        'Treat frontend as a system: define constraints, create primitives, and scale through composition.',
        'Optimize with intent—improvements should be measurable and the code should stay understandable.',
        'Work closely with design and backend to keep UI + API boundaries cohesive.',
      ],
      impact: [
        'Improved performance and usability across applications.',
        'Strengthened UI consistency through reusable components and system patterns.',
        'Contributed to stable, production-ready delivery across multiple surfaces.',
      ],
    },
  },
  {
    group: 'previous',
    title: 'AI Project Lead',
    company: 'NiftyBooks',
    dateRange: 'July 2024 — May 2025',
    location: 'Remote',
    summary: 'Led development of AI-powered illustration tools across a distributed team.',
    tags: ['AI Systems', 'Leadership', 'LoRA', 'Product Thinking', 'Jira', 'ComfyUI', 'RunPod'],
    expanded: {
      overview: [
        'Led AI-powered illustration tooling in a distributed team, owning both technical direction and execution.',
        'Operated at the intersection of research iteration and product constraints, keeping systems shippable and usable.',
      ],
      focusAreas: [
        {
          label: 'AI Systems',
          lines: [
            'Directed development of SDXL and FLUX LoRAs and iterated using evaluation loops aligned with production use.',
            'Built pipelines for stylized image generation with clear quality and reliability criteria.',
          ],
        },
        {
          label: 'Execution & Ownership',
          lines: ['Owned end-to-end delivery: sprint planning, prioritization, timelines, and cross-functional coordination.'],
        },
        {
          label: 'Product Thinking',
          lines: ['Translated business needs into scalable AI capabilities and made trade-offs explicit for stakeholders.'],
        },
      ],
      howIWork: [
        'Turn experiments into pipelines: tighten evaluation, document constraints, and make deployment predictable.',
        'Communicate in a way that keeps distributed teams aligned—decisions, risks, and next steps stay visible.',
        'Balance iteration speed with reliability so the product remains usable while improving.',
      ],
      impact: [
        'Delivered production-ready AI features for illustration workflows.',
        'Improved alignment between technical direction and product goals.',
        'Built systems that balanced research novelty with usability constraints.',
      ],
    },
  },
  {
    group: 'early',
    title: 'Machine Learning Intern',
    company: 'Innonexus Tech',
    dateRange: 'May 2023 — August 2023',
    location: 'Remote',
    summary: 'Built an NLP-driven legal advisory system with full-stack integration.',
    tags: ['NLP', 'RAG', 'LangChain', 'Full-stack'],
    expanded: {
      overview: [
        'Worked on NLP systems for legal retrieval and conversational interfaces, focusing on end-to-end system flow.',
        'Bridged ML pipelines with a usable product surface via frontend + API integration.',
      ],
      focusAreas: [
        {
          label: 'NLP Systems',
          lines: ['Built a legal advisory chatbot using LangChain and NLP pipelines with contextual response quality in mind.'],
        },
        {
          label: 'RAG Systems',
          lines: [
            'Implemented retrieval-augmented generation (RAG) to ground responses in relevant context and improve reliability.',
          ],
        },
        {
          label: 'Optimization',
          lines: ['Reduced processing time by ~35% and improved entity recognition accuracy through pipeline tuning.'],
        },
      ],
      howIWork: [
        'Think in pipelines and system flow, not isolated models—retrieval, generation, latency, and UX are coupled.',
        'Optimize for accuracy and efficiency together so the interface stays responsive.',
        'Design toward reliability: constrain outputs, validate assumptions, and measure behavior.',
      ],
      impact: [
        'Delivered an end-to-end AI-powered legal advisory system.',
        'Improved efficiency and accuracy of NLP pipelines.',
      ],
    },
  },
  {
    group: 'early',
    title: 'MERN Stack Intern',
    company: 'WALEE',
    dateRange: 'May 2023 — September 2023',
    location: 'NUST, Islamabad',
    summary: 'Developed full-stack web applications using MERN with focus on performance and scalability.',
    tags: ['MERN', 'APIs', 'Performance', 'UI'],
    expanded: {
      overview: [
        'Developed MERN applications with an emphasis on performance, scalability, and clean data flow.',
        'Worked across UI, APIs, and database behavior to keep the system coherent end-to-end.',
      ],
      focusAreas: [
        {
          label: 'Frontend Systems',
          lines: ['Built responsive React interfaces and managed state for consistent user experiences.'],
        },
        {
          label: 'Backend & Data',
          lines: ['Integrated MongoDB and optimized queries (~30% improvement) while designing REST APIs for scalable flow.'],
        },
        {
          label: 'Engineering Practice',
          lines: ['Participated in code reviews and improved code quality through consistency and iteration.'],
        },
      ],
      howIWork: [
        'Build complete systems, not isolated features—start from the data flow and work outward.',
        'Prioritize performance and clean contracts so scaling doesn’t create fragility.',
        'Keep quality stable through reviews and repeatable patterns.',
      ],
      impact: [
        'Improved application performance and responsiveness.',
        'Contributed to scalable full-stack systems and cleaner APIs.',
      ],
    },
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
