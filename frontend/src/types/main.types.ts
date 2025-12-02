import type { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
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