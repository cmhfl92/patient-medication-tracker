import { Request, Response } from 'express';
import { initDB } from '../src/db/db';

async function listPatients(req: Request, res: Response) {
  const db = await initDB();
  const patients = await db.all('SELECT * FROM patients');
  res.json(patients);
}

async function getPatientById(req: Request, res: Response) {
  const db = await initDB();
  const id = parseInt(req.params.id, 10);
  const patient = await db.get('SELECT * FROM patients WHERE id = ?', [id]);

  if (!patient) {
    const err = new Error('Patient Not found');
    //@ts-ignore
    err.status = 404;
    throw err;
  }
  res.json(patient);
}

async function createPatient(req: Request, res: Response) {
  const db = await initDB();
  const { name, dob, email } = req.body;

  if (!name || typeof name !== 'string') {
    const err = new Error('Name is required!');
    //@ts-ignore
    err.status = 400;
    throw err;
  }
  if (!dob || typeof dob !== 'string') {
    const err = new Error('DOB is required!');
    //@ts-ignore
    err.status = 400;
    throw err;
  }
  if (!email || typeof email !== 'string') {
    const err = new Error('Email is required!');
    //@ts-ignore
    err.status = 400;
    throw err;
  }
  const result = await db.run(
    `INSERT INTO patients (name, dob, email) VALUES (?, ?, ?)`,
    [name, dob, email]
  );
  const newPatient = await db.get(
    'SELECT * FROM patients WHERE id = ?',
    result.lastID
  );
  res.status(201).json(newPatient);
}

module.exports = {
  listPatients,
  getPatientById,
  createPatient,
};
