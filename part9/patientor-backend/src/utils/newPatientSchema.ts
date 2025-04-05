import { z } from 'zod';
import { Gender, HealthCheckRating } from '../types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const dischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const healthCheckSchema = z.object({
  date: z.string().date(),
  type: z.literal('HealthCheck'),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const hospitalSchema = z.object({
  date: z.string().date(),
  type: z.literal('Hospital'),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: dischargeSchema,
});

export const occupationalHealthcareSchema = z.object({
  date: z.string().date(),
  type: z.literal('OccupationalHealthcare'),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional(),
});
