import { HealthCheckEntry, Diagnosis } from '../../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

type EntryProps = {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
};

const HealthCheck = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  const findDiagnosisCode = (code: string) => {
    const res = diagnoses.find(diagnosis => diagnosis.code === code);
    return res ? res.name : 'code not found';
  };

  const rating = (num: number) => {
    switch (num) {
      case 0:
        return <FavoriteIcon sx={{ color: '#009500' }} />;
      case 1:
        return <FavoriteIcon sx={{ color: '#ffff00' }} />;
      case 2:
        return <FavoriteIcon sx={{ color: '#ff5c00' }} />;
      case 3:
        return <FavoriteIcon sx={{ color: '#f00' }} />;
    }
  };

  return (
    <div key={entry.id} style={{ border: 'solid 1.5px black' }}>
      <div>
        {entry.date} <MedicalInformationIcon></MedicalInformationIcon> <br />
        {entry.description} <br />
        {rating(entry.healthCheckRating)} <br />
        Attending doctor {entry.specialist}
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

export default HealthCheck;
