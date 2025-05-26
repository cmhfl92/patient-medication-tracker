// scripts/seed-patients.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { faker } from '@faker-js/faker';

async function seedPatients(count = 1000) {
  const db = await open({
    filename: './src/db/database.sqlite',
    driver: sqlite3.Database,
  });

  console.log(`Seeding ${count} patients...`);

  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const dob = faker.date
      .birthdate({ min: 1940, max: 2005, mode: 'year' })
      .toISOString()
      .split('T')[0];
    const email = faker.internet.email({
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
    });

    await db.run('INSERT INTO patients (name, dob, email) VALUES (?, ?, ?)', [
      name,
      dob,
      email,
    ]);
  }

  console.log('✅ Done seeding!');
}

seedPatients().catch(console.error);
