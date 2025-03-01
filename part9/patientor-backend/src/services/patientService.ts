import patients from '../data/patients';
import { PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const getPatients = () => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }): Partial<PatientEntry> => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
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
  addPatient,
};
