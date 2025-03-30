import { HospitalEntry, Diagnosis } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type EntryProps = {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
};

const Hospital = (props: EntryProps) => {
  const { entry } = props;

  // const findDiagnosisCode = (code: string) => {
  //   const res = diagnoses.find(diagnosis => diagnosis.code === code);
  //   return res ? res.name : 'code not found';
  // };

  return (
    <div key={entry.id} style={{ border: 'solid 1.5px black' }}>
      <div>
        {entry.date} <LocalHospitalIcon></LocalHospitalIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist}
      </div>
      {/* <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {findDiagnosisCode(code)}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Hospital;
