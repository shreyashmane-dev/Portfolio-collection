// ============================================================
// EDITABLE CONTENT CONFIGURATION
// Everything personal or unconfirmed lives here. Edit freely —
// no component hardcodes identity, projects, dates or status.
// ============================================================

export const identity = {
  name: 'SHREYASH',
  fullName: 'Shreyash Mane',
  title: 'BEYOND THE CODE.',
  tagline: 'Building intelligent experiences. Exploring beyond imagination.',
  heroLine:
    'An explorer of technology, an architect of ideas, and a builder of intelligent experiences.',
  roles: [
    'CSE STUDENT',
    'SOFTWARE DEVELOPER',
    'AI ENTHUSIAST',
    'FULL-STACK DEVELOPER',
    'CREATIVE TECHNOLOGIST',
  ],
  github: 'https://github.com/shreyashmane-dev',
  linkedin: 'https://www.linkedin.com/in/shreyash-mane-7675a4385/',
  // EDIT: replace with a real contact address before publishing.
  email: 'contact@shreyashmane.dev',
  location: 'EARTH // SOL SYSTEM',
  coordinates: '19.0760° N, 72.8777° E',
}

export const about = {
  heading: 'NOT JUST A DEVELOPER. AN EXPLORER.',
  paragraphs: [
    "I'm Shreyash Mane, a Computer Science and Engineering student interested in software development, artificial intelligence, creative technology, and building useful digital experiences.",
    'I enjoy experimenting with ideas, understanding complex systems, and turning concepts into working products.',
  ],
  // EDIT: confirm / replace these entries.
  facts: [
    { label: 'EDUCATION', value: 'B.E. Computer Science & Engineering' },
    { label: 'FOCUS', value: 'AI systems · Full-stack · Creative tech' },
    { label: 'PHILOSOPHY', value: 'Understand deeply. Build deliberately.' },
    { label: 'CURRENTLY LEARNING', value: 'AI agents · 3D web · System design' },
  ],
  progression: [
    { stage: 'LV.01', label: 'CURIOUS BEGINNER', detail: 'First programs, first questions.' },
    { stage: 'LV.02', label: 'SYSTEM THINKER', detail: 'From syntax to how things work.' },
    { stage: 'LV.03', label: 'PROJECT BUILDER', detail: 'Ideas become working software.' },
    { stage: 'LV.04', label: 'AI EXPLORER', detail: 'Teaching machines to reason.' },
    { stage: 'LV.05', label: 'WORLD BUILDER', detail: 'Crafting immersive experiences.', active: true },
  ],
}

export type Skill = {
  name: string
  icon: string // simple-icons export key, or 'custom:vscode'
  level: 'CORE' | 'BUILDING' | 'EXPLORING' // EDIT: adjust to reality
  note: string
}

export const skillCategories: { id: string; label: string; jp: string; skills: Skill[] }[] = [
  {
    id: 'programming',
    label: 'PROGRAMMING',
    jp: '言語',
    skills: [
      { name: 'C', icon: 'siC', level: 'CORE', note: 'Foundations of memory, pointers and how machines actually think.' },
      { name: 'C++', icon: 'siCplusplus', level: 'CORE', note: 'Performance-oriented problem solving and DSA practice.' },
      { name: 'Python', icon: 'siPython', level: 'CORE', note: 'The workhorse for AI experiments, scripts and automation.' },
      { name: 'JavaScript', icon: 'siJavascript', level: 'CORE', note: 'The language of the interactive web.' },
      { name: 'TypeScript', icon: 'siTypescript', level: 'BUILDING', note: 'Type-safe systems for ambitious frontends.' },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    jp: '画面',
    skills: [
      { name: 'React', icon: 'siReact', level: 'CORE', note: 'Component architectures for living interfaces.' },
      { name: 'HTML', icon: 'siHtml5', level: 'CORE', note: 'Semantic structure — the skeleton of every experience.' },
      { name: 'CSS', icon: 'siCss3', level: 'CORE', note: 'Motion, layout and atmosphere without frameworks.' },
      { name: 'Tailwind CSS', icon: 'siTailwindcss', level: 'BUILDING', note: 'Rapid, consistent design systems.' },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    jp: '裏側',
    skills: [
      { name: 'Node.js', icon: 'siNodedotjs', level: 'BUILDING', note: 'Servers, APIs and realtime plumbing.' },
      { name: 'REST APIs', icon: 'siSwagger', level: 'BUILDING', note: 'Designing clean contracts between systems.' },
      { name: 'Firebase', icon: 'siFirebase', level: 'BUILDING', note: 'Auth, realtime data and fast iteration.' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & DEVELOPMENT',
    jp: '知能',
    skills: [
      { name: 'LLM APIs', icon: 'siOpenai', level: 'BUILDING', note: 'Wiring large models into useful products.' },
      { name: 'AI Agents', icon: 'siLanggraph', level: 'EXPLORING', note: 'Autonomous loops that plan, act and remember.' },
      { name: 'LangChain', icon: 'siLangchain', level: 'EXPLORING', note: 'Chains, tools and retrieval pipelines.' },
      { name: 'n8n', icon: 'siN8n', level: 'EXPLORING', note: 'Visual automation for intelligent workflows.' },
      { name: 'Vector Databases', icon: 'siPostgresql', level: 'EXPLORING', note: 'Semantic memory for AI systems.' },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    jp: '道具',
    skills: [
      { name: 'Git', icon: 'siGit', level: 'CORE', note: 'Version control as a thinking tool.' },
      { name: 'GitHub', icon: 'siGithub', level: 'CORE', note: 'Open workflows, CI and collaboration.' },
      { name: 'Docker', icon: 'siDocker', level: 'EXPLORING', note: 'Reproducible environments for every experiment.' },
      { name: 'Blender', icon: 'siBlender', level: 'EXPLORING', note: '3D assets and worlds for the interactive web.' },
      { name: 'VS Code', icon: 'custom:vscode', level: 'CORE', note: 'The cockpit where everything gets built.' },
    ],
  },
]

export type Project = {
  id: string
  index: string
  name: string
  codename: string
  category: 'AI' | 'WEB' | 'IOT' | 'TOOLS'
  // EDIT: confirm status — completed | in-development | concept
  status: 'completed' | 'in-development' | 'concept'
  description: string
  detail: string
  stack: string[]
  art: string
  accent: 'red' | 'blue'
  // EDIT: add real repository / demo URLs when public. Empty = profile link.
  repo: string
  demo: string
}

export const projects: Project[] = [
  {
    id: 'sol',
    index: '01',
    name: 'SOL',
    codename: 'PERSONAL AI OPERATING ENVIRONMENT',
    category: 'AI',
    status: 'in-development',
    description: 'A personal AI environment with a 3D interface and modular intelligence architecture.',
    detail:
      'SOL imagines the operating system as a living space: a 3D interface where modular AI capabilities orbit a central intelligence. The focus is on architecture — how memory, tools and models compose into one coherent personal environment.',
    stack: ['TypeScript', 'React', 'Three.js', 'LLM APIs'],
    art: '/assets/art-ai-core.svg',
    accent: 'blue',
    repo: '',
    demo: '',
  },
  {
    id: 'veyra',
    index: '02',
    name: 'VEYRA',
    codename: 'PERSONAL AI ASSISTANT',
    category: 'AI',
    status: 'in-development',
    description: 'A modular AI assistant with memory, conversational interaction, and extensible capabilities.',
    detail:
      'VEYRA explores what a personal assistant becomes when it remembers. Conversational core, persistent memory and a plugin-style capability system designed to grow with its user.',
    stack: ['Python', 'LLM APIs', 'Vector DB', 'LangChain'],
    art: '/assets/art-ai-core.svg',
    accent: 'red',
    repo: '',
    demo: '',
  },
  {
    id: 'emergency',
    index: '03',
    name: 'AI EMERGENCY RESPONSE ORCHESTRATOR',
    codename: 'CRISIS COORDINATION INTELLIGENCE',
    category: 'AI',
    status: 'concept',
    description: 'An intelligent emergency-response platform designed around AI-powered assistance and coordination.',
    detail:
      'A concept platform where AI assists emergency workflows: triaging signals, coordinating responders and surfacing the right information at the critical moment. Currently in the design and architecture phase.',
    stack: ['Python', 'AI Agents', 'REST APIs', 'Realtime'],
    art: '/assets/art-city-ops.svg',
    accent: 'red',
    repo: '',
    demo: '',
  },
  {
    id: 'resilience',
    index: '04',
    name: 'SMART COMMUNITY RESILIENCE PLATFORM',
    codename: 'RESOURCE & DISASTER COORDINATION',
    category: 'WEB',
    status: 'concept',
    description: 'A digital platform designed to improve community resource coordination and disaster resilience.',
    detail:
      'A concept for community-scale coordination: mapping resources, sharing status and preparing neighborhoods for disruption. Designed around clarity under pressure.',
    stack: ['React', 'Node.js', 'Firebase', 'Maps'],
    art: '/assets/art-city-ops.svg',
    accent: 'blue',
    repo: '',
    demo: '',
  },
  {
    id: 'rfid',
    index: '05',
    name: 'RFID ATTENDANCE SYSTEM',
    codename: 'EMBEDDED IDENTIFICATION UNIT',
    category: 'IOT',
    status: 'completed',
    description: 'An embedded attendance project using ESP32, RFID, and an OLED interface.',
    detail:
      'A hands-on embedded build: an ESP32 reads RFID tags, resolves identity and renders live feedback on an OLED display — bridging physical tokens and digital records.',
    stack: ['ESP32', 'RFID', 'OLED', 'C++'],
    art: '/assets/art-iot.svg',
    accent: 'blue',
    repo: '',
    demo: '',
  },
  {
    id: 'water',
    index: '06',
    name: 'ESP32 WATER MONITORING',
    codename: 'SMART LEVEL AUTOMATION',
    category: 'IOT',
    status: 'completed',
    description: 'An IoT-based water-level monitoring and automation project.',
    detail:
      'Sensor-driven water-level monitoring with automated response logic on ESP32 — a small system that watches, decides and acts without supervision.',
    stack: ['ESP32', 'Sensors', 'Automation', 'C++'],
    art: '/assets/art-iot.svg',
    accent: 'red',
    repo: '',
    demo: '',
  },
  {
    id: 'anos',
    index: '07',
    name: 'DEV TOOLS SUITE — AnoS',
    codename: 'WINDOWS DEVELOPER UTILITY SYSTEM',
    category: 'TOOLS',
    status: 'in-development',
    description: 'A Windows developer utility suite for project creation, diagnostics, GitHub workflows and package management.',
    detail:
      'AnoS consolidates the repetitive parts of development into one cockpit: scaffold projects, inspect the system, drive GitHub workflows and manage packages from a single surface.',
    stack: ['Windows', 'CLI', 'GitHub API', 'Automation'],
    art: '/assets/art-terminal.svg',
    accent: 'blue',
    repo: '',
    demo: '',
  },
]

// EDIT: periods are intentionally chapter-based — add real dates if desired.
export const journey = [
  { phase: 'PHASE 01', title: 'FIRST CONTACT', subtitle: 'Learning programming', detail: 'The first compiler errors, the first working program — curiosity becomes a habit.' },
  { phase: 'PHASE 02', title: 'DEEPER SYSTEMS', subtitle: 'Exploring computer science', detail: 'Data structures, memory, networks. Understanding what happens beneath the syntax.' },
  { phase: 'PHASE 03', title: 'PROOF OF WORK', subtitle: 'Building practical projects', detail: 'Ideas stop being notes and start being software that runs, breaks and improves.' },
  { phase: 'PHASE 04', title: 'MACHINE MINDS', subtitle: 'Exploring AI & automation', detail: 'LLMs, agents and workflows — teaching systems to reason and act.' },
  { phase: 'PHASE 05', title: 'PHYSICAL CODE', subtitle: 'IoT & embedded systems', detail: 'ESP32, sensors and actuators. Software that touches the real world.' },
  { phase: 'PHASE 06', title: 'NEW DIMENSIONS', subtitle: '3D & creative development', detail: 'Shaders, scenes and motion — the web as a place, not a page.', current: true },
]

export const exploring = [
  { code: 'RES.01', title: 'PERSONAL AI OPERATING SYSTEMS', detail: 'Environments where intelligence is the interface.', signal: 92 },
  { code: 'RES.02', title: 'AUTONOMOUS AI AGENTS', detail: 'Systems that plan, act and learn in loops.', signal: 88 },
  { code: 'RES.03', title: '3D WEB EXPERIENCES', detail: 'Realtime worlds rendered in the browser.', signal: 84 },
  { code: 'RES.04', title: 'CREATIVE CODING', detail: 'Code as a medium for visual expression.', signal: 78 },
  { code: 'RES.05', title: 'EMBEDDED SYSTEMS', detail: 'Intelligence pressed into silicon.', signal: 72 },
  { code: 'RES.06', title: 'HUMAN-COMPUTER INTERACTION', detail: 'How interfaces disappear into intuition.', signal: 80 },
]

export const nav = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'contact', label: 'CONTACT' },
]