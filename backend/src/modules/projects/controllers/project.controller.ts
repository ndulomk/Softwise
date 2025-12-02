import { FastifyRequest } from "fastify";
import { TCreateProjectInput, TUpdateProjectInput } from "../schemas/project.schema.js";
import { createProjectService } from "../services/project.service.js";
import { TProjectQueryRequest } from "../types/project.types.js";
import { Ok } from "@/utils/result.js";
import { handler } from "@/utils/handler.js";

type ControllerDeps = {
    service: ReturnType<typeof createProjectService>;
}

export const createProjectController = ({ service }: ControllerDeps) => ({
  create: handler(async (request: FastifyRequest<{ Body: TCreateProjectInput }>, reply) => {
    const result = await service.create(request.body);

    if (result.success) {
      reply.code(201);
      return Ok({
        status: "success",
        message: "Projeto adicionado ao portfólio",
        data: { id: result.value },
      });
    }
    return result;
  }),

  getAll: handler(async (request: FastifyRequest<{ Querystring: TProjectQueryRequest }>) => {
    const result = await service.getAll(request.query);

    if (result.success) {
      return Ok({
        status: "success",
        ...result.value,
      });
    }
    return result;
  }),

  getById: handler(async (request: FastifyRequest<{ Params: { id: string } }>) => {
    const result = await service.findById(request.params.id);
    if (result.success) {
        return Ok({ status: "success", data: result.value });
    }
    return result;
  }),

  update: handler(async (request: FastifyRequest<{ Params: { id: string }; Body: TUpdateProjectInput }>) => {
    const result = await service.update(request.params.id, request.body);
    if (result.success) {
      return Ok({ status: "success", message: "Projeto atualizado", data: result.value });
    }
    return result;
  }),

  delete: handler(async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const result = await service.delete(request.params.id);
    if (result.success) {
      reply.code(204);
      return Ok({ status: "success", message: "Projeto removido" });
    }
    return result;
  }),
});