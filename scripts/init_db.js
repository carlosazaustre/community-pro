import { sql } from '@vercel/postgres';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

// get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDatabase() {
  try {
    // Verify that the POSTGRES_URL environment variable is set
    if (!process.env.POSTGRES_URL) {
      throw new Error(
        'POSTGRES_URL no está configurada en las variables de entorno'
      );
    }

    // Read SQL files
    const createTablesSQL = await fs.readFile(
      join(__dirname, 'create_tables.sql'),
      'utf-8'
    );
    const seedDataSQL = await fs.readFile(
      join(__dirname, 'seed_data.sql'),
      'utf-8'
    );

    // Execute create tables script
    console.log('Creating tables...');
    await sql.query(createTablesSQL);
    console.log('Tables created successfully.');

    // Execute seed data script
    console.log('Inserting seed data...');
    await sql.query(seedDataSQL);
    console.log('Seed data inserted successfully.');

    console.log('Database initialization completed.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Cerrar la conexión
    await sql.end();
  }
}

initDatabase();
