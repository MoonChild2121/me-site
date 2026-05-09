export type SectionId =
  | 'overview'
  | 'experience'
  | 'projects'
  | 'publications'
  | 'skills'
  | 'education';

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
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

export type FeaturedProject = {
  title: string;
  meta: string;
  overview: string;
  whatIBuilt: string[];
  systemThinking: string[];
  highlights: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type ExplorationProject = {
  title: string;
  meta: string;
  description: string;
  keyPoints: string[];
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  summary?: string;
  highlights?: string[];
  url?: string;
};

export type EducationItem = {
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

export const FEATURED_PROJECT: FeaturedProject = {
  title: 'Custom Point of Sale (POS) System',
  meta: 'Next.js • Square POS • System Design • APIs',
  overview:
    'A full-featured point-of-sale system designed for real-world retail workflows, handling transactions, pricing logic, and system integration end-to-end.',
  whatIBuilt: [
    'Real-time POS system with Square integration',
    'OAuth-based merchant authentication',
    'Dynamic pricing engine (taxes, discounts, edge cases)',
    'Modular Next.js frontend + reusable UI system',
    'API-driven order and payment workflows',
    'Used React Scan to identify and minimize unnecessary re-renders across critical UI flows',
    'Optimized for an excellent Lighthouse score across performance, accessibility, and best practices',
  ],
  systemThinking: [
    'Built as a scalable system, not isolated features',
    'Clear data flow + modular architecture',
    'Logic-heavy areas (pricing, checkout) treated as core systems',
    'UI and architecture developed together',
    'Designed for real-world reliability',
  ],
  highlights: [
    'Accurate and resilient transaction handling',
    'Clean, extensible architecture',
    'End-to-end ownership across UI, logic, and integration',
  ],
};

export const EXPLORATIONS: ExplorationProject[] = [
  {
    title: 'Style Change Detection',
    meta: 'PyTorch • LoRA • Mistral-7B',
    description: 'Detects stylistic shifts in text for authorship analysis and content integrity.',
    keyPoints: [
      'Fine-tuned Mistral-7B using LoRA for efficient training',
      'Built preprocessing and evaluation pipeline (F1 score, confusion matrix)',
      'Explored trade-offs between efficiency and model performance',
    ],
  },
  {
    title: 'Music Generation from Prompt',
    meta: 'TensorFlow • Transformers • LSTM',
    description: 'Generates music based on user mood and emotional context.',
    keyPoints: [
      'Combined emotion classification with sequence generation',
      'Achieved ~80% mood prediction accuracy',
      'Explored interaction between input intent and generated output',
    ],
  },
  {
    title: 'Car Speed Detection',
    meta: 'YOLOv8 • DeepSORT',
    description: 'Real-time system for vehicle tracking and speed estimation.',
    keyPoints: [
      'Used object detection and tracking for motion analysis',
      'Combined tracking with speed estimation logic',
      'Achieved ~95% accuracy in controlled scenarios',
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Multi-Modular Diagnosis and Stage Classification of Alzheimer's Disease",
    venue: 'IEEE Access',
    year: '2025',
    summary:
      'I trained an ensemble over several data types: cognitive scores, genetic risk (APOE ε4), and demographics, with neuroimaging preprocessing done in SPM12. In our study, that stack reached 0.897 accuracy and 0.948 specificity, outperforming conventional models on the same feature set.',
    highlights: [
      'Trained an ensemble (temporal, similarity, and structured branches) instead of a single classifier, so complementary signals from different modalities could reinforce each other.',
      'Combined multiple data types (cognitive assessments, genetic risk, and age/demographics) rather than relying on one input family alone.',
      'Used SPM12 for neuroimaging preprocessing as part of the workflow that feeds the broader multimodal diagnostic design.',
      'Achieved the strongest results among the baselines we compared using the same feature set.',
    ],
    url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=11359688',
  },
];

export type SkillGroup = {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend Systems',
    subtitle: 'Building structured, scalable frontend applications',
    tags: ['Next.js', 'React', 'TypeScript'],
    description:
      'Designing and maintaining production-grade frontend systems with a focus on architecture, reusability, and long-term maintainability. Comfortable handling complex state, modular codebases, and evolving product requirements.',
  },
  {
    title: 'UI Engineering',
    subtitle: 'Design systems, accessibility, and interface consistency',
    tags: ['Component systems', 'Design tokens', 'Accessibility'],
    description:
      'Building consistent and reusable UI systems with strong emphasis on accessibility and composability. Focused on creating interfaces that are not only visually consistent, but resilient and scalable.',
  },
  {
    title: 'System Integration',
    subtitle: 'Connecting frontend systems with backend services',
    tags: ['REST APIs', 'Node.js', 'Data flow'],
    description:
      'Experience integrating APIs into structured frontend workflows. Comfortable working across the boundary of frontend and backend to ensure smooth data flow and reliable system behavior.',
  },
  {
    title: 'Performance & Quality',
    subtitle: 'Optimizing systems for speed, clarity, and reliability',
    tags: ['Code-splitting', 'Lazy loading', 'Lighthouse', 'Debugging'],
    description:
      'Improving application performance through structured optimization techniques. Focused on building fast, responsive interfaces while maintaining clean and maintainable code.',
  },
  {
    title: 'Machine Learning & Research',
    subtitle: 'Bridging ML systems with real-world applications',
    tags: ['PyTorch', 'TensorFlow', 'NLP', 'RAG'],
    description:
      'Background in building and evaluating machine learning systems, with experience integrating ML pipelines into applications. Strong understanding of experimental design, evaluation, and practical deployment constraints.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    title: 'BS Computer Science',
    meta: 'National University of Sciences and Technology',
    summary: '2021 — 2025',
  },
];

export type Course = {
  name: string;
  provider: string;
  focus?: string;
};

export const COURSES: Course[] = [
  {
    name: 'ML & DL Specialization',
    provider: 'DeepLearning.AI (Coursera)',
    focus: 'Core ML & DL concepts and practical model building.',
  },
  {
    name: 'Web Development',
    provider: 'Meta (Coursera)',
    focus: 'Frontend foundations and modern web tooling.',
  },
  {
    name: 'Computer Networking',
    provider: 'Cisco Networking Academy',
    focus: 'Networking fundamentals and system-level basics.',
  },
  {
    name: 'Project Management Certification',
    provider: 'Coursera',
    focus: 'Planning, execution, and stakeholder alignment basics.',
  },
];
