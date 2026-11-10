import React from "react"
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiSqlite,
  SiPostgresql,
  SiMongodb,
  SiFlutter,
  SiArduino,
  SiGit,
  SiGithub,
  SiDocker,
  SiBlender,
  SiFigma,
  SiVercel,
  SiC,
  SiScikitlearn
} from "react-icons/si"
import { Cpu, Terminal, Sparkles, Layers, Box, Globe } from "lucide-react"

interface TechIconProps {
  name: string
  className?: string
  size?: number
}

export function TechIcon({ name, className = "", size = 20 }: TechIconProps) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "")

  switch (normalized) {
    case "c":
      return <SiC size={size} className={className} />
    case "python":
      return <SiPython size={size} className={className} />
    case "javascript":
      return <SiJavascript size={size} className={className} />
    case "typescript":
      return <SiTypescript size={size} className={className} />
    case "react":
      return <SiReact size={size} className={className} />
    case "nextjs":
      return <SiNextdotjs size={size} className={className} />
    case "html":
    case "html5":
      return <SiHtml5 size={size} className={className} />
    case "css":
    case "css3":
      return <SiCss size={size} className={className} />
    case "tailwind":
    case "tailwindcss":
      return <SiTailwindcss size={size} className={className} />
    case "nodejs":
      return <SiNodedotjs size={size} className={className} />
    case "express":
    case "expressjs":
      return <SiExpress size={size} className={className} />
    case "fastapi":
      return <SiFastapi size={size} className={className} />
    case "firebase":
      return <SiFirebase size={size} className={className} />
    case "sqlite":
      return <SiSqlite size={size} className={className} />
    case "postgresql":
      return <SiPostgresql size={size} className={className} />
    case "mongodb":
      return <SiMongodb size={size} className={className} />
    case "flutter":
      return <SiFlutter size={size} className={className} />
    case "arduino":
    case "arduinouno":
      return <SiArduino size={size} className={className} />
    case "git":
      return <SiGit size={size} className={className} />
    case "github":
    case "githubpages":
      return <SiGithub size={size} className={className} />
    case "docker":
      return <SiDocker size={size} className={className} />
    case "blender":
      return <SiBlender size={size} className={className} />
    case "figma":
      return <SiFigma size={size} className={className} />
    case "vercel":
      return <SiVercel size={size} className={className} />
    case "scikitlearn":
      return <SiScikitlearn size={size} className={className} />
    case "openai":
    case "openaiapis":
    case "gemini":
    case "groq":
    case "langchain":
    case "xgboost":
    case "aiintegrations":
    case "aiml":
      return <Sparkles size={size} className={className} />
    case "esp32":
    case "rc522":
    case "rc522rfid":
    case "rfid":
    case "ultrasonicsensors":
    case "sensor":
      return <Cpu size={size} className={className} />
    case "capacitor":
    case "androidwebview":
      return <Layers size={size} className={className} />
    case "windowsscripting":
    case "powershell":
    case "batch":
    case "visualstudiocode":
    case "vscode":
      return <Terminal size={size} className={className} />
    case "opensearch":
    case "mapstrail":
    case "trafilatura":
    case "scrapy":
      return <Globe size={size} className={className} />
    default:
      return <Box size={size} className={className} />
  }
}
