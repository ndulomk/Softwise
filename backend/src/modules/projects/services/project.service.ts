import { TCreateProjectInput, TUpdateProjectInput, createProjectSchema, updateProjectSchema } from "../schemas/project.schema.js";
import { ProjectRepository, TProjectResponse, TProjectQueryRequest } from "../types/project.types.js";
import { IFAResponseService } from "@/types/query.types.js";
import { Result, Ok, Err, AppError, ErrorFactory } from "@/utils/result.js";
import { formatZodError, formatZodErrorAndReturnArray } from "@/utils/formatZodError.js";
import { validatePaginationParamsRP } from "@/utils/validatePaginationParams.js";

const COMPONENT = "ProjectService";

type ProjectServiceDeps = {
  repository: ProjectRepository;
};

export const createProjectService = (deps: ProjectServiceDeps) => {
  const { repository } = deps;

  const service = {
    create: async (data: TCreateProjectInput): Promise<Result<string, AppError>> => {
      const validation = createProjectSchema.safeParse(data);
      if (!validation.success) {
        return Err(ErrorFactory.validation(formatZodError(validation.error), formatZodErrorAndReturnArray(validation.error), COMPONENT));
      }

      const existing = await repository.findBySlug(data.slug);
      if (existing) {
        return Err(ErrorFactory.conflict("Já existe um projeto com este slug", "slug", data.slug, COMPONENT));
      }

      const id = await repository.create(validation.data);
      return Ok(id);
    },

    findById: async (id: string): Promise<Result<TProjectResponse, AppError>> => {
      const item = await repository.findById(id);
      if (!item) {
        return Err(ErrorFactory.notFound("Projeto não encontrado", "id", id, COMPONENT));
      }
      return Ok(item);
    },

    findBySlug: async (slug: string): Promise<Result<TProjectResponse, AppError>> => {
        const item = await repository.findBySlug(slug);
        if (!item) {
          return Err(ErrorFactory.notFound("Projeto não encontrado", "slug", slug, COMPONENT));
        }
        return Ok(item);
      },

    getAll: async (query: TProjectQueryRequest): Promise<Result<IFAResponseService<TProjectResponse>, AppError>> => {
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 10;
      validatePaginationParamsRP(page, limit);

      const { data, total } = await repository.getAll(query);

      return Ok({
        data,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          total,
        },
      });
    },

    update: async (id: string, data: TUpdateProjectInput): Promise<Result<TProjectResponse, AppError>> => {
      const validation = updateProjectSchema.safeParse(data);
      if (!validation.success) {
        return Err(ErrorFactory.validation(formatZodError(validation.error), COMPONENT));
      }

      const updated = await repository.update(id, validation.data);
      if (!updated) {
        return Err(ErrorFactory.notFound("Projeto não encontrado para atualização", "id", id, COMPONENT));
      }

      return Ok(updated);
    },

    delete: async (id: string): Promise<Result<void, AppError>> => {
      const existing = await repository.findById(id);
      if (!existing) {
        return Err(ErrorFactory.notFound("Projeto não existe", "id", id, COMPONENT));
      }
      
      await repository.delete(id);
      return Ok(undefined);
    },
  };

  return service;
};