export type Status = "completed" | "in-progress" | "experimental" | "planned"

export type Label =
  | "AI & Machine Learning"
  | "Full-Stack Development"
  | "Developer Tools"
  | "Mobile Applications"
  | "IoT & Hardware"
  | "Research & Experiments"
  | "Academic Projects"
  | "Open Source & Learning"

export type Project = {
  rank: number
  slug: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  repo: string
  labels: Label[]
  status: Status
  docsNeeded: boolean
  screenshot?: string
  featured: boolean
  ownershipNote?: string
}

export const projects: Project[] = [
  {
    rank: 1,
    slug: "omsearch",
    title: "OmSearch",
    subtitle: "Independent Search Engine",
    description: "A search engine project focused on crawling, indexing, information retrieval, ranking, and search result evaluation.",
    tech: ["Python", "FastAPI", "OpenSearch", "PostgreSQL", "SQLAlchemy", "Scrapy", "Trafilatura"],
    repo: "https://github.com/shreyashmane-dev/OmSearch",
    labels: ["Developer Tools", "Full-Stack Development"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 2,
    slug: "nexyris",
    title: "Nexyris",
    subtitle: "Portable Local AI Studio",
    description: "A concept and application for running AI models locally through a portable environment.",
    tech: ["React", "Vite", "Node.js", "Express"],
    repo: "https://github.com/shreyashmane-dev/Nexyris",
    labels: ["AI & Machine Learning", "Developer Tools"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 3,
    slug: "securecode-ai",
    title: "SecureCode AI",
    subtitle: "AI-Powered Code Security Platform",
    description: "A security-focused application with authentication, code scanning, file uploads, and report management.",
    tech: ["Python", "FastAPI", "Firebase", "AI integrations"],
    repo: "https://github.com/shreyashmane-dev/Secure-codeb-AI",
    labels: ["AI & Machine Learning", "Developer Tools"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 4,
    slug: "drishti-ai",
    title: "Drishti AI",
    subtitle: "AI Retinal Analysis Platform",
    description: "A computer-vision project exploring retinal image analysis, model explainability, and visual interpretation.",
    tech: ["Python", "PyTorch", "EfficientNet-B3", "Grad-CAM", "OpenCV"],
    repo: "https://github.com/shreyashmane-dev/Drishti-AI",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 5,
    slug: "kisandirect",
    title: "KisanDirect",
    subtitle: "Farmer-to-Buyer Agricultural Marketplace",
    description: "A platform concept connecting farmers and buyers with marketplace, price recommendations, demand forecasting, and crop-quality analysis features.",
    tech: ["Next.js", "React", "Prisma", "Firebase", "AI/ML integrations"],
    repo: "https://github.com/shreyashmane-dev/krushi-direct",
    labels: ["Full-Stack Development", "AI & Machine Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 6,
    slug: "zynth-browser",
    title: "Zynth Browser",
    subtitle: "Android Web Browser",
    description: "A mobile browser project with WebView browsing, bookmarks, search integration, and privacy-oriented features.",
    tech: ["Flutter", "Android WebView", "SQLite"],
    repo: "https://github.com/shreyashmane-dev/zynth-browser",
    labels: ["Mobile Applications", "Developer Tools"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 7,
    slug: "anos-dev-tools-suite",
    title: "AnoS — DEV Tools Suite",
    subtitle: "Windows Developer Utility Suite",
    description: "A collection of developer utilities for project creation, system diagnostics, GitHub workflows, package management, and development setup.",
    tech: ["Windows scripting", "PowerShell", "Batch", "Git", "GitHub"],
    repo: "https://github.com/shreyashmane-dev/dev-tools-suite",
    labels: ["Developer Tools"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 8,
    slug: "anything",
    title: "Anything",
    subtitle: "Smart Classroom Attendance System",
    description: "An RFID-based classroom attendance and emergency management project with desktop software and attendance records.",
    tech: ["Arduino UNO", "RC522 RFID", "Python", "PySide6", "SQLite", "WebSockets"],
    repo: "https://github.com/shreyashmane-dev/Anything",
    labels: ["IoT & Hardware", "Academic Projects"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 9,
    slug: "first-aid",
    title: "First-Aid",
    subtitle: "AI-Powered Emergency Assistance Platform",
    description: "An emergency assistance concept featuring AI-based triage, health context, hospital discovery, and multiple user roles.",
    tech: ["Gemini", "OpenAI integrations", "Firebase", "MapsTrail", "React"],
    repo: "https://github.com/shreyashmane-dev/First-Aid",
    labels: ["AI & Machine Learning", "Full-Stack Development"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 10,
    slug: "lumora",
    title: "Lumora",
    subtitle: "AI Writing Intelligence Platform",
    description: "A writing analysis and assistance platform exploring AI-text detection, rewriting, and stylometric analysis.",
    tech: ["Python", "FastAPI", "Next.js", "AI/ML"],
    repo: "https://github.com/shreyashmane-dev/Lumora",
    labels: ["AI & Machine Learning", "Full-Stack Development"],
    status: "experimental",
    docsNeeded: false,
    featured: true
  },
  {
    rank: 11,
    slug: "securepay-ai",
    title: "SecurePay-AI",
    subtitle: "FinTech / AI",
    description: "UPI fraud detection using machine learning, anomaly detection, and graph analysis.",
    tech: ["Python", "Scikit-learn", "XGBoost"],
    repo: "https://github.com/shreyashmane-dev/SecurePay-AI",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 12,
    slug: "xai-governance-platform-m",
    title: "Xai-governance-platform_M",
    subtitle: "AI Governance",
    description: "Model explainability, evaluation, monitoring, and governance platform.",
    tech: ["Python", "FastAPI", "React"],
    repo: "https://github.com/shreyashmane-dev/Xai-governance-platform_M",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 13,
    slug: "lifeos",
    title: "LifeOS",
    subtitle: "Productivity / AI",
    description: "Personal operating environment project.",
    tech: ["TypeScript", "React"],
    repo: "https://github.com/shreyashmane-dev/LifeOS",
    labels: ["Developer Tools", "Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 14,
    slug: "messmate",
    title: "MessMate",
    subtitle: "Marketplace",
    description: "Platform connecting students with mess owners.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/shreyashmane-dev/MessMate",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 15,
    slug: "smart-library-management-system",
    title: "Smart-Library-Management-System",
    subtitle: "Education",
    description: "Library management system.",
    tech: ["Python", "SQLite"],
    repo: "https://github.com/shreyashmane-dev/Smart-Library-Management-System",
    labels: ["Academic Projects", "Developer Tools"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 16,
    slug: "virehire-ai",
    title: "VireHire-AI",
    subtitle: "HR / AI",
    description: "Recruitment fraud intelligence and job scam monitoring concept.",
    tech: ["Python", "AI/ML"],
    repo: "https://github.com/shreyashmane-dev/VireHire-AI",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 17,
    slug: "electos-ai-civic",
    title: "ElectOS-Ai-Civic",
    subtitle: "Civic Technology",
    description: "AI-powered civic technology project.",
    tech: ["Python", "FastAPI"],
    repo: "https://github.com/shreyashmane-dev/ElectOS-Ai-Civic",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 18,
    slug: "synapse-messenger",
    title: "Synapse_Messenger",
    subtitle: "Communication",
    description: "Real-time messaging application with AI-related capabilities.",
    tech: ["React", "Node.js", "WebSockets"],
    repo: "https://github.com/shreyashmane-dev/Synapse_Messenger",
    labels: ["Full-Stack Development", "AI & Machine Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 19,
    slug: "windcast-ai",
    title: "WindCast-AI",
    subtitle: "AI / Renewable Energy",
    description: "Wind power forecasting using machine learning models.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    repo: "https://github.com/shreyashmane-dev/WindCast-AI",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 20,
    slug: "secure-focus-app",
    title: "Secure-Focus-App",
    subtitle: "Productivity / Security",
    description: "Focus-oriented application.",
    tech: ["JavaScript", "Electron"],
    repo: "https://github.com/shreyashmane-dev/Secure-Focus-App",
    labels: ["Developer Tools"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 21,
    slug: "veyra",
    title: "Veyra",
    subtitle: "Personal AI",
    description: "Terminal-based personal assistant with SQLite memory and modular architecture.",
    tech: ["Python", "SQLite"],
    repo: "https://github.com/shreyashmane-dev/Veyra",
    labels: ["AI & Machine Learning", "Developer Tools"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 22,
    slug: "maharesilience",
    title: "MahaResilience",
    subtitle: "Disaster Management",
    description: "Disaster resilience and community support project.",
    tech: ["React", "Firebase"],
    repo: "https://github.com/shreyashmane-dev/MahaResilience",
    labels: ["Full-Stack Development", "Research & Experiments"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 23,
    slug: "reliefsync",
    title: "ReliefSync",
    subtitle: "Disaster Management",
    description: "Relief coordination project.",
    tech: ["React", "Firebase"],
    repo: "https://github.com/shreyashmane-dev/ReliefSync",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 24,
    slug: "windcast-ai-mini-model",
    title: "WindCast-AI-MINI-MODEL",
    subtitle: "AI / Renewable Energy",
    description: "Smaller wind forecasting model project.",
    tech: ["Python", "Scikit-learn"],
    repo: "https://github.com/shreyashmane-dev/WindCast-AI-MINI-MODEL",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 25,
    slug: "xai-governance-platform",
    title: "Xai-governance-platform",
    subtitle: "AI Governance",
    description: "Explainable AI and model governance project.",
    tech: ["Python", "Scikit-learn"],
    repo: "https://github.com/shreyashmane-dev/Xai-governance-platform",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 26,
    slug: "aivora-web",
    title: "aivora-web",
    subtitle: "Web Development",
    description: "Aivora web application.",
    tech: ["React", "TypeScript"],
    repo: "https://github.com/shreyashmane-dev/aivora-web",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 27,
    slug: "expense-tacker-web",
    title: "Expense-tacker-web",
    subtitle: "Finance",
    description: "Web-based expense tracking application.",
    tech: ["React", "JavaScript", "CSS"],
    repo: "https://github.com/shreyashmane-dev/Expense-tacker-web",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 28,
    slug: "expense-tacker-capacitor-app",
    title: "Expense-tacker-capacitor-app",
    subtitle: "Mobile / Finance",
    description: "Capacitor-based mobile expense tracker.",
    tech: ["Capacitor", "React", "JavaScript"],
    repo: "https://github.com/shreyashmane-dev/Expense-tacker-capacitor-app",
    labels: ["Mobile Applications"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 29,
    slug: "aivora-capacitor-app",
    title: "aivora-capacitor-app",
    subtitle: "Mobile Development",
    description: "Capacitor-based Aivora application.",
    tech: ["Capacitor", "React", "TypeScript"],
    repo: "https://github.com/shreyashmane-dev/aivora-capacitor-app",
    labels: ["Mobile Applications"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 30,
    slug: "memora",
    title: "Memora",
    subtitle: "Web Development",
    description: "Web application project.",
    tech: ["React", "Node.js"],
    repo: "https://github.com/shreyashmane-dev/Memora",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 31,
    slug: "mimora",
    title: "Mimora",
    subtitle: "Web Development",
    description: "Application project.",
    tech: ["React", "Node.js"],
    repo: "https://github.com/shreyashmane-dev/Mimora",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 32,
    slug: "trained-models",
    title: "Trained-Models",
    subtitle: "Machine Learning",
    description: "Repository for trained model assets.",
    tech: ["Python", "PyTorch", "Scikit-learn"],
    repo: "https://github.com/shreyashmane-dev/Trained-Models",
    labels: ["AI & Machine Learning", "Research & Experiments"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 33,
    slug: "computer-networks-lab",
    title: "computer-networks-lab",
    subtitle: "Academics",
    description: "Computer Networks laboratory programs.",
    tech: ["C", "Networking Protocols"],
    repo: "https://github.com/shreyashmane-dev/computer-networks-lab",
    labels: ["Academic Projects"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 34,
    slug: "ooc-lab",
    title: "OOC-lab",
    subtitle: "Academics",
    description: "Object-Oriented Concepts laboratory programs.",
    tech: ["C++", "OOP"],
    repo: "https://github.com/shreyashmane-dev/OOC-lab",
    labels: ["Academic Projects"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 35,
    slug: "c-programs",
    title: "C-Programs",
    subtitle: "Programming",
    description: "C language programs and practice.",
    tech: ["C"],
    repo: "https://github.com/shreyashmane-dev/C-Programs",
    labels: ["Academic Projects", "Open Source & Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 36,
    slug: "c-lab",
    title: "C-lab",
    subtitle: "Academics",
    description: "C programming laboratory work.",
    tech: ["C"],
    repo: "https://github.com/shreyashmane-dev/C-lab",
    labels: ["Academic Projects"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 37,
    slug: "recordly",
    title: "Recordly",
    subtitle: "Media / Software",
    description: "Screen recording and editing project; ownership and contribution need verification.",
    tech: ["TypeScript", "Electron", "React"],
    repo: "https://github.com/shreyashmane-dev/Recordly",
    labels: ["Developer Tools"],
    status: "experimental",
    docsNeeded: true,
    featured: false,
    ownershipNote: "Ownership under verification. Not presented as original work without independent verification."
  },
  {
    rank: 38,
    slug: "devtrack-ai",
    title: "DevTrack-AI",
    subtitle: "Developer Tools / AI",
    description: "Developer tracking and AI-related project.",
    tech: ["Python", "FastAPI"],
    repo: "https://github.com/shreyashmane-dev/DevTrack-AI",
    labels: ["Developer Tools", "AI & Machine Learning"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 39,
    slug: "baisgaurd-xi",
    title: "BaisGaurd-XI",
    subtitle: "Software Development",
    description: "Application repository; detailed project description unavailable.",
    tech: ["Python"],
    repo: "https://github.com/shreyashmane-dev/BaisGaurd-XI",
    labels: ["Developer Tools"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 40,
    slug: "kashid-snacks",
    title: "Kashid_Snacks",
    subtitle: "Web Development",
    description: "Website/application project.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/shreyashmane-dev/Kashid_Snacks",
    labels: ["Full-Stack Development"],
    status: "experimental",
    docsNeeded: true,
    featured: false
  },
  {
    rank: 41,
    slug: "react-practice",
    title: "react-practice",
    subtitle: "Learning",
    description: "React practice and experiments.",
    tech: ["React", "JavaScript"],
    repo: "https://github.com/shreyashmane-dev/react-practice",
    labels: ["Open Source & Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 42,
    slug: "skills-introduction-to-github",
    title: "skills-introduction-to-github",
    subtitle: "Learning",
    description: "GitHub learning exercises.",
    tech: ["Git", "GitHub"],
    repo: "https://github.com/shreyashmane-dev/skills-introduction-to-github",
    labels: ["Open Source & Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  },
  {
    rank: 43,
    slug: "repopulse",
    title: "RepoPulse",
    subtitle: "Developer Automation",
    description: "GitHub activity and documentation automation.",
    tech: ["Python", "GitHub API"],
    repo: "https://github.com/shreyashmane-dev/RepoPulse",
    labels: ["Developer Tools", "Open Source & Learning"],
    status: "experimental",
    docsNeeded: false,
    featured: false
  }
]

export const filterLabels: (Label | "All")[] = [
  "All",
  "AI & Machine Learning",
  "Full-Stack Development",
  "Developer Tools",
  "Mobile Applications",
  "IoT & Hardware",
  "Research & Experiments",
  "Academic Projects",
  "Open Source & Learning"
]
