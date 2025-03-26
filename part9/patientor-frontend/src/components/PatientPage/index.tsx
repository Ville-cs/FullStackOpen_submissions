import { PatientProps } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = (props: PatientProps) => {
  const { patient, diagnoses } = props;

  if (!patient) return;

  const findDiagnosisCode = (code: string) => {
    const res = diagnoses.find(diagnosis => diagnosis.code === code);
    return res?.name;
  };

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
        <div key={entry.id}>
          <div>
            {entry.date}: {entry.description}
          </div>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} {findDiagnosisCode(code)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
