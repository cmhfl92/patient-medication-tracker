CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  dob TEXT,
  email TEXT
);

--index for Patients Table
-- We frequently query/search by email/name in searching/filtering tools when using B-Tree index
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);

CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  cost REAL
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  medication_id INTEGER,
  status TEXT DEFAULT 'active',
  start_date TEXT DEFAULT CURRENT_DATE,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (medication_id) REFERENCES medications(id)
);
