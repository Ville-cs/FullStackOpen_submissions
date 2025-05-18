import { OccupationalHealthcareEntry, Diagnosis } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

type EntryProps = {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
};

const OccupationalHealthcare = (props: EntryProps) => {
  const { entry } = props;

  return (
    <div key={entry.id} style={{ border: 'solid 1.5px black' }}>
      <div>
        {entry.date} <WorkIcon></WorkIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist} <br />
      </div>
    </div>
  );
};

export default OccupationalHealthcare;
