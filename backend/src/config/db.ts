import { Pool, PoolClient, QueryResult } from "pg";
import dotenv from "dotenv";
import { logger } from "@/utils/logger.js";

dotenv.config();

interface DatabaseConfig {
  user?: string;
  host?: string;
  password?: string;
  database?: string;
  port?: number;
  ssl?: boolean;
}

const poolConfig: DatabaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  ssl: false,
};

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(poolConfig);
    this.setupListeners();
  }

  private setupListeners(): void {
    this.pool.on("connect", () => {
      logger.info("Pool conectada à base de dados PostgreSQL");
    });

    this.pool.on("error", (err: Error) => {
      logger.error("Erro inesperado na pool de conexão", err);
      process.exit(-1);
    });
  }

  public async connect(): Promise<void> {
    try {
      const res = await this.pool.query("SELECT NOW()");
      logger.info(
        "Teste de conexão à base de dados bem-sucedido",
        res.rows[0]
      );
    } catch (err) {
      logger.error("Falha ao executar query de teste", err);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    logger.info("Encerrando pool de conexão...");
    await this.pool.end();
  }

  public async query(text: string, params?: unknown[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }

  public async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }
}

export default new Database();