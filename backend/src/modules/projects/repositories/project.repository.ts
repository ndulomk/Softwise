import { constants } from "fs";
import { access, readFile, writeFile } from "fs/promises";
import path from "path";
import { TCreateProjectInput, TUpdateProjectInput } from "../schemas/project.schema.js";
import { ProjectRepository, TProjectDbRow, TProjectResponse, TProjectQueryRequest } from "../types/project.types.js";
import { MapProjectRow } from "../models/project.model.js";

const DB_PATH = path.resolve(process.cwd(), "data", "projects.json");

const ensureDbExists = async () => {
  try {
    await access(DB_PATH, constants.F_OK);
  } catch {
    await writeFile(DB_PATH, JSON.stringify([]));
  }
};

// Helper IO de Leitura
const readDb = async (): Promise<TProjectDbRow[]> => {
  await ensureDbExists();
  const fileContent = await readFile(DB_PATH, "utf-8");
  return JSON.parse(fileContent) as TProjectDbRow[];
};

// Helper IO de Escrita
const writeDb = async (data: TProjectDbRow[]) => {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

export const createProjectRepository = (): ProjectRepository => {
  const repo = {
    create: async (data: TCreateProjectInput): Promise<string> => {
      const projects = await readDb();
      const newId = crypto.randomUUID();
      
      const newProject: TProjectDbRow = {
        id: newId,
        title: data.title,
        slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        tags: data.tags,
        category: data.category,
        link: data.link,
        featured: data.featured,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      projects.push(newProject);
      await writeDb(projects);
      
      return newId;
    },

    findById: async (id: string): Promise<TProjectResponse | null> => {
      const projects = await readDb();
      const project = projects.find((p) => p.id === id);
      return project ? MapProjectRow(project) : null;
    },

    findBySlug: async (slug: string): Promise<TProjectResponse | null> => {
      const projects = await readDb();
      const project = projects.find((p) => p.slug === slug);
      return project ? MapProjectRow(project) : null;
    },

    getAll: async ({
      page = 1,
      limit = 10,
      search,
      category,
      featured,
    }: TProjectQueryRequest): Promise<{ data: TProjectResponse[]; total: number }> => {
      let projects = await readDb();

      if (category) {
        projects = projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (featured) {
        const isFeatured = featured === 'true';
        projects = projects.filter((p) => p.featured === isFeatured);
      }
      if (search) {
        const lowerSearch = search.toLowerCase();
        projects = projects.filter(
          (p) => 
            p.title.toLowerCase().includes(lowerSearch) || 
            p.description.toLowerCase().includes(lowerSearch) ||
            p.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
        );
      }

      projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const total = projects.length;
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedProjects = projects.slice(startIndex, endIndex);

      return { data: paginatedProjects.map(MapProjectRow), total };
    },

    update: async (id: string, data: TUpdateProjectInput): Promise<TProjectResponse | null> => {
      const projects = await readDb();
      const index = projects.findIndex((p) => p.id === id);
      
      if (index === -1) return null;

      const current = projects[index];
      if(!current){
        return null
      }
      const updated = {
        ...current,
        title: data.title ?? current.title,
        slug: data.slug ?? current.slug,
        description: data.description ?? current.description,
        image_url: data.imageUrl ?? current.image_url,
        tags: data.tags ?? current.tags,
        category: data.category ?? current.category,
        link: data.link ?? current.link,
        featured: data.featured ?? current.featured,
        updated_at: new Date().toISOString(),
      };

      projects[index] = updated;
      await writeDb(projects);
      
      return MapProjectRow(updated);
    },

    delete: async (id: string): Promise<void> => {
      let projects = await readDb();
      projects = projects.filter((p) => p.id !== id);
      await writeDb(projects);
    },
  };

  return repo;
};