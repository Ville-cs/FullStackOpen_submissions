import patients from "../data/patients.ts";
import type {
  Patient,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getPatients = () => {
  return patients.map(
    ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }): Partial<Patient> => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const getPatientById = (id: string) => {
  return patients.find((obj) => obj.id === id);
};

const addPatient = (patient: NewPatientEntry) => {
  const id = uuid();
  const newEntry = {
    id: id,
    ...patient,
  };
  patients.push(newEntry);
  return newEntry;
};

const addEntry = (patient: Patient, entry: EntryWithoutId) => {
  const id = uuid();
  const newEntry: Entry = {
    ...entry,
    id: id,
  };
  if (!patient.entries) {
    patient.entries = [];
  }
  if (!entry.diagnosisCodes) {
    newEntry.diagnosisCodes = [];
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
