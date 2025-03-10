import { PatientProps } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = (props: PatientProps) => {
  const { patient } = props;

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
    </div>
  );
};

export default PatientPage;
