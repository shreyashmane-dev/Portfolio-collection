export type ThemeMode = 'void' | 'paper';

export type ArchiveCategory =
  | 'All Projects'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Cybersecurity'
  | 'Web Applications'
  | 'Mobile Applications'
  | 'Developer Tools'
  | 'Systems Engineering'
  | 'IoT & Hardware'
  | 'Academic & Experiments'
  | 'Research & Experimental';

export type RankFilter = 'All' | 'Top 10' | '11–20' | '21–30' | '31–44';

export type ProjectStatus = 'COMPLETED' | 'IN DEVELOPMENT' | 'EXPERIMENTAL' | 'DOCUMENTATION';

export interface ProjectItem {
  id: string;
  rank: number;
  number: string;
  title: string;
  codeName: string;
  category: ArchiveCategory;
  status: ProjectStatus;
  tagline: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  architectureDetails: string[];
  features?: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  missionNumber: string;
  kanjiTitle: string;
  accentColor: string;
  visualStyle: 'cinematic' | 'terminal' | 'cyber' | 'minimal' | 'hardware' | 'glass';
  featured: boolean; // true for Top 10
}

export type SkillCategory = 'PROGRAMMING' | 'FRONTEND' | 'BACKEND' | 'AI & DEVELOPMENT' | 'TOOLS';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  level: string;
  iconSlug?: string;
  description: string;
  highlights: string[];
}

export interface JourneyMilestone {
  era: string;
  year: string;
  title: string;
  subtitle: string;
  kanji: string;
  description: string;
  technologies: string[];
  status: 'ACTIVE' | 'CONQUERED';
}

export interface ResearchNode {
  code: string;
  title: string;
  tagline: string;
  kanji: string;
  status: 'ANALYZING' | 'EXPERIMENTING' | 'INTEGRATING';
  readout: string;
  tags: string[];
}
