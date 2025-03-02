import express from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { newPatientSchema } from '../utils/newPatientSchema';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
  return;
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = newPatientSchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default patientsRouter;
