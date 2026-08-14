import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import EntryCodes from "./EntryCodes";

type EntryProps = {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
};

const OccupationalHealthcare = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  return (
    <div key={entry.id} style={{ border: "solid 1.5px black", padding: 20 }}>
      <div>
        {entry.date} <WorkIcon></WorkIcon> <br />
        {entry.description} <br />
        Attending doctor {entry.specialist} <br />
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

export default OccupationalHealthcare;
