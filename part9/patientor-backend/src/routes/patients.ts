import express from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { newPatientSchema } from '../utils/newPatientSchema';
import { parseEntry } from '../utils/parseNewEntry';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
  return;
});

patientsRouter.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).json({ error: 'unknown patient' });
    return;
  }
  res.status(200).json(patient);
  return;
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).json({ error: 'unknown patient' });
    return;
  }
  try {
    const newEntry = parseEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
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
