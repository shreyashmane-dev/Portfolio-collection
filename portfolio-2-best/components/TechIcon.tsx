import {
  siC,
  siCplusplus,
  siPython,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siHtml5,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siFastapi,
  siFirebase,
  siSqlite,
  siPostgresql,
  siMongodb,
  siGooglegemini,
  siLangchain,
  siScikitlearn,
  siFlutter,
  siCapacitor,
  siArduino,
  siEspressif,
  siGit,
  siGithub,
  siDocker,
  siBlender,
  siFigma,
  siVercel,
  siPytorch,
  siOpencv,
  siPrisma,
  siVite,
  siGnubash,
  siAndroid,
  siKotlin,
  siQt,
  siScrapy,
  siSqlalchemy,
  siOpensearch,
  type SimpleIcon,
} from "simple-icons";
import { Brain, Cpu, Radio, Waves, Terminal, Sparkles, Database, Globe, Map, FileSearch, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, SimpleIcon> = {
  c: siC,
  "c++": siCplusplus,
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  "next.js": siNextdotjs,
  html: siHtml5,
  css: siHtml5,
  "tailwind css": siTailwindcss,
  "node.js": siNodedotjs,
  express: siExpress,
  "express.js": siExpress,
  fastapi: siFastapi,
  firebase: siFirebase,
  sqlite: siSqlite,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  gemini: siGooglegemini,
  langchain: siLangchain,
  "scikit-learn": siScikitlearn,
  flutter: siFlutter,
  capacitor: siCapacitor,
  "arduino uno": siArduino,
  arduino: siArduino,
  esp32: siEspressif,
  git: siGit,
  github: siGithub,
  docker: siDocker,
  blender: siBlender,
  figma: siFigma,
  vercel: siVercel,
  pytorch: siPytorch,
  opencv: siOpencv,
  prisma: siPrisma,
  vite: siVite,
  batch: siGnubash,
  android: siAndroid,
  "android webview": siAndroid,
  kotlin: siKotlin,
  pyside6: siQt,
  scrapy: siScrapy,
  sqlalchemy: siSqlalchemy,
  opensearch: siOpensearch,
};

const fallbackMap: Record<string, LucideIcon> = {
  css: Globe,
  "openai apis": Brain,
  "openai integrations": Brain,
  "ai integrations": Brain,
  "ai/ml": Brain,
  "ai/ml integrations": Brain,
  groq: Sparkles,
  xgboost: Brain,
  "machine learning": Brain,
  "efficientnet-b3": Brain,
  "grad-cam": FileSearch,
  rfid: Radio,
  "rc522 rfid": Radio,
  "ultrasonic sensors": Waves,
  "hc-sr04": Waves,
  oled: Monitor,
  relay: Cpu,
  buzzer: Waves,
  websockets: Radio,
  trafilatura: FileSearch,
  mapstrail: Map,
  "windows scripting": Terminal,
  powershell: Terminal,
  "github pages": Globe,
  "vs code": Terminal,
};

export function TechIcon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const key = name.toLowerCase();
  const icon = iconMap[key];
  if (icon) {
    return (
      <svg
        role="img"
        aria-label={name}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Fallback = fallbackMap[key] ?? Cpu;
  return <Fallback size={size} aria-label={name} className={className} />;
}

export function hasTechIcon(name: string) {
  return name.toLowerCase() in iconMap;
}