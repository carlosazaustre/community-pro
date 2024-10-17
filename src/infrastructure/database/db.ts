import { createPool, createClient, VercelPool, VercelClient } from '@vercel/postgres';

let pool: VercelPool | null = null;
let client: VercelClient | null = null;

export async function getDbClient(): Promise<VercelPool | VercelClient> {
  if (process.env.POSTGRES_URL) {
    if (!pool) {
      pool = createPool({
        connectionString: process.env.POSTGRES_URL,
      });
    }
    return pool;
  } else if (process.env.POSTGRES_URL_NON_POOLING) {
    if (!client) {
      client = createClient({
        connectionString: process.env.POSTGRES_URL_NON_POOLING,
      });
      await client.connect();
    }
    return client;
  } else {
    throw new Error('No valid database connection string provided');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const dbClient = await getDbClient();
  const result = await dbClient.query(query, params);
  return result.rows as T[];
}
