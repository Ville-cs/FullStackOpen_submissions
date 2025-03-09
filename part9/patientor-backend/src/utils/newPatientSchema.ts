import { z } from 'zod';
import { Gender } from '../types';

const patientSchema = z.object({
  descriptions: z.string().optional(),
});

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(patientSchema),
});
