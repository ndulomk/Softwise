import { TProjectDbRow, TProjectResponse } from "../types/project.types.js";

export function MapProjectRow(row: TProjectDbRow): TProjectResponse {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    imageUrl: row.image_url,
    tags: row.tags,
    category: row.category,
    link: row.link,
    featured: row.featured,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export class Project {
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

  constructor(data: TProjectDbRow) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.description = data.description;
    this.imageUrl = data.image_url;
    this.tags = data.tags;
    this.category = data.category;
    this.link = data.link;
    this.featured = data.featured;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  toJSON(): TProjectResponse {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      imageUrl: this.imageUrl,
      tags: this.tags,
      category: this.category,
      link: this.link,
      featured: this.featured,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}