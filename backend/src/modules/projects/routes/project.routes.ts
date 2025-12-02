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

fastify.get("/sitemap.xml", async (_request, reply) => {
  const projects = await service.getAll({ page: 1, limit: 10 });

  const projectUrls = projects.success
    ? projects.value.data
        .map(
          (p) => `
    <url>
      <loc>https://softwise.onrender.com/project/${p.slug}</loc>
      <lastmod>${new Date(p.updatedAt || p.createdAt)
        .toISOString()
        .split("T")[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
      ${
        p.imageUrl
          ? `
      <image:image>
        <image:loc>${p.imageUrl}</image:loc>
        <image:title>${p.title}</image:title>
      </image:image>`
          : ""
      }
    </url>`
        )
        .join("")
    : "";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://softwise.onrender.com/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${projectUrls}
</urlset>`;

  reply.type("application/xml");
  return sitemap;
});

 fastify.get("/robots.txt", async (_request, reply) => {
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /uploads/

User-agent: Googlebot
Allow: /
Crawl-delay: 0

Sitemap: https://softwise.onrender.com/sitemap.xml`;

    reply.type('text/plain');
    return robots;
  });



};