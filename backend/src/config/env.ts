import 'dotenv/config';
import { z } from 'zod';
import process from 'process';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.string().default('info'),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.format(),
  );
  process.exit(1);
}

export const config = parsedEnv.data; 
export const env = parsedEnv.data;