import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils/newPatientValidator';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
  return;
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send('Error ' + error.message);
    }
  }
});

export default patientsRouter;
