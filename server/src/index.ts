import express from 'express';
import cors from 'cors';
import { initDB } from './db/db';

const patientsRouter = require('../routes/patients');
const errorHandler = require('../middleware/errorHandler');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

(async () => {
  const db = await initDB();
  app.locals.db = db;

  app.use('/patients', patientsRouter);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
})();
