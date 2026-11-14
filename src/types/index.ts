export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  subServices: string[];
  tag: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Business Websites' | 'Restaurant Websites' | 'E-commerce' | 'Landing Pages';
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  previewUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured?: boolean;
}

export interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}
