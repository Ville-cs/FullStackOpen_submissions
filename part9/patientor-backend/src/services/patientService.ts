import patients from '../data/patients';
import { Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const id = uuid();

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
    })
  );
};

const getPatientById = (id: string) => {
  return patients.find(obj => obj.id === id);
};

const addPatient = (patient: NewPatientEntry) => {
  const newEntry = {
    id: id,
    ...patient,
  };
  patients.push(newEntry);
  return newEntry;
};

const addEntry = (patient: Patient, entry: EntryWithoutId) => {
  const newEntry: Entry = {
    ...entry,
    id: id,
  };
  if (!patient.entries) {
    patient.entries = [];
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
