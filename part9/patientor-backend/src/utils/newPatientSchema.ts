import { z } from 'zod';
import { Gender, HealthCheckRating } from '../types';

const dischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const entrySchema = z.object({
  date: z.string().date(),
  type: z.string(),
  specialist: z.string(),
  descriptions: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string().optional(),
  discharge: dischargeSchema.optional(),
  sickLeave: sickLeaveSchema.optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
});

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).optional(),
});
