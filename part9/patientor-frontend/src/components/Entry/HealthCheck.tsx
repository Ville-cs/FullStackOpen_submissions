import { HealthCheckEntry, Diagnosis } from '../../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

type EntryProps = {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
};

const HealthCheck = (props: EntryProps) => {
  const { entry } = props;

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
      </div>
    </div>
  );
};

export default HealthCheck;
