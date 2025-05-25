// server/src/db/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readFileSync } from 'fs';
import path from 'path';

export const initDB = async () => {
  const db = await open({
    filename: './src/db/database.sqlite',
    driver: sqlite3.Database,
  });

  const tables = await db.all(
    `SELECT name FROM sqlite_master WHERE type='table'`
  );
  if (tables.length === 0) {
    const schemaPath = path.resolve(__dirname, '../../schema.sql/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    await db.exec(schema);
    console.log('✅ Initialized DB with schema');
  }

  const updatedTables = await db.all(
    `SELECT name FROM sqlite_master WHERE type='table'`
  );
  console.log(
    '📋 Tables in database:',
    updatedTables.map(t => t.name)
  );

  return db;
};
