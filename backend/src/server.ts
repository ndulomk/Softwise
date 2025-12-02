import 'dotenv/config';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { env } from '@/config/env.js';
import { logger } from './utils/logger.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; 
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { ProjectRoutes } from './modules/projects/routes/project.routes.js';
import { SeoInjectorStream } from './modules/projects/utils/seo-stream.js';
const PORT = env.PORT;
const HOST = env.HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_PATH = path.resolve(__dirname, '../public');

const server = Fastify({
  logger: env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
        },
        level: env.LOG_LEVEL,
      }
    : {
        level: env.LOG_LEVEL,
      },
});

async function buildServer(): Promise<FastifyInstance> {
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"], 
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:", "http:"], 
        connectSrc: ["'self'", "ws:", "wss:", "http:", "https:"],
      },
    },
  });

  await server.register(multipart, {
    limits: {
      fileSize: 30 * 1024 * 1024,
      files: 5,
    }
  });

  const uploadsPath = path.resolve(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    logger.info(`Diretório de uploads criado em: ${uploadsPath}`);
  }

  await server.register(fastifyStatic, {
    root: uploadsPath,
    prefix: '/uploads/', 
    decorateReply: false, 
  });


  await server.register(cors, {
    origin: env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute', 
    errorResponseBuilder: () => {
      return {
        error: {
          message: 'Too many requests, please try again later.',
          statusCode: 429,
        },
      };
    },
  });
  
  await server.register(ProjectRoutes);

  if (fs.existsSync(FRONTEND_PATH)) {
    logger.info(`Servindo frontend estático de: ${FRONTEND_PATH}`);
    
    await server.register(fastifyStatic, {
      root: FRONTEND_PATH,
      prefix: '/', 
      wildcard: false,
    });
    server.setNotFoundHandler(async (request, reply) => {
      if (request.raw.url?.startsWith('/api') || request.raw.url?.startsWith('/uploads')) {
        return reply.status(404).send({
          error: { message: 'Route not found', statusCode: 404, path: request.url },
        });
      }
      
      const indexPath = path.join(FRONTEND_PATH, 'index.html');
      
      if (!fs.existsSync(indexPath)) {
        return reply.status(404).send("Frontend build not found.");
      }
      const readStream = fs.createReadStream(indexPath);
      const seoTransform = new SeoInjectorStream(null); 
      
      reply.header('Content-Type', 'text/html');
      return reply.send(readStream.pipe(seoTransform));
    });
  } else {
    logger.warn(`Pasta PUBLIC não encontrada em ${FRONTEND_PATH}. Rode 'bun run build' no frontend.`);
  }

  return server;
}


async function start() {
  try {
    const app = await buildServer();
    await app.listen({ port: PORT as number, host: HOST });
    logger.info(`Server listening on http://${HOST}:${PORT}`);
    logger.info(`Environment: ${env.NODE_ENV}`);
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
}

const shutdown = async (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`);
  try {
    await server.close();
    logger.info('Server closed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();

export { buildServer };