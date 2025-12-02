import { FastifyInstance, FastifyPluginAsync } from "fastify";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { createProjectRepository } from "../repositories/project.repository.js";
import { createProjectService } from "../services/project.service.js";
import { createProjectController } from "../controllers/project.controller.js";
import { SeoInjectorStream } from "../utils/seo-stream.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_PATH = path.resolve(__dirname, '../../../../public');

export const ProjectRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

  const repository = createProjectRepository();
  const service = createProjectService({ repository });
  const controller = createProjectController({ service });

  const API_PREFIX = "/api/v1/projects";

  // Rotas CRUD
  fastify.post(API_PREFIX, controller.create);
  fastify.get(API_PREFIX, controller.getAll);
  fastify.get(`${API_PREFIX}/:id`, controller.getById);
  fastify.put(`${API_PREFIX}/:id`, controller.update);
  fastify.delete(`${API_PREFIX}/:id`, controller.delete);

  fastify.get("/project/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    
    const result = await service.findBySlug(slug);
    const projectData = result.success ? result.value : null;
    
    const indexPath = path.join(FRONTEND_PATH, "index.html");
    
    if (!fs.existsSync(indexPath)) {
       return reply.status(500).send("Frontend build not found. Run bun run build.");
    }

    const readStream = fs.createReadStream(indexPath);
    const seoTransform = new SeoInjectorStream(projectData);

    reply.header('Content-Type', 'text/html');
    return reply.send(readStream.pipe(seoTransform));
  });

};