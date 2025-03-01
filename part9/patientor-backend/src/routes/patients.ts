import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
  return;
});

export default patientsRouter;
