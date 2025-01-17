import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

// Ensure environment variables are strongly typed
if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD || !PGPORT) {
    throw new Error('Missing required environment variables');
}

// Create a database connection
export const db: Knex = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: parseInt(PGPORT, 10), // Ensure port is a number
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: { rejectUnauthorized: false },
    },
});