import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import { AccountDetails } from '../account/create/accountUtils';

config({ path: '.env' });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

export async function createTable(tableName: string, params: string[]): Promise<string> {
  const createTableSQL = sql`
    CREATE TABLE IF NOT EXISTS ${sql.identifier(tableName)} (
      ${sql.join(
        params.map(param => sql`${sql.identifier(param)} TEXT`),
        sql`, `
      )}
    )
  `;

  await db.execute(createTableSQL);
  return tableName;
}

export function pushAccountToDatabase(accountDetails: AccountDetails) {
    const paramsDB = ["name", "email", "password"];
    const valuesDB = [accountDetails.name, accountDetails.email, accountDetails.password];

    createTable("accounts", paramsDB).then((table: any) => {
      const query = `INSERT INTO ${table} (${paramsDB.join(", ")}) VALUES (${valuesDB.map((value) => `'${value}'`).join(", ")})`;
      console.log(query);
    });
  }
