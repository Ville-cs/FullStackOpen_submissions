import patients from '../data/patients';
import { PatientEntry } from '../types';

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

export default {
  getPatients,
};
