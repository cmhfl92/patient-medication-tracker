//get patients

const BASE_URL = 'https://localhost:3001'; //'/patient'?

//patient api
export async function getPatients() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to get patients');
  return res.json();
}
//post patient form
export async function createPatient(name: string, dob: string, email: string) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dob, email }),
  });
  if (!res.ok) throw new Error('Failed to create new patient');
  return res.json();
}
//edit patient info?
//delete patient
