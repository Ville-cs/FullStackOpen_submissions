import { PatientProps } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from '../Entry';

const PatientPage = (props: PatientProps) => {
  const { patient, diagnoses } = props;

  if (!patient) return;

  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === 'male' ? (
        <MaleIcon />
      ) : patient.gender === 'female' ? (
        <FemaleIcon />
      ) : (
        'gender not specified'
      )}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries?.map(entry => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
