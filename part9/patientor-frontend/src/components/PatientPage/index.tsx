import { PatientProps } from '../../types';

const PatientPage = (props: PatientProps) => {
  const { patient } = props;
  console.log(patient);

  if (!patient) return;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
