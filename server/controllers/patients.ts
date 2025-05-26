import { Request, Response } from 'express';

async function listPatients(req: Request, res: Response) {
  const db = req.app.locals.db;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const patients = await db.all('SELECT * FROM patients LIMIT ? OFFSET ?', [
    limit,
    offset,
  ]);

  const total = await db.get('SELECT COUNT(*) as count FROM patients');

  res.json({
    data: patients,
    page,
    limit,
    total: total.count,
    totalPages: Math.ceil(total.count / limit),
  });
}

async function getPatientById(req: Request, res: Response) {
  const db = req.app.locals.db;
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
  const db = req.app.locals.db;
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
