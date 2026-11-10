export const site = {
  name: "Shreyash Mane",
  title: "Computer Science & Engineering Student",
  college: "D.Y. Patil College of Engineering, Kolhapur",
  university: "Shivaji University, Kolhapur",
  location: "Maharashtra, India",
  email: "shreyashmane649@gmail.com",
  github: "https://github.com/shreyashmane-dev",
  linkedin: "https://www.linkedin.com/in/shreyashmane-7675a4385",
  intro: [
    "I build practical software products, AI-powered applications, developer tools, intelligent automation systems, and hardware-integrated solutions.",
    "I explore modern technologies, design complete software architectures, and turn ideas into functional applications.",
  ],
  interests: ["AI/ML", "Full-Stack Development", "Automation", "Software Engineering", "IoT", "3D Development"],
  academics: {
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    institution: "D.Y. Patil College of Engineering, Kolhapur",
    university: "Shivaji University",
    focus: ["Programming", "Computer Networks", "Object-Oriented Concepts", "AI/ML", "Software Development"],
    learning: ["Full-stack engineering", "AI agents", "Cloud technologies", "IoT", "System architecture"],
  },
  career: [
    "AI Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Machine Learning Engineer",
    "AI Agent Developer",
    "IoT Developer",
    "Developer Tools Engineer",
  ],
} as const;

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: "Programming", items: ["C", "Python", "JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI"] },
  { category: "Databases", items: ["Firebase", "SQLite", "PostgreSQL", "MongoDB"] },
  { category: "AI/ML", items: ["Gemini", "OpenAI APIs", "Groq", "LangChain", "Scikit-learn", "XGBoost"] },
  { category: "Mobile Development", items: ["Capacitor", "Flutter"] },
  { category: "Hardware & IoT", items: ["ESP32", "Arduino UNO", "RFID", "Ultrasonic Sensors"] },
  { category: "Development Tools", items: ["Git", "GitHub", "Docker", "VS Code"] },
  { category: "Design & 3D", items: ["Blender", "Figma"] },
  { category: "Deployment", items: ["Vercel", "GitHub Pages"] },
];

export interface HardwareProject {
  name: string;
  components: string[];
  purpose: string;
}

export const hardwareProjects: HardwareProject[] = [
  {
    name: "RFID Attendance System",
    components: ["ESP32", "RC522", "OLED"],
    purpose: "RFID-based attendance recording.",
  },
  {
    name: "Smart Water-Level Monitoring",
    components: ["ESP32", "HC-SR04", "OLED", "Relay", "Buzzer"],
    purpose: "Water-level monitoring and pump-control experimentation.",
  },
  {
    name: "Smart Classroom System",
    components: ["Arduino UNO", "Dual RC522 readers"],
    purpose: "Attendance and emergency headcount management.",
  },
];

export const contentLabels = [
  "AI & Machine Learning",
  "Full-Stack Development",
  "Developer Tools",
  "Mobile Applications",
  "IoT & Hardware",
  "Research & Experiments",
  "Academic Projects",
  "Open Source & Learning",
] as const;

export type ContentLabel = (typeof contentLabels)[number];