import { EntryProps } from '../../types';
import Hospital from './HospitalEntry';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

const Entry = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    default:
      const check: never = entry;
      return check;
  }
};

export default Entry;
