export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: { date: string; criteria: string };
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export interface PatientProps {
  patient: Patient;
  setPatients: React.Dispatch<React.SetStateAction<Patient>>;
  diagnoses: Diagnosis[];
}

export interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;
export type HealthCheckNoId = Omit<HealthCheckEntry, 'id'>;
export type HospitalNoId = Omit<HospitalEntry, 'id'>;
export type OccupationalHealthcareNoId = Omit<
  OccupationalHealthcareEntry,
  'id'
>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
