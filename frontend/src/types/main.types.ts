import type { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  metrics?: {
    [key: string]: string;
  };
}

export interface SoftwiseLogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export interface BrutalButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
  icon?: LucideIcon;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface BrutalInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
}

export interface SelectChipProps {
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export interface FormDataState {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
}


export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

// Service Types
export interface Service {
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

export interface TechStack {
  name: string;
  icon: LucideIcon;
  desc: string;
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'design';
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export interface Stats {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
  }
}

export {};