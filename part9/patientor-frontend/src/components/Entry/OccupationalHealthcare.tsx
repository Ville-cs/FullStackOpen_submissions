import { OccupationalHealthcareEntry, Diagnosis } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

type EntryProps = {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
};

const OccupationalHealthcare = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  const findDiagnosisCode = (code: string) => {
    const res = diagnoses.find(diagnosis => diagnosis.code === code);
    return res ? res.name : 'code not found';
  };

  return (
    <div key={entry.id} style={{ border: 'solid 1.5px black' }}>
      <div>
        {entry.date} <WorkIcon></WorkIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist} <br />
        <ul>
          {entry.diagnosisCodes?.map(code => (
            <li key={code}>
              {code} {findDiagnosisCode(code)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OccupationalHealthcare;
