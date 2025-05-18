import { HospitalEntry, Diagnosis } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type EntryProps = {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
};

const Hospital = (props: EntryProps) => {
  const { entry } = props;

  return (
    <div key={entry.id} style={{ border: 'solid 1.5px black' }}>
      <div>
        {entry.date} <LocalHospitalIcon></LocalHospitalIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist} <br />
        Discharged on {entry.discharge.date} <br />
        Criteria {entry.discharge.criteria} <br />
      </div>
    </div>
  );
};

export default Hospital;
