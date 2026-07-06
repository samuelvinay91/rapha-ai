export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  color: string;
  href: string;
  tags: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  year: string;
}

export type CursorVariant = 'default' | 'hover' | 'project' | 'drag' | 'explore' | 'hide';

export interface CursorContextProps {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}
