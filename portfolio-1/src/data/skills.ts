export interface SkillCategory {
  name: string
  skills: {
    name: string
    iconKey: string
  }[]
}

export const skillsData: SkillCategory[] = [
  {
    name: "Programming",
    skills: [
      { name: "C", iconKey: "c" },
      { name: "Python", iconKey: "python" },
      { name: "JavaScript", iconKey: "javascript" },
      { name: "TypeScript", iconKey: "typescript" }
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", iconKey: "react" },
      { name: "Next.js", iconKey: "nextdotjs" },
      { name: "HTML", iconKey: "html5" },
      { name: "CSS", iconKey: "css3" },
      { name: "Tailwind CSS", iconKey: "tailwindcss" }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", iconKey: "nodedotjs" },
      { name: "Express.js", iconKey: "express" },
      { name: "FastAPI", iconKey: "fastapi" }
    ]
  },
  {
    name: "Databases",
    skills: [
      { name: "Firebase", iconKey: "firebase" },
      { name: "SQLite", iconKey: "sqlite" },
      { name: "PostgreSQL", iconKey: "postgresql" },
      { name: "MongoDB", iconKey: "mongodb" }
    ]
  },
  {
    name: "AI & Machine Learning",
    skills: [
      { name: "Gemini", iconKey: "googlegemini" },
      { name: "OpenAI APIs", iconKey: "openai" },
      { name: "Groq", iconKey: "groq" },
      { name: "LangChain", iconKey: "langchain" },
      { name: "Scikit-learn", iconKey: "scikitlearn" },
      { name: "XGBoost", iconKey: "xgboost" }
    ]
  },
  {
    name: "Mobile Development",
    skills: [
      { name: "Capacitor", iconKey: "capacitor" },
      { name: "Flutter", iconKey: "flutter" }
    ]
  },
  {
    name: "Hardware & IoT",
    skills: [
      { name: "ESP32", iconKey: "espressif" },
      { name: "Arduino UNO", iconKey: "arduino" },
      { name: "RFID", iconKey: "rfid" },
      { name: "Ultrasonic Sensors", iconKey: "sensor" }
    ]
  },
  {
    name: "Development Tools",
    skills: [
      { name: "Git", iconKey: "git" },
      { name: "GitHub", iconKey: "github" },
      { name: "Docker", iconKey: "docker" },
      { name: "VS Code", iconKey: "visualstudiocode" }
    ]
  },
  {
    name: "Design & 3D",
    skills: [
      { name: "Blender", iconKey: "blender" },
      { name: "Figma", iconKey: "figma" }
    ]
  },
  {
    name: "Deployment",
    skills: [
      { name: "Vercel", iconKey: "vercel" },
      { name: "GitHub Pages", iconKey: "githubpages" }
    ]
  }
]

export const skillsNote = "Based on technologies used across projects; proficiency levels have not been independently assessed."
