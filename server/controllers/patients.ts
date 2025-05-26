import { stringify } from 'querystring';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let patients: any[] = []; //need help with this part, I know we are using the sql DB so I don't think I need this?
let nextId = 1;

async function listPatients(req: any, res: any) {
  await delay(500);
  res.json(patients);
}

async function getPatientById(req: any, res: any) {
  await delay(400);
  const id = parseInt(req.params.id, 10);
  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    const err = new Error('Patient Not found');
    throw err;
  }
  res.json(patient);
}

async function createPatient(req: any, res: any) {
  await delay(400);
  const { name, dob, email } = req.body;
  if (typeof name !== 'string') {
    const err = new Error('Name is required!');
    throw err;
  }
  if (typeof dob !== 'string') {
    const err = new Error('DOB is required!');
    throw err;
  }
  if (typeof email !== 'string') {
    const err = new Error('Email is required!');
    throw err;
  }
  const patient = { id: nextId++, name, dob, email };
  patients.push(patient);
  res.status(201).json(patient);
}

module.exports = {
  listPatients,
  getPatientById,
  createPatient,
};
