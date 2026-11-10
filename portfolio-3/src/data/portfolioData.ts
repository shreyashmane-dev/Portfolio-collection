import type { ProjectItem, SkillItem, JourneyMilestone, ResearchNode } from '../types';

export const PERSONAL_INFO = {
  name: 'Shreyash Mane',
  handle: 'shreyashmane-dev',
  kanjiName: 'シュレヤシュ・マネ',
  title: 'SHREYASH — BEYOND THE CODE.',
  tagline: 'Building intelligent experiences. Exploring beyond imagination.',
  subTagline: 'An explorer of technology, an architect of ideas, and a builder of intelligent experiences.',
  role: 'Computer Science & Engineering Student / Creative Developer',
  email: 'shreyashmane649@gmail.com',
  github: 'https://github.com/shreyashmane-dev',
  linkedin: 'https://www.linkedin.com/in/shreyash-mane-7675a4385/',
  location: 'India [LAT 19.0760 / LON 72.8777]',
  systemStatus: 'ALL SYSTEMS OPERATIONAL',
  clearanceLevel: 'LEVEL 05 // ARCHITECT'
};

export const PROJECTS_DATA: ProjectItem[] = [
  // 01. OM Search
  {
    id: 'omsearch',
    rank: 1,
    number: '01',
    title: 'OM Search',
    codeName: 'OM-SEARCH // SEMANTIC RESEARCH & COGNITIVE QUERY ENGINE',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Semantic AI web search, research indexing, and scientific paper extraction engine.',
    description: 'An AI-driven research search engine built with Python and vector embeddings that analyzes technical literature and papers by semantic meaning rather than basic keyword matching.',
    problemStatement: 'Keyword-based web searches return noisy commercial results and fail to grasp deep conceptual connections across scientific publications.',
    solution: 'Engineered an asynchronous web scraper and high-dimensional vector search pipeline that indexes technical preprints and synthesizes key takeaways using local LLM reasoning.',
    architectureDetails: [
      'Asynchronous content fetching and PDF abstract parser pipeline',
      'High-dimensional dense vector embeddings with cosine similarity reranking',
      'Context-aware LLM query summarization producing structured research briefs',
      'Clean terminal CLI and responsive web dashboard interfaces'
    ],
    features: [
      'Semantic document ranking',
      'Automated key takeaway extraction',
      'Preprint & documentation search',
      'Fast citation generator'
    ],
    techStack: ['Python', 'FastAPI', 'BeautifulSoup', 'Vector DB', 'Sentence Transformers', 'LLM APIs'],
    githubUrl: 'https://github.com/shreyashmane-dev/OmSearch',
    missionNumber: 'MSN-001',
    kanjiTitle: '学術探査 (OM-SEARCH)',
    accentColor: '#FF304F',
    visualStyle: 'cinematic',
    featured: true
  },

  // 02. Nexyris Local
  {
    id: 'nexyris-local',
    rank: 2,
    number: '02',
    title: 'Nexyris Local',
    codeName: 'NEXYRIS // NEXT-GENERATION DEVELOPER INTERFACE FRAMEWORK',
    category: 'Developer Tools',
    status: 'COMPLETED',
    tagline: 'Futuristic developer interface framework and cybernetic UI library.',
    description: 'A modular, high-performance UI framework and component library designed specifically for cybernetic dashboards, developer tooling, and telemetry displays.',
    problemStatement: 'Modern developer tool interfaces are either overly utilitarian and bland or bloated with heavyweight visual themes that slow rendering.',
    solution: 'Architected a zero-runtime CSS bloat component suite featuring cyberpunk HUD frames, holographic corner accents, and strict TypeScript contracts with full theme sync.',
    architectureDetails: [
      'Strictly typed React component system with zero runtime CSS overhead',
      'Cybernetic HUD framing math, SVG corner notch generators, and scanlines',
      'Seamless VOID and PAPER dual-theme token synchronization',
      'Accessible keyboard landmarks and ARIA focus rings'
    ],
    features: [
      'Sci-fi HUD panels and borders',
      'Dynamic telemetry cards',
      'Zero-dependency CSS custom properties',
      'Full TypeScript contracts'
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    githubUrl: 'https://github.com/shreyashmane-dev/Nexyris',
    missionNumber: 'MSN-002',
    kanjiTitle: '次世代枠組 (NEXYRIS)',
    accentColor: '#397BFF',
    visualStyle: 'cyber',
    featured: true
  },

  // 03. SecureCode AI
  {
    id: 'secure-codeb-ai',
    rank: 3,
    number: '03',
    title: 'SecureCode AI',
    codeName: 'SECURE-CODE // ENTERPRISE STATIC VULNERABILITY RADAR',
    category: 'Cybersecurity',
    status: 'COMPLETED',
    tagline: 'Enterprise static code analysis platform with automated vulnerability scanning and AI remediation.',
    description: 'A full-stack code security analyzer that scans repositories for OWASP Top 10 vulnerabilities, memory leaks, injection vectors, and hardcoded secrets with AI-generated pull-request patches.',
    problemStatement: 'Manual code reviews miss subtle security holes, while traditional static analysis tools output high false-positive rates without remediation guidance.',
    solution: 'Combined AST parsing with targeted LLM reasoning to grade vulnerabilities on the CVSS scale and formulate direct git patch fixes.',
    architectureDetails: [
      'Abstract Syntax Tree (AST) parser integrated with semantic LLM security rules',
      'CVSS v3.1 severity scoring matrix with threat classification',
      'Automated git diff remediation engine generating ready-to-merge patches',
      'CI/CD webhook receiver for continuous repository monitoring'
    ],
    features: [
      'OWASP Top 10 vulnerability scanner',
      'Automated code fix generation',
      'Hardcoded secrets interceptor',
      'Enterprise security report export'
    ],
    techStack: ['Python', 'FastAPI', 'AST Parsers', 'LLM APIs', 'TypeScript', 'Docker'],
    githubUrl: 'https://github.com/shreyashmane-dev/Secure-codeb-AI',
    missionNumber: 'MSN-003',
    kanjiTitle: '安全解析 (SECURE-CODE)',
    accentColor: '#FF304F',
    visualStyle: 'terminal',
    featured: true
  },

  // 04. Drishti AI
  {
    id: 'drishti-ai',
    rank: 4,
    number: '04',
    title: 'Drishti AI',
    codeName: 'DRISHTI // CLINICAL RETINAL VISION & BIOMARKER STUDIO',
    category: 'Machine Learning',
    status: 'COMPLETED',
    tagline: 'Autonomous diabetic retinopathy diagnostic studio with Grad-CAM visual attention explainability.',
    description: 'A clinical diagnostic system that analyzes high-resolution fundus retinal imaging to detect diabetic retinopathy stages. Integrates Grad-CAM heatmaps to visually isolate microaneurysms for medical practitioners.',
    problemStatement: 'Early diabetic retinopathy causes preventable blindness but requires specialized ophthalmologists who are scarce in rural healthcare clinics.',
    solution: 'Trained a deep convolutional model on multi-class fundus datasets with Grad-CAM explainability, allowing local clinicians to instantly verify highlighted lesion regions.',
    architectureDetails: [
      'Deep convolutional neural network trained on multi-class fundus datasets',
      'Grad-CAM gradient visualizer generating visual lesion verification maps',
      'Interactive clinical web report generator with severity staging indices',
      'Fast inference pipeline optimized for edge healthcare clinics'
    ],
    features: [
      'Multi-stage retinopathy classification',
      'Grad-CAM lesion heatmaps',
      'Clinical diagnostic report generator',
      'High-resolution image zoom & inspect'
    ],
    techStack: ['Python', 'PyTorch', 'Computer Vision', 'Grad-CAM', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/shreyashmane-dev/Drishti-AI',
    missionNumber: 'MSN-004',
    kanjiTitle: '視覚診断 (DRISHTI)',
    accentColor: '#00E5FF',
    visualStyle: 'cinematic',
    featured: true
  },

  // 05. KisanDirect (krushi-direct)
  {
    id: 'krushi-direct',
    rank: 5,
    number: '05',
    title: 'KisanDirect',
    codeName: 'KISAN-DIRECT // AI-POWERED AGRICULTURAL MARKETPLACE',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'AI-powered farmer-to-buyer agricultural marketplace built for Smart India Hackathon (SIH).',
    description: 'An agritech marketplace designed to eliminate predatory middlemen by connecting agrarian producers directly with wholesale buyers. Features fair pricing algorithms and localized vernacular support.',
    problemStatement: 'Smallholder farmers lose up to 40% of crop value to intermediary commissions and lack transparent real-time market rate data.',
    solution: 'Built a direct auction and commerce platform with APMC mandi price feeds, vernacular voice assistance, and milestone escrow security.',
    architectureDetails: [
      'Direct order matching engine with localized price discovery based on APMC data',
      'Voice-assisted multilingual query system for rural farmers',
      'Secure escrow and milestone payment tracking integration',
      'Mobile-optimized progressive web app architecture'
    ],
    features: [
      'Direct farmer-to-buyer bargaining',
      'Real-time APMC mandi price discovery',
      'Multilingual voice search',
      'Escrow payment security'
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL / Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/krushi-direct',
    missionNumber: 'MSN-005',
    kanjiTitle: '農業市場 (KISAN)',
    accentColor: '#397BFF',
    visualStyle: 'cinematic',
    featured: true
  },

  // 06. Zynth Browser
  {
    id: 'zynth-browser',
    rank: 6,
    number: '06',
    title: 'Zynth Browser',
    codeName: 'ZYNTH // PERFORMANCE-FOCUSED ANDROID BROWSER',
    category: 'Mobile Applications',
    status: 'COMPLETED',
    tagline: 'Performance-focused, dark-first Android web browser built with Flutter and Dart.',
    description: 'An independent mobile web browser engineered for Android with built-in ad blocking, low-latency tab switching, dark-mode web overrides, and minimal battery consumption.',
    problemStatement: 'Mainstream mobile browsers are loaded with invasive trackers, telemetry overhead, and energy-draining background sync.',
    solution: 'Engineered an ultra-lean browser shell using Flutter and native Android WebView APIs, enforcing local privacy and one-handed navigation ergonomics.',
    architectureDetails: [
      'Custom WebView rendering pipeline with client-side tracker blocking',
      'Hardware-accelerated dark theme injection for unstyled websites',
      'Lightweight memory footprint optimized for budget Android devices',
      'Ergonomic one-handed navigation bar placed at bottom of screen'
    ],
    features: [
      'Native tracker and ad-blocker',
      'OLED dark mode override engine',
      'Bottom thumb-reach navigation',
      'Zero analytics telemetry'
    ],
    techStack: ['Dart', 'Flutter', 'Android SDK', 'WebView Native APIs'],
    githubUrl: 'https://github.com/shreyashmane-dev/zynth-browser',
    missionNumber: 'MSN-006',
    kanjiTitle: '移動検索 (ZYNTH)',
    accentColor: '#00E5FF',
    visualStyle: 'minimal',
    featured: true
  },

  // 07. DEV Tools Suite — AnoS
  {
    id: 'dev-tools-suite',
    rank: 7,
    number: '07',
    title: 'DEV Tools Suite — AnoS',
    codeName: 'AnOS // WINDOWS DEVELOPER COMMAND COCKPIT',
    category: 'Developer Tools',
    status: 'IN DEVELOPMENT',
    tagline: 'A Windows developer toolkit for project creation, system diagnostics, and GitHub workflows.',
    description: 'A comprehensive command cockpit for Windows developers. Automates project bootstrapping, system diagnostics, Git branch synchronization, and software package installations in one clean interface.',
    problemStatement: 'Setting up new repositories, cleaning development caches, and checking hardware health on Windows requires navigating fragmented GUI menus and disparate CLI tools.',
    solution: 'Built a unified ASCII-styled command cockpit that bundles dev environment setup, branch automation, and system diagnostics into rapid single-stroke commands.',
    architectureDetails: [
      'Modular command launcher with terminal ASCII branding and telemetry feeds',
      'Automated Git pull-request helper and branch cleanup utilities',
      'Windows hardware diagnostics, memory monitors, and developer cache flushers',
      'Extensible script architecture for rapid workflow customizations'
    ],
    features: [
      'One-stroke project scaffolding',
      'Windows memory & cache cleaning',
      'Automated Git branch workflows',
      'Cyberpunk terminal HUD'
    ],
    techStack: ['Batchfile', 'Python', 'PowerShell', 'Git CLI', 'Windows APIs'],
    githubUrl: 'https://github.com/shreyashmane-dev/dev-tools-suite',
    missionNumber: 'MSN-007',
    kanjiTitle: '開発端末 (AnOS)',
    accentColor: '#FF304F',
    visualStyle: 'terminal',
    featured: true
  },

  // 08. Smart Classroom Attendance System (Anything repo)
  {
    id: 'smart-attendance-system',
    rank: 8,
    number: '08',
    title: 'Smart Classroom Attendance System',
    codeName: 'ATTEND-AI // AUTOMATED CLASSROOM VERIFICATION',
    category: 'IoT & Hardware',
    status: 'COMPLETED',
    tagline: 'Automated student presence verification with sensor and hardware integration.',
    description: 'A classroom attendance automation prototype combining local verification logic, student ID tracking, and real-time ledger synchronization to eliminate manual roll calls.',
    problemStatement: 'Manual roll calling consumes 10-15% of instructional lecture time and is vulnerable to proxy attendance.',
    solution: 'Built an automated logging workflow with rapid ID verification, timestamped logging, and instant cloud sync.',
    architectureDetails: [
      'High-throughput verification loop with immediate visual and audible feedback',
      'Local offline verification buffer to handle network dropouts',
      'REST payload synchronization with academic department databases',
      'Anti-proxy session validation rules'
    ],
    features: [
      'Sub-second identity verification',
      'Offline queuing with auto-reconnect',
      'Automated absentee alert generation',
      'Exportable attendance audit sheets'
    ],
    techStack: ['Python', 'Embedded C++', 'REST APIs', 'SQLite', 'Hardware Sensors'],
    githubUrl: 'https://github.com/shreyashmane-dev/Anything',
    missionNumber: 'MSN-008',
    kanjiTitle: '出席自動 (ATTEND)',
    accentColor: '#397BFF',
    visualStyle: 'hardware',
    featured: true
  },

  // 09. First Aid Hospital
  {
    id: 'first-aid',
    rank: 9,
    number: '09',
    title: 'First Aid Hospital',
    codeName: 'FIRST-AID // EMERGENCY MEDICAL TRIAGE ASSISTANT',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Critical first-aid guidance and step-by-step emergency intervention assistant.',
    description: 'An offline-capable emergency advisory tool that walks users through step-by-step CPR instructions, burn treatments, choking maneuvers, and fracture stabilization before paramedics arrive.',
    problemStatement: 'During critical medical emergencies, bystanders panic and fail to perform correct first aid due to lack of immediate, clear, offline-accessible instructions.',
    solution: 'Designed a high-contrast emergency UI with structured decision trees, visual diagrams, and an audio metronome calibrated for CPR compression rhythms.',
    architectureDetails: [
      'Urgent decision tree algorithm asking quick symptom triage questions',
      'High-contrast visual step-by-step emergency action diagrams',
      'Metronome audio pulse calibrated for standard CPR chest compression rates',
      'One-tap local emergency number speed dialing'
    ],
    features: [
      'Interactive CPR rhythmic audio metronome',
      'Instant offline triage decision trees',
      'One-tap emergency service dialing',
      'Emergency medicine quick reference'
    ],
    techStack: ['TypeScript', 'React', 'PWA / Offline Storage', 'Web Audio API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/First-Aid',
    missionNumber: 'MSN-009',
    kanjiTitle: '応急救護 (FIRST-AID)',
    accentColor: '#FF304F',
    visualStyle: 'cinematic',
    featured: true
  },

  // 10. Lumora
  {
    id: 'lumora',
    rank: 10,
    number: '10',
    title: 'Lumora',
    codeName: 'LUMORA // AMBIENT SPATIAL INTERFACE & SOUNDSCAPE',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Ambient spatial interface and creative productivity canvas.',
    description: 'An experimental creative productivity environment exploring spatial window management, fluid canvas surfaces, and focus soundscapes.',
    problemStatement: 'Modern productivity apps constrain thought into rigid linear lists and columns, discouraging non-linear creative brainstorming.',
    solution: 'Created an infinite spatial canvas where notes, timers, and widgets float as interactive nodes, accompanied by procedural ambient audio.',
    architectureDetails: [
      'Draggable and resizable spatial nodes with snap-to-grid math',
      'Custom canvas rendering loop with hardware-accelerated shaders',
      'Ambient audio generative layer for deep focus work',
      'Modular widget architecture with local state persistence'
    ],
    features: [
      'Infinite draggable spatial canvas',
      'Generative ambient sound generator',
      'Dynamic floating widgets & timers',
      'Zero-latency local persistence'
    ],
    techStack: ['TypeScript', 'React', 'Canvas API', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/shreyashmane-dev/Lumora',
    missionNumber: 'MSN-010',
    kanjiTitle: '光彩空間 (LUMORA)',
    accentColor: '#00E5FF',
    visualStyle: 'glass',
    featured: true
  },

  // 11. SecurePay AI
  {
    id: 'securepay-ai',
    rank: 11,
    number: '11',
    title: 'SecurePay AI',
    codeName: 'SECURE-PAY // FRAUD DETECTION & RISK RADAR',
    category: 'Cybersecurity',
    status: 'COMPLETED',
    tagline: 'Real-time financial transaction risk analysis and fraudulent anomaly interceptor.',
    description: 'Evaluates e-commerce payment payloads against anomaly detection algorithms to flag stolen cards, synthetic identities, and velocity attacks before transactions complete.',
    architectureDetails: ['Sub-50ms fraud inference pipeline', 'Device fingerprinting routines', 'Risk radar dashboard', 'Mock banking gateway'],
    techStack: ['JavaScript', 'Node.js', 'Express', 'Machine Learning', 'Chart.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/SecurePay-AI',
    missionNumber: 'MSN-011',
    kanjiTitle: '決済防御 (SECURE-PAY)',
    accentColor: '#FF304F',
    visualStyle: 'cyber',
    featured: false
  },

  // 12. AI Model Governance Platform (Mobile/Web)
  {
    id: 'xai-governance-platform-m',
    rank: 12,
    number: '12',
    title: 'AI Model Governance Platform',
    codeName: 'XAI-GOV-M // ETHICAL AI COMPLIANCE MONITOR',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Mobile-first companion platform for explainable AI metrics, bias scoring, and drift detection.',
    description: 'Companion dashboard for the XAI governance ecosystem, providing on-the-go monitoring of model drift, demographic parity, and ethical AI compliance scorecards.',
    architectureDetails: ['Mobile-optimized telemetry widgets', 'Real-time alert push engine', 'Drift chart visualization', 'Tokenized API communication'],
    techStack: ['JavaScript', 'React', 'Node.js', 'Chart.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Xai-governance-platform_M',
    missionNumber: 'MSN-012',
    kanjiTitle: '倫理監視 (XAI-M)',
    accentColor: '#397BFF',
    visualStyle: 'cyber',
    featured: false
  },

  // 13. LifeOS
  {
    id: 'lifeos',
    rank: 13,
    number: '13',
    title: 'LifeOS',
    codeName: 'LIFE-OS // PERSONAL PRODUCTIVITY & WORKSPACE',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Personal productivity & AI life assistant (1st team project with buddy).',
    description: 'Unifies daily tasks, deep work sessions, dynamic notes, and personal habits into an all-in-one cognitive dashboard. Designed as a collaborative project with a peer.',
    architectureDetails: ['Task prioritization matrix', 'Local-first persistent workspace', 'Collaborative team architecture', 'Minimalist dark keyboard shortcuts'],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Local Storage'],
    githubUrl: 'https://github.com/shreyashmane-dev/LifeOS',
    missionNumber: 'MSN-013',
    kanjiTitle: '生活基盤 (LIFE-OS)',
    accentColor: '#00E5FF',
    visualStyle: 'minimal',
    featured: false
  },

  // 14. MessMate
  {
    id: 'messmate',
    rank: 14,
    number: '14',
    title: 'MessMate',
    codeName: 'MESSMATE // CAMPUS DINING & MEAL AUTOMATION',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Campus mess, meal subscription, and menu management utility.',
    description: 'A platform built for college hostel students to view daily rotating dining menus, rate meals, log dietary preferences, and manage monthly billing transparency.',
    architectureDetails: ['Weekly automated menu rotation calendar', 'Student feedback pipeline', 'Rebate calculation engine', 'Responsive mobile layout'],
    techStack: ['TypeScript', 'React', 'Node.js', 'Firebase / Firestore', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/MessMate',
    missionNumber: 'MSN-014',
    kanjiTitle: '給食管理 (MESSMATE)',
    accentColor: '#397BFF',
    visualStyle: 'cinematic',
    featured: false
  },

  // 15. Smart Library Management System
  {
    id: 'smart-library-management',
    rank: 15,
    number: '15',
    title: 'Smart Library Management System',
    codeName: 'LIBRA-CORE // AUTOMATED CIRCULATION SYSTEM',
    category: 'Systems Engineering',
    status: 'COMPLETED',
    tagline: 'Full-stack library cataloging, student issue tracking, and inventory automation.',
    description: 'A comprehensive academic library platform managing thousands of volumes, barcode/student RFID lookups, overdue fine calculations, and book reservation queues.',
    architectureDetails: ['Relational book catalog with ISBN indexing', 'Student ledger with penalty calculation', 'Role-based access permissions', 'Inventory report generator'],
    techStack: ['JavaScript', 'Node.js', 'Express', 'MySQL / MongoDB', 'Bootstrap / CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Smart-Library-Management-System',
    missionNumber: 'MSN-015',
    kanjiTitle: '図書管理 (LIBRA)',
    accentColor: '#FF304F',
    visualStyle: 'terminal',
    featured: false
  },

  // 16. VireHire AI
  {
    id: 'virehire-ai',
    rank: 16,
    number: '16',
    title: 'VireHire AI',
    codeName: 'VIREHIRE // AUTONOMOUS TECHNICAL INTERVIEW ENGINE',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'AI-driven candidate screening, technical interview simulator, and assessment engine.',
    description: 'Conducts interactive dynamic technical coding interviews, evaluates reasoning step-by-step, asks follow-up probe questions based on candidate answers, and outputs comprehensive grading reports.',
    architectureDetails: ['Adaptive questioning engine', 'In-browser sandbox code editor', 'Rubric evaluation parser', 'Personalized skill gap feedback'],
    techStack: ['TypeScript', 'React', 'Node.js', 'LLM APIs', 'Monaco Editor', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/VireHire-AI',
    missionNumber: 'MSN-016',
    kanjiTitle: '面接知能 (VIREHIRE)',
    accentColor: '#00E5FF',
    visualStyle: 'cyber',
    featured: false
  },

  // 17. ElectOS AI Civic
  {
    id: 'electos-ai-civic',
    rank: 17,
    number: '17',
    title: 'ElectOS AI Civic',
    codeName: 'ELECT-OS // FULL-STACK CIVIC GOVERNANCE SUITE',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Production-oriented civic operating environment powered by Next.js, Firestore, and Vertex AI.',
    description: 'A civic operating environment enabling citizens to analyze government policies, track public welfare expenditures, submit automated grievance queries, and interact with AI-driven policy explainers.',
    architectureDetails: ['Google Vertex AI cognitive summarizer', 'Real-time Firestore persistence', 'Next.js server-rendered application', 'Bilingual accessible interface'],
    techStack: ['TypeScript', 'Next.js', 'Google Vertex AI', 'Firestore', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/ElectOS-Ai-Civic',
    missionNumber: 'MSN-017',
    kanjiTitle: '市民知能 (ELECT-OS)',
    accentColor: '#397BFF',
    visualStyle: 'cinematic',
    featured: false
  },

  // 18. Synapse Messenger
  {
    id: 'synapse-messenger',
    rank: 18,
    number: '18',
    title: 'Synapse Messenger',
    codeName: 'SYNAPSE // REAL-TIME ENCRYPTED MESSAGING',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'High-performance real-time chat application with WebSocket synchronization.',
    description: 'A full-stack real-time communication platform supporting direct messaging, group channels, online presence detection, message reactions, and end-to-end payload encryption.',
    architectureDetails: ['WebSocket bi-directional event pipeline', 'Optimistic UI message dispatch', 'Redis pub/sub channel partition', 'Cyberpunk chat interface'],
    techStack: ['JavaScript', 'React', 'Node.js', 'Socket.io', 'MongoDB / Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Synapse_Messenger',
    missionNumber: 'MSN-018',
    kanjiTitle: '通信神経 (SYNAPSE)',
    accentColor: '#00E5FF',
    visualStyle: 'cyber',
    featured: false
  },

  // 19. WindCast AI
  {
    id: 'windcast-ai',
    rank: 19,
    number: '19',
    title: 'WindCast AI',
    codeName: 'WINDCAST // RENEWABLE ENERGY TIME-SERIES MODEL',
    category: 'Machine Learning',
    status: 'COMPLETED',
    tagline: 'Machine learning platform for short-term wind power and renewable energy generation forecasting.',
    description: 'Trained on meteorological sensor arrays to forecast wind turbine power output hours in advance, assisting renewable energy grids with load balancing and storage optimization.',
    architectureDetails: ['Time-series regression models', 'Comparative model evaluation suite', 'Prediction confidence intervals', 'Mini-model edge telemetry exports'],
    techStack: ['Python', 'TypeScript', 'Scikit-Learn', 'Pandas', 'Chart.js', 'HTML5'],
    githubUrl: 'https://github.com/shreyashmane-dev/WindCast-AI',
    missionNumber: 'MSN-019',
    kanjiTitle: '風力予測 (WINDCAST)',
    accentColor: '#397BFF',
    visualStyle: 'cinematic',
    featured: false
  },

  // 20. Secure Focus App
  {
    id: 'secure-focus-app',
    rank: 20,
    number: '20',
    title: 'Secure Focus App',
    codeName: 'SECURE-FOCUS // ANDROID DEEP WORK LOCKDOWN',
    category: 'Mobile Applications',
    status: 'COMPLETED',
    tagline: 'Android focus and deep work companion application engineered in Kotlin.',
    description: 'A native mobile application that creates strict distraction-free study intervals by locking specified notification streams, tracking flow state sessions, and providing focus metrics.',
    architectureDetails: ['Native Android UsageStats integrations', 'Configurable Pomodoro timers', 'Local SQLite Room database', 'Material Design dark theme'],
    techStack: ['Kotlin', 'Android Jetpack', 'Coroutines', 'Room Database', 'Material Design'],
    githubUrl: 'https://github.com/shreyashmane-dev/Secure-Focus-App',
    missionNumber: 'MSN-020',
    kanjiTitle: '集中制御 (FOCUS)',
    accentColor: '#FF304F',
    visualStyle: 'minimal',
    featured: false
  },

  // 21. VEYRA
  {
    id: 'veyra-assistant',
    rank: 21,
    number: '21',
    title: 'VEYRA',
    codeName: 'VEYRA // COGNITIVE AGENT ARCHITECTURE',
    category: 'Artificial Intelligence',
    status: 'IN DEVELOPMENT',
    tagline: 'A self-built, local-first personal AI assistant with conversational memory and dynamic tool execution.',
    description: 'Engineered as an autonomous personal intelligence runtime. Features hierarchical conversational memory buffers, local-first context retrieval, multi-turn reasoning loops, and extensible tool-calling adapters to automate developer workflows.',
    architectureDetails: ['Hierarchical conversational memory buffer', 'Extensible tool-calling pipeline', 'Prompt routing across LLMs', 'Streaming voice & text interface'],
    techStack: ['Python', 'FastAPI', 'LangChain', 'TypeScript', 'Node.js', 'Vector DB'],
    githubUrl: 'https://github.com/shreyashmane-dev/Veyra',
    missionNumber: 'MSN-021',
    kanjiTitle: '人工頭脳 (VEYRA)',
    accentColor: '#397BFF',
    visualStyle: 'cinematic',
    featured: false
  },

  // 22. MahaResilience
  {
    id: 'maha-resilience',
    rank: 22,
    number: '22',
    title: 'MahaResilience',
    codeName: 'MAHA-RESILIENCE // MUNICIPAL DISASTER DEFENSE',
    category: 'Web Applications',
    status: 'IN DEVELOPMENT',
    tagline: 'Community resource coordination and disaster resilience platform (Second Year CEP Project).',
    description: 'A platform built with teammates to coordinate municipal disaster response, shelter availability, medical inventories, and volunteer dispatch during seasonal floods and natural crises.',
    architectureDetails: ['Relief center inventory tracking', 'Geo-fenced alert broadcasting', 'Offline incident reporting buffer', 'Collaborative academic engineering'],
    techStack: ['TypeScript', 'React', 'Node.js', 'Firebase', 'Tailwind CSS', 'Leaflet Maps'],
    githubUrl: 'https://github.com/shreyashmane-dev/MahaResilience',
    missionNumber: 'MSN-022',
    kanjiTitle: '地域防災 (MAHA-RES)',
    accentColor: '#FF304F',
    visualStyle: 'cinematic',
    featured: false
  },

  // 23. ReliefSync
  {
    id: 'reliefsync',
    rank: 23,
    number: '23',
    title: 'ReliefSync',
    codeName: 'RELIEF-SYNC // EMERGENCY AID COORDINATION',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Emergency crisis response and humanitarian supply chain distribution system.',
    description: 'A web portal for relief organizations during acute emergencies to match victim aid requests with volunteer supply runs, medicine inventories, and rescue boats.',
    architectureDetails: ['SOS request priority triage', 'Interactive shelter maps', 'Low-bandwidth design', 'Direct volunteer phone dispatch'],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'OpenStreetMap'],
    githubUrl: 'https://github.com/shreyashmane-dev/ReliefSync',
    missionNumber: 'MSN-023',
    kanjiTitle: '救助連携 (RELIEF-SYNC)',
    accentColor: '#00E5FF',
    visualStyle: 'minimal',
    featured: false
  },

  // 24. WindCast AI Mini Model
  {
    id: 'windcast-mini',
    rank: 24,
    number: '24',
    title: 'WindCast AI Mini Model',
    codeName: 'WINDCAST-MINI // EDGE RENEWABLE POWER REGRESSION',
    category: 'Machine Learning',
    status: 'COMPLETED',
    tagline: 'Lightweight client-side model demonstration for instant wind power prediction.',
    description: 'A portable, lightweight browser implementation of the WindCast regression model, designed to demonstrate short-term power forecasting directly inside client environments.',
    architectureDetails: ['Compact client-side model weights', 'Interactive parameter sliders', 'Real-time output curve generation', 'Zero-server execution dependency'],
    techStack: ['HTML5', 'JavaScript', 'Canvas API', 'Regression Models'],
    githubUrl: 'https://github.com/shreyashmane-dev/WindCast-AI-MINI-MODEL',
    missionNumber: 'MSN-024',
    kanjiTitle: '超小型予測 (MINI-WIND)',
    accentColor: '#397BFF',
    visualStyle: 'minimal',
    featured: false
  },

  // 25. XAI Governance Platform
  {
    id: 'xai-governance-platform',
    rank: 25,
    number: '25',
    title: 'XAI Governance Platform',
    codeName: 'XAI-GOV // EXPLAINABLE AI MODEL AUDITING',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Explainable AI auditing platform measuring model bias, fairness, and feature attributions.',
    description: 'Provides regulatory and engineering teams with audit-ready dashboards measuring demographic parity, disparate impact, SHAP/LIME feature importances, and model drift over time.',
    architectureDetails: ['Fairness metrics calculator', 'Feature attribution visualizer', 'Automated PDF compliance audit generator', 'Modular client-server layout'],
    techStack: ['JavaScript', 'Python', 'SHAP / LIME', 'Express', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Xai-governance-platform',
    missionNumber: 'MSN-025',
    kanjiTitle: '倫理統制 (XAI-GOV)',
    accentColor: '#FF304F',
    visualStyle: 'cyber',
    featured: false
  },

  // 26. Aivora Web
  {
    id: 'aivora-web',
    rank: 26,
    number: '26',
    title: 'Aivora Web',
    codeName: 'AIVORA-WEB // MULTI-MODAL GENERATIVE AI SUITE',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Multi-modal generative AI application for web-based synthesis, voice, and analysis.',
    description: 'The web client of Aivora, supporting rich AI chat interactions, document summarization, generative code assistance, and speech recognition.',
    architectureDetails: ['Dynamic provider switching', 'Streaming response rendering', 'Markdown code syntax highlighter', 'Local session persistence'],
    techStack: ['JavaScript', 'React', 'LLM APIs', 'Node.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/aivora-web',
    missionNumber: 'MSN-026',
    kanjiTitle: '知能端末 (AIVORA)',
    accentColor: '#00E5FF',
    visualStyle: 'glass',
    featured: false
  },

  // 27. Expense Tracker Web
  {
    id: 'expense-tracker-web',
    rank: 27,
    number: '27',
    title: 'Expense Tracker Web',
    codeName: 'EXPENSE-WEB // CLIENT-SIDE FINANCIAL ANALYTICS',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Fast web application for logging expenses and visualizing spending breakdowns.',
    description: 'Responsive web portal that tracks daily expenditures, recurring subscriptions, and category ratios with interactive charts and exportable financial logs.',
    architectureDetails: ['Client-side IndexedDB/localStorage', 'Interactive chart visualizer', 'Budget threshold warnings', 'CSV statement export'],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'Local Storage'],
    githubUrl: 'https://github.com/shreyashmane-dev/Expense-tacker-web',
    missionNumber: 'MSN-027',
    kanjiTitle: '財務分析 (EXPENSE)',
    accentColor: '#397BFF',
    visualStyle: 'minimal',
    featured: false
  },

  // 28. Expense Tracker Android
  {
    id: 'expense-tracker-android',
    rank: 28,
    number: '28',
    title: 'Expense Tracker Android',
    codeName: 'EXPENSE-CAP // CAPACITOR MOBILE APP',
    category: 'Mobile Applications',
    status: 'COMPLETED',
    tagline: 'Capacitor mobile build of the Expense Tracker app for Android devices.',
    description: 'Packaged using Capacitor for native Android deployment, providing offline-first transaction entry and touch-optimized spending graphs.',
    architectureDetails: ['Capacitor native shell integration', 'Offline local storage parity', 'Hardware back button handling', 'Touch-optimized gestures'],
    techStack: ['HTML5', 'JavaScript', 'Capacitor', 'Android SDK'],
    githubUrl: 'https://github.com/shreyashmane-dev/Expense-tacker-capacitor-app',
    missionNumber: 'MSN-028',
    kanjiTitle: '携帯出納 (EXPENSE-M)',
    accentColor: '#00E5FF',
    visualStyle: 'minimal',
    featured: false
  },

  // 29. Aivora Capacitor App
  {
    id: 'aivora-capacitor-app',
    rank: 29,
    number: '29',
    title: 'Aivora Capacitor App',
    codeName: 'AIVORA-APP // HYBRID MOBILE AI CLIENT',
    category: 'Mobile Applications',
    status: 'COMPLETED',
    tagline: 'Capacitor-powered hybrid mobile client for the Aivora AI platform.',
    description: 'Enables mobile access to Aivora generative chat and voice prompts on Android smartphones with persistent chat history and native UI ergonomics.',
    architectureDetails: ['Capacitor Android wrapper', 'Haptic feedback integration', 'Voice audio bridge', 'Adaptive viewport layout'],
    techStack: ['JavaScript', 'Capacitor', 'React', 'Android SDK', 'LLM APIs'],
    githubUrl: 'https://github.com/shreyashmane-dev/aivora-capacitor-app',
    missionNumber: 'MSN-029',
    kanjiTitle: '移動知能 (AIVORA-M)',
    accentColor: '#FF304F',
    visualStyle: 'minimal',
    featured: false
  },

  // 30. Memora
  {
    id: 'memora',
    rank: 30,
    number: '30',
    title: 'Memora',
    codeName: 'MEMORA // COGNITIVE MEMORY AUGMENTATION',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Cognitive memory augmentation and semantic note clustering engine.',
    description: 'An intelligent second-brain knowledge base that uses embedding models to automatically discover semantic links between disparate thoughts, articles, and research notes.',
    architectureDetails: ['Vector similarity clustering', 'Interactive 2D graph view', 'Markdown-first note editor', 'Local-first SQLite vector search'],
    techStack: ['TypeScript', 'React', 'Vector DB', 'LLM Embeddings', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Memora',
    missionNumber: 'MSN-030',
    kanjiTitle: '記憶連結 (MEMORA)',
    accentColor: '#397BFF',
    visualStyle: 'cyber',
    featured: false
  },

  // 31. Mimora
  {
    id: 'mimora',
    rank: 31,
    number: '31',
    title: 'Mimora',
    codeName: 'MIMORA // MICRO-INTERACTION LABORATORY',
    category: 'Developer Tools',
    status: 'COMPLETED',
    tagline: 'Micro-interaction component design system and tactile UI experiments.',
    description: 'A laboratory repository of experimental, physics-based UI components: fluid buttons, magnetic inputs, glassmorphic sliders, and spring animation presets.',
    architectureDetails: ['Fluid physics spring solvers', 'Accessible keyboard controls', 'CSS custom properties system', 'Component playground'],
    techStack: ['TypeScript', 'React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/shreyashmane-dev/Mimora',
    missionNumber: 'MSN-031',
    kanjiTitle: '微細動作 (MIMORA)',
    accentColor: '#FF304F',
    visualStyle: 'glass',
    featured: false
  },

  // 32. Trained Models
  {
    id: 'trained-models',
    rank: 32,
    number: '32',
    title: 'Trained Models',
    codeName: 'WEIGHTS // ML ARTIFACTS & EVALUATION WEIGHTS',
    category: 'Machine Learning',
    status: 'COMPLETED',
    tagline: 'Collection of custom trained machine learning models, weights, and benchmarking scripts.',
    description: 'A repository housing trained checkpoints, weights, and performance evaluation notebooks for vision classification, tabular regression, and NLP tasks.',
    architectureDetails: ['Model weight checkpoints', 'Loss curve & ROC-AUC logs', 'ONNX & TensorRT export scripts', 'Optuna hyperparameter tuning'],
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'ONNX', 'Jupyter'],
    githubUrl: 'https://github.com/shreyashmane-dev/Trained-Models',
    missionNumber: 'MSN-032',
    kanjiTitle: '学習模型 (MODELS)',
    accentColor: '#00E5FF',
    visualStyle: 'terminal',
    featured: false
  },

  // 33. Computer Networks Lab
  {
    id: 'computer-networks-lab',
    rank: 33,
    number: '33',
    title: 'Computer Networks Lab',
    codeName: 'NET-LAB // LOW-LEVEL SOCKET PROGRAMMING',
    category: 'Systems Engineering',
    status: 'COMPLETED',
    tagline: 'Low-level socket programming, packet routing, and network protocol simulations in C.',
    description: 'Implementations of core networking protocols in C: TCP client-server sockets, UDP broadcast, sliding window ARQ algorithms, and packet error detection algorithms.',
    architectureDetails: ['POSIX socket implementations', 'Sliding Window Protocol simulations', 'Cyclic Redundancy Check (CRC)', 'Dijkstra routing algorithms'],
    techStack: ['C', 'POSIX Sockets', 'Network Protocols', 'Algorithms'],
    githubUrl: 'https://github.com/shreyashmane-dev/computer-networks-lab',
    missionNumber: 'MSN-033',
    kanjiTitle: '通信網論 (NETWORKS)',
    accentColor: '#397BFF',
    visualStyle: 'terminal',
    featured: false
  },

  // 34. OOC Lab
  {
    id: 'ooc-lab',
    rank: 34,
    number: '34',
    title: 'OOC Lab',
    codeName: 'OOC-LAB // C++ SOFTWARE DESIGN PATTERNS',
    category: 'Academic & Experiments',
    status: 'COMPLETED',
    tagline: 'Object-oriented C++ software architecture experiments and design pattern implementations.',
    description: 'Laboratory coursework exploring class hierarchies, operator overloading, virtual methods, polymorphism, template metaprogramming, and exception handling in modern C++.',
    architectureDetails: ['Multiple & virtual inheritance', 'Operator overloading patterns', 'Template classes and containers', 'RAII memory safety principles'],
    techStack: ['C++', 'OOP Design', 'Templates', 'STL'],
    githubUrl: 'https://github.com/shreyashmane-dev/OOC-lab',
    missionNumber: 'MSN-034',
    kanjiTitle: '対象指向 (OOC-LAB)',
    accentColor: '#00E5FF',
    visualStyle: 'terminal',
    featured: false
  },

  // 35. C Programs
  {
    id: 'c-programs',
    rank: 35,
    number: '35',
    title: 'C Programs',
    codeName: 'CORE-C // DATA STRUCTURES & ALGORITHM REPO',
    category: 'Academic & Experiments',
    status: 'COMPLETED',
    tagline: 'Lab experiments, data structures, and algorithmic problems implemented in C and C++.',
    description: 'A foundational repository containing implementations of linked lists, binary search trees, sorting algorithms, graph traversals, and dynamic programming challenges.',
    architectureDetails: ['Stack, queue, BST implementations', 'Pointer arithmetic and memory allocation', 'Time and space complexity benchmarks', 'Academic lab test cases'],
    techStack: ['C', 'C++', 'Data Structures', 'Algorithms', 'GCC'],
    githubUrl: 'https://github.com/shreyashmane-dev/C-Programs',
    missionNumber: 'MSN-035',
    kanjiTitle: '基礎計算 (C-CORE)',
    accentColor: '#FF304F',
    visualStyle: 'terminal',
    featured: false
  },

  // 36. C Lab
  {
    id: 'c-lab',
    rank: 36,
    number: '36',
    title: 'C Lab',
    codeName: 'C-LAB // LINUX SYSTEMS PROGRAMMING',
    category: 'Academic & Experiments',
    status: 'COMPLETED',
    tagline: 'System-level C programming, file I/O operations, and process management.',
    description: 'Structured exercises in low-level operating system concepts: fork, exec, inter-process communication pipes, signal handlers, and POSIX file system manipulation.',
    architectureDetails: ['Linux process management', 'Low-level read/write syscalls', 'IPC anonymous pipes and shared memory', 'Signal handlers'],
    techStack: ['C', 'Linux APIs', 'Systems Programming', 'POSIX'],
    githubUrl: 'https://github.com/shreyashmane-dev/C-lab',
    missionNumber: 'MSN-036',
    kanjiTitle: '実機制御 (C-LAB)',
    accentColor: '#397BFF',
    visualStyle: 'terminal',
    featured: false
  },

  // 37. Recordly (Contribution/Tool note)
  {
    id: 'recordly',
    rank: 37,
    number: '37',
    title: 'Recordly',
    codeName: 'RECORDLY // POLISHED DEMO VIDEO STUDIO',
    category: 'Developer Tools',
    status: 'COMPLETED',
    tagline: 'Create polished demo videos without editing skills on Mac, Windows, and Linux.',
    description: 'A desktop screen recording studio that automatically tracks cursor clicks, generates smooth zoom-ins on active UI elements, and renders developer demo clips ready for social and documentation.',
    architectureDetails: ['Hardware-accelerated screen capture pipeline', 'Automated cursor tracking and keyframe zoom', 'Multi-platform desktop packaging', 'Instant MP4/GIF export'],
    techStack: ['TypeScript', 'Electron', 'React', 'WebCodecs', 'Canvas API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Recordly',
    missionNumber: 'MSN-037',
    kanjiTitle: '画面録画 (RECORDLY)',
    accentColor: '#00E5FF',
    visualStyle: 'cinematic',
    featured: false
  },

  // 38. DevTrack AI
  {
    id: 'devtrack-ai',
    rank: 38,
    number: '38',
    title: 'DevTrack AI',
    codeName: 'DEVTRACK // DEVELOPER PRODUCTIVITY TELEMETRY',
    category: 'Developer Tools',
    status: 'IN DEVELOPMENT',
    tagline: 'AI-assisted developer productivity and code activity telemetry platform.',
    description: 'Monitors developer coding patterns across sessions to identify context-switching fatigue, build-break frequency, and peak flow hours to recommend optimal focus periods.',
    architectureDetails: ['Background telemetry agent', 'AI cognitive fatigue pattern classifier', 'Zero keystroke logging privacy', 'Futuristic dark HUD dashboard'],
    techStack: ['TypeScript', 'Python', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/DevTrack-AI',
    missionNumber: 'MSN-038',
    kanjiTitle: '作業追跡 (DEVTRACK)',
    accentColor: '#397BFF',
    visualStyle: 'cyber',
    featured: false
  },

  // 39. BaisGaurd XI
  {
    id: 'baisgaurd-xi',
    rank: 39,
    number: '39',
    title: 'BaisGaurd XI',
    codeName: 'BIAS-GUARD // ETHICAL AI SAFETY BENCHMARK',
    category: 'Artificial Intelligence',
    status: 'COMPLETED',
    tagline: 'Automated bias detection and safety guardrail testing for LLM prompts.',
    description: 'A security and safety tool that subjects LLM models to adversarial prompt injection tests, jailbreak attempts, and demographic bias queries to output vulnerability reports.',
    architectureDetails: ['Adversarial prompt generator', 'Toxicity & bias scoring metric engine', 'Visual benchmark scorecard', 'JSON audit test reports'],
    techStack: ['JavaScript', 'Node.js', 'LLM APIs', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/BaisGaurd-XI',
    missionNumber: 'MSN-039',
    kanjiTitle: '安全防壁 (BIAS-GUARD)',
    accentColor: '#FF304F',
    visualStyle: 'cyber',
    featured: false
  },

  // 40. Kashid Snacks
  {
    id: 'kashid-snacks',
    rank: 40,
    number: '40',
    title: 'Kashid Snacks',
    codeName: 'KASHID // DIGITAL POS & ORDERING SYSTEM',
    category: 'Web Applications',
    status: 'COMPLETED',
    tagline: 'Food ordering, table billing, and POS commerce management application.',
    description: 'A point-of-sale restaurant management tool for a local snack cafe. Streamlines token printing, kitchen ticket displays, billing totals, and inventory tracking.',
    architectureDetails: ['Fast cashier billing terminal', 'Real-time kitchen order ticket display', 'Daily revenue summary analytics', 'Tablet & desktop touch responsive'],
    techStack: ['JavaScript', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/shreyashmane-dev/Kashid_Snacks',
    missionNumber: 'MSN-040',
    kanjiTitle: '店舗出納 (KASHID)',
    accentColor: '#00E5FF',
    visualStyle: 'minimal',
    featured: false
  },

  // 41. React Practice
  {
    id: 'react-practice',
    rank: 41,
    number: '41',
    title: 'React Practice',
    codeName: 'REACT-LAB // REACT ENGINE EXPERIMENTS',
    category: 'Academic & Experiments',
    status: 'EXPERIMENTAL',
    tagline: 'Hands-on practice workspace testing React custom hooks, state reducers, and rendering optimizations.',
    description: 'A sandbox repository created for mastering core React patterns, custom hook lifecycles, virtual DOM reconciliation, and context providers.',
    architectureDetails: ['Custom hook patterns', 'Reducer state patterns', 'Rendering performance benchmarks', 'Sandbox component prototypes'],
    techStack: ['JavaScript', 'React', 'CSS3', 'Vite'],
    githubUrl: 'https://github.com/shreyashmane-dev/react-practice',
    missionNumber: 'MSN-041',
    kanjiTitle: '演習実験 (REACT-LAB)',
    accentColor: '#397BFF',
    visualStyle: 'terminal',
    featured: false
  },

  // 42. GitHub Skills Introduction
  {
    id: 'skills-introduction-to-github',
    rank: 42,
    number: '42',
    title: 'GitHub Skills Introduction',
    codeName: 'GH-SKILLS // VCS WORKFLOW CERTIFICATION LAB',
    category: 'Academic & Experiments',
    status: 'COMPLETED',
    tagline: 'Hands-on training lab mastering Git branches, pull requests, merge conflict resolution, and CI.',
    description: 'Coursework repository completing GitHub official certification exercises on pull-request workflows, merge conflict resolution, Markdown documentation, and branch management.',
    architectureDetails: ['Feature branching exercises', 'Pull request peer reviews', 'Conflict resolution drills', 'Release tagging basics'],
    techStack: ['Git', 'GitHub', 'Markdown', 'VCS Best Practices'],
    githubUrl: 'https://github.com/shreyashmane-dev/skills-introduction-to-github',
    missionNumber: 'MSN-042',
    kanjiTitle: '技法修得 (GH-SKILLS)',
    accentColor: '#00E5FF',
    visualStyle: 'terminal',
    featured: false
  },

  // 43. RepoPulse (Maintenance automation)
  {
    id: 'repopulse',
    rank: 43,
    number: '43',
    title: 'RepoPulse',
    codeName: 'REPO-PULSE // REPOSITORY MAINTENANCE & TELEMETRY',
    category: 'Developer Tools',
    status: 'COMPLETED',
    tagline: 'Repository health, commit velocity, and maintenance automation telemetry.',
    description: 'Maintenance automation script and dashboard tracking pull request turnaround times, commit frequency, and repository health metrics.',
    architectureDetails: ['GitHub API rate-limit buffer', 'Repository health scoring', 'Commit cadence visualizer', 'Automated export summaries'],
    techStack: ['Python', 'FastAPI', 'GitHub API', 'Pandas', 'Plotly'],
    githubUrl: 'https://github.com/shreyashmane-dev/RepoPulse',
    missionNumber: 'MSN-043',
    kanjiTitle: '保守監視 (REPO-PULSE)',
    accentColor: '#FF304F',
    visualStyle: 'terminal',
    featured: false
  },

  // 44. GitHub Profile
  {
    id: 'github-profile',
    rank: 44,
    number: '44',
    title: 'GitHub Profile & Developer Identity',
    codeName: 'SHR-PROFILE // DEVELOPER IDENTITY ANCHOR',
    category: 'Developer Tools',
    status: 'COMPLETED',
    tagline: 'Central developer identity repository and automated GitHub stats overview.',
    description: 'The public identity repository powering the @shreyashmane-dev GitHub profile. Contains developer bios, technical milestones, and automated activity telemetry.',
    architectureDetails: ['Dynamic GitHub Readme statistics', 'Streak counters and badge generation', 'Profile configuration markdown', 'Identity anchor'],
    techStack: ['Markdown', 'GitHub Actions', 'SVG Badges', 'Developer Identity'],
    githubUrl: 'https://github.com/shreyashmane-dev/shreyashmane-dev',
    missionNumber: 'MSN-044',
    kanjiTitle: '開発者証 (PROFILE)',
    accentColor: '#397BFF',
    visualStyle: 'minimal',
    featured: false
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // PROGRAMMING
  {
    name: 'C',
    category: 'PROGRAMMING',
    categoryLabel: 'SYSTEMS & CORE',
    level: 'Core Foundations',
    description: 'Low-level memory management, pointers, data structures, and computer architecture fundamentals.',
    highlights: ['Manual memory control', 'Data structures implementation', 'Hardware-level execution']
  },
  {
    name: 'C++',
    category: 'PROGRAMMING',
    categoryLabel: 'OBJECT ORIENTED & EMBEDDED',
    level: 'Object-Oriented & Embedded',
    description: 'Object-oriented programming, standard template library, and embedded microcontroller firmware for ESP32.',
    highlights: ['Firmware logic', 'OOP architecture', 'Hardware communication libraries']
  },
  {
    name: 'Python',
    category: 'PROGRAMMING',
    categoryLabel: 'AI & SCRIPTING',
    level: 'AI & Automation Engine',
    description: 'Primary language for AI agent pipelines, machine learning experiments, automation scripts, and backend APIs.',
    highlights: ['FastAPI & Flask', 'Agentic workflow scripts', 'Data processing & PyTorch']
  },
  {
    name: 'JavaScript',
    category: 'PROGRAMMING',
    categoryLabel: 'WEB RUNTIME',
    level: 'Modern Web Standard',
    description: 'Asynchronous event loops, DOM manipulation, modern ES6+ features, and interactive web scripting.',
    highlights: ['Async / Promises / WebSockets', 'Event-driven logic', 'Interactive UI canvas']
  },
  {
    name: 'TypeScript',
    category: 'PROGRAMMING',
    categoryLabel: 'TYPE SYSTEMS',
    level: 'Strict Type Engineering',
    description: 'Building robust, maintainable applications with static typing, generics, and strict contracts.',
    highlights: ['Strict type inference', 'Complex interface modeling', 'Full-stack type safety']
  },

  // FRONTEND
  {
    name: 'React',
    category: 'FRONTEND',
    categoryLabel: 'UI FRAMEWORK',
    level: 'Advanced Component Design',
    description: 'Declarative component architecture, custom hooks, state synchronization, and reactive UI patterns.',
    highlights: ['React 19 & Server Components', 'Hook ecosystems', 'Virtual DOM optimization']
  },
  {
    name: 'HTML',
    category: 'FRONTEND',
    categoryLabel: 'MARKUP & STRUCTURE',
    level: 'Semantic Web Standards',
    description: 'Semantic markup, accessible structure, SEO best practices, and standard browser DOM structures.',
    highlights: ['Accessible ARIA landmarks', 'Modern semantic layout', 'Performance-first structure']
  },
  {
    name: 'CSS',
    category: 'FRONTEND',
    categoryLabel: 'STYLING ENGINE',
    level: 'Modern Layouts & Effects',
    description: 'CSS Grid, Flexbox, glassmorphic filters, CSS custom properties, and keyframe animations.',
    highlights: ['Modern CSS Grid / Subgrid', 'Glassmorphism & backdrop filters', 'Hardware-accelerated transforms']
  },
  {
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    categoryLabel: 'UTILITY ARCHITECTURE',
    level: 'Design Systems & Tokens',
    description: 'Utility-first rapid prototyping, design tokens, responsive breakpoints, and dark/light theme switching.',
    highlights: ['Tailwind v4 engine', 'Dynamic design tokens', 'Custom theme variants']
  },

  // BACKEND
  {
    name: 'Node.js',
    category: 'BACKEND',
    categoryLabel: 'SERVER RUNTIME',
    level: 'Asynchronous Backend',
    description: 'Event-driven server-side JavaScript runtime for scalable network applications and REST microservices.',
    highlights: ['Express / REST APIs', 'Microservice endpoints', 'Streaming & file I/O']
  },
  {
    name: 'REST APIs',
    category: 'BACKEND',
    categoryLabel: 'API ARCHITECTURE',
    level: 'RESTful Protocols',
    description: 'Designing clean, stateless HTTP endpoints, JSON schemas, authentication guards, and CRUD interfaces.',
    highlights: ['Stateless API routing', 'Schema validation', 'CORS & rate-limiting']
  },
  {
    name: 'Firebase',
    category: 'BACKEND',
    categoryLabel: 'CLOUD BACKEND',
    level: 'BaaS & Realtime Data',
    description: 'Real-time Firestore databases, authentication, cloud storage, and serverless hosting deployments.',
    highlights: ['Firestore realtime listeners', 'Authentication pipelines', 'Cloud database security']
  },

  // AI & DEVELOPMENT
  {
    name: 'LLM APIs',
    category: 'AI & DEVELOPMENT',
    categoryLabel: 'GENERATIVE INTELLIGENCE',
    level: 'Model Integration & Prompting',
    description: 'Interfacing with state-of-the-art LLMs, multi-modal vision inputs, structured output parsing, and embeddings.',
    highlights: ['Structured JSON outputs', 'Function / tool calling', 'Context window optimization']
  },
  {
    name: 'AI Agents',
    category: 'AI & DEVELOPMENT',
    categoryLabel: 'AUTONOMOUS ARCHITECTURE',
    level: 'Autonomous Agent Loops',
    description: 'Designing autonomous decision-making agents with memory, feedback loops, and multi-step reasoning.',
    highlights: ['ReAct & plan-and-solve loops', 'Tool orchestration', 'Dynamic feedback cycles']
  },
  {
    name: 'LangChain',
    category: 'AI & DEVELOPMENT',
    categoryLabel: 'AGENT FRAMEWORKS',
    level: 'Chains & Pipelines',
    description: 'Orchestrating complex retrieval-augmented generation (RAG) chains, document loaders, and memory stores.',
    highlights: ['Retrieval-Augmented Generation', 'Vector document stores', 'Prompt templates']
  },
  {
    name: 'n8n',
    category: 'AI & DEVELOPMENT',
    categoryLabel: 'WORKFLOW AUTOMATION',
    level: 'Visual Automation',
    description: 'Automating multi-service workflows, webhook triggers, AI nodes, and automated developer pipelines.',
    highlights: ['Event-driven triggers', 'AI pipeline nodes', 'API choreography']
  },
  {
    name: 'Vector Databases',
    category: 'AI & DEVELOPMENT',
    categoryLabel: 'SEMANTIC MEMORY',
    level: 'Embedding Retrieval',
    description: 'Storing high-dimensional embeddings for semantic similarity search, long-term memory, and RAG knowledge bases.',
    highlights: ['Cosine similarity indexing', 'Hybrid keyword-vector search', 'Semantic document chunking']
  },

  // TOOLS
  {
    name: 'Git',
    category: 'TOOLS',
    categoryLabel: 'VERSION CONTROL',
    level: 'Distributed VCS',
    description: 'Branch management, rebasing, stash management, cherry-picking, and collaborative version control.',
    highlights: ['Atomic commit hygiene', 'Feature branching workflows', 'Conflict resolution']
  },
  {
    name: 'GitHub',
    category: 'TOOLS',
    categoryLabel: 'COLLABORATION & CI',
    level: 'Repo & Action Workflows',
    description: 'Project tracking, code reviews, issue triaging, GitHub Actions CI/CD, and release management.',
    highlights: ['CI/CD automation', 'Open-source collaboration', 'Release distribution']
  },
  {
    name: 'Docker',
    category: 'TOOLS',
    categoryLabel: 'CONTAINERIZATION',
    level: 'Isolated Environments',
    description: 'Building portable container images, multi-stage Dockerfiles, and reproducible development runtimes.',
    highlights: ['Dockerfile optimization', 'Containerized microservices', 'Local environment parity']
  },
  {
    name: 'Blender',
    category: 'TOOLS',
    categoryLabel: '3D MODELING',
    level: '3D Geometry & Shading',
    description: '3D modeling, low-poly geometry creation, material nodes, and glTF asset export for Three.js web rendering.',
    highlights: ['glTF/GLB web asset pipeline', 'Low-poly hard surface modeling', 'Lighting & UV unwrapping']
  },
  {
    name: 'VS Code',
    category: 'TOOLS',
    categoryLabel: 'IDE WORKSPACE',
    level: 'Primary Cockpit',
    description: 'High-productivity development cockpit customized with keybindings, extensions, debuggers, and terminal tools.',
    highlights: ['Multi-root workspaces', 'Integrated debugging profiles', 'Custom snippet automation']
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    era: 'ACT I',
    year: 'FOUNDATIONS',
    title: 'The Machine Language Awakening',
    subtitle: 'Computer Science Core & Algorithmic Thinking',
    kanji: '根源 (FOUNDATION)',
    description: 'Discovered the sheer beauty of structured logic. Diving deep into C and C++, understanding pointers, memory allocation, time complexity, and how silicon translates pure logic into reality.',
    technologies: ['C', 'C++', 'Data Structures', 'Algorithms', 'Computer Architecture'],
    status: 'CONQUERED'
  },
  {
    era: 'ACT II',
    year: 'EXPANSION',
    title: 'Architecting the Modern Web',
    subtitle: 'From Static Pages to Reactive Universes',
    kanji: '進化 (EVOLUTION)',
    description: 'Mastered modern web technologies: JavaScript, TypeScript, React, and modular styling. Moved from simple layouts to high-performance, component-driven client applications with rich state management.',
    technologies: ['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'REST APIs'],
    status: 'CONQUERED'
  },
  {
    era: 'ACT III',
    year: 'HARDWARE FUSION',
    title: 'Breaching the Physical Boundary',
    subtitle: 'IoT, Microcontrollers & Real-World Sensing',
    kanji: '実体 (PHYSICAL)',
    description: 'Bridged digital code with physical reality using ESP32 microcontrollers, RFID modules, and sensors. Engineered automated water monitoring and RFID access systems with real-time cloud sync.',
    technologies: ['ESP32', 'Embedded C++', 'RFID RC522', 'Ultrasonic Sensors', 'Firebase IoT', 'MQTT'],
    status: 'CONQUERED'
  },
  {
    era: 'ACT IV',
    year: 'SYNTHESIS',
    title: 'Cognitive Systems & Autonomous Agents',
    subtitle: 'Exploring LLM Orchestration & Agentic Architectures',
    kanji: '知性 (INTELLIGENCE)',
    description: 'Stepped into the frontier of generative AI. Building memory architectures, autonomous agent loops, retrieval-augmented generation pipelines, and emergency response platforms.',
    technologies: ['LLM APIs', 'Autonomous Agents', 'LangChain', 'Vector DB', 'Python', 'n8n'],
    status: 'ACTIVE'
  },
  {
    era: 'ACT V',
    year: 'BEYOND',
    title: 'Cinematic 3D & Creative Technology',
    subtitle: 'Merging WebGL, Shaders & Cybernetic UI Storytelling',
    kanji: '未来 (FUTURE)',
    description: 'Pushing the browser to its absolute graphical limits with Three.js, shaders, and micro-interactions. Transforming standard interfaces into cinematic, interactive sci-fi worlds.',
    technologies: ['Three.js', 'WebGL', 'GLSL Shaders', 'GSAP', 'Lenis', 'Creative Coding'],
    status: 'ACTIVE'
  }
];

export const RESEARCH_NODES: ResearchNode[] = [
  {
    code: 'LAB-01',
    title: 'Autonomous Multi-Agent Swarms',
    tagline: 'Collaborative agent teams with specialized roles and shared memory graphs.',
    kanji: '自律群 (SWARM)',
    status: 'EXPERIMENTING',
    readout: 'Investigating distributed consensus between agent modules for automated code reviews and multi-modal pipeline execution.',
    tags: ['Multi-Agent', 'Consensus', 'Task Decomposition']
  },
  {
    code: 'LAB-02',
    title: 'Personal 3D AI Operating Spaces',
    tagline: 'Spatial desktop interfaces merging AI context windows with 3D nodes.',
    kanji: '空間情報 (SPATIAL)',
    status: 'INTEGRATING',
    readout: 'Prototyping spatial graph representations of personal projects, notes, and agent prompts within WebGL viewports.',
    tags: ['Spatial Computing', 'Three.js', 'Knowledge Graphs']
  },
  {
    code: 'LAB-03',
    title: 'Low-Latency Edge AI on Microcontrollers',
    tagline: 'TinyML sensor inference on ESP32 without cloud dependence.',
    kanji: '組込知性 (EDGE-AI)',
    status: 'ANALYZING',
    readout: 'Benchmarking lightweight quantized neural models on dual-core ESP32 chips for real-time anomaly detection in water systems.',
    tags: ['ESP32', 'TinyML', 'Edge Computing']
  },
  {
    code: 'LAB-04',
    title: 'Kinetic Web Interfaces & Shaders',
    tagline: 'Mathematical fluid simulations and GLSL anime post-processing.',
    kanji: '数理芸術 (SHADERS)',
    status: 'EXPERIMENTING',
    readout: 'Exploring custom vertex distortion, chromatic aberration passes, and volumetric atmospheric effects in modern browsers.',
    tags: ['GLSL', 'WebGL Shaders', 'Post-Processing']
  }
];
