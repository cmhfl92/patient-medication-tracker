//get patients

import { PaginatedPatientsResponse, PatientInfo } from '../types/patient';

const BASE_URL = 'http://localhost:3001/patients';

//patient api
export async function getPatients(
  page = 1,
  limit = 20
): Promise<PaginatedPatientsResponse> {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to get patients');
  const data = await res.json();
  return data;
}
//post patient form
export async function createPatient(
  name: string,
  dob: string,
  email: string
): Promise<PatientInfo> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dob, email }),
  });
  if (!res.ok) throw new Error('Failed to create new patient');
  return res.json();
}
//edit patient info
//delete patient
