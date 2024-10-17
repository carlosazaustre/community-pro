import { createPool, createClient, VercelPool, VercelClient } from '@vercel/postgres';

let pool: VercelPool | null = null;
let client: VercelClient | null = null;

/**
 * Retrieves a database client, either a pooled or non-pooled connection, based on the environment variables.
 *
 * @returns {Promise<VercelPool | VercelClient>} A promise that resolves to a VercelPool or VercelClient instance.
 * @throws {Error} If no valid database connection string is provided.
 *
 * @remarks
 * - If `POSTGRES_URL` environment variable is set, a pooled connection is created and returned.
 * - If `POSTGRES_URL_NON_POOLING` environment variable is set, a non-pooled connection is created and returned.
 * - If neither environment variable is set, an error is thrown.
 */
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

/**
 * Executes a database query and returns the result as an array of type T.
 *
 * @template T - The type of the result rows.
 * @param {string} query - The SQL query to be executed.
 * @param {any[]} [params=[]] - The parameters for the SQL query.
 * @returns {Promise<T[]>} A promise that resolves to an array of result rows of type T.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const dbClient = await getDbClient();
  const result = await dbClient.query(query, params);
  return result.rows as T[];
}
