import patients from '../data/patients';
import { PatientEntry, NewPatientEntry } from '../types';
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
    }): Partial<PatientEntry> => ({
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

const addPatient = (entry: NewPatientEntry) => {
  const newEntry = {
    id: id,
    ...entry,
  };
  patients.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};
