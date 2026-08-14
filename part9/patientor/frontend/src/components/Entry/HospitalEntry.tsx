import type { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EntryCodes from "./EntryCodes";

type EntryProps = {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
};

const Hospital = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  return (
    <div key={entry.id} style={{ border: "solid 1.5px black", padding: 20 }}>
      <div>
        {entry.date} <LocalHospitalIcon></LocalHospitalIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist} <br />
        Discharged on {entry.discharge.date} <br />
        Criteria {entry.discharge.criteria} <br />
      </div>
      {entry.diagnosisCodes && (
        <EntryCodes
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      )}
    </div>
  );
};

export default Hospital;
