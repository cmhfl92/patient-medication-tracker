const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asynHandlerPatient');

const {
  listPatients,
  getPatientById,
  createPatient,
} = require('../controllers/patients');

router.get('/', asyncHandler(listPatients));
router.get('/:id', asyncHandler(getPatientById));
router.post('/', asyncHandler(createPatient));

module.exports = router;
