import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import type { Patient } from "../../types";

interface props {
  patient: Patient;
}

const PatientDetails = ({ patient }: props) => {
  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === "male" ? (
        <MaleIcon />
      ) : patient.gender === "female" ? (
        <FemaleIcon />
      ) : (
        "gender not specified"
      )}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;
