import { TCreateProjectInput, TUpdateProjectInput } from "../schemas/project.schema.js";
import { TQueryRequest } from "@/types/query.types.js";
import { Result, AppError } from "@/utils/result.js";
import { IFAResponseService } from "@/types/query.types.js";

export type TProjectDbRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string; 
  tags: string[];
  category: string;
  link?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type TProjectResponse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  link?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TProjectQueryRequest = TQueryRequest & {
  category?: string;
  featured?: string; // 'true' | 'false'
};

export type ProjectRepository = {
  create: (data: TCreateProjectInput) => Promise<string>;
  findById: (id: string) => Promise<TProjectResponse | null>;
  findBySlug: (slug: string) => Promise<TProjectResponse | null>;
  getAll: (params: TProjectQueryRequest) => Promise<{ data: TProjectResponse[]; total: number }>;
  update: (id: string, data: TUpdateProjectInput) => Promise<TProjectResponse | null>;
  delete: (id: string) => Promise<void>;
};

export type ProjectService = {
  create: (data: TCreateProjectInput) => Promise<Result<string, AppError>>;
  findById: (id: string) => Promise<Result<TProjectResponse, AppError>>;
  findBySlug: (slug: string) => Promise<Result<TProjectResponse, AppError>>;
  getAll: (query: TProjectQueryRequest) => Promise<Result<IFAResponseService<TProjectResponse>, AppError>>;
  update: (id: string, data: TUpdateProjectInput) => Promise<Result<TProjectResponse, AppError>>;
  delete: (id: string) => Promise<Result<void, AppError>>;
};