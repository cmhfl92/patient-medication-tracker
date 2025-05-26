import express from 'express';
import cors from 'cors';
import { initDB } from './db/db';

const patientsRouter = require('./routes/patients');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/patients', patientsRouter);

app.use(errorHandler);

app.get('/patients', async (__, res) => {
  const db = await initDB();
  const patients = await db.all('SELECT * FROM patients');
  res.json(patients);
});

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
