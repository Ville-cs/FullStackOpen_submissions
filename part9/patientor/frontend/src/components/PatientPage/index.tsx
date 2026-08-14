import { useState } from "react";
import type { Patient, Diagnosis } from "../../types";
import Entry from "../Entry";
import PatientDetails from "./PatientDetails";
import PatientForm from "./PatientForm";
import { Button } from "@mui/material";

interface Props {
  patient?: Patient;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, setPatient, diagnoses }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  if (!patient || !setPatient) return;

  return (
    <div>
      <PatientDetails patient={patient} />
      {!showForm && (
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add New Entry
        </Button>
      )}
      {showForm && (
        <PatientForm
          patient={patient}
          setPatient={setPatient}
          diagnoses={diagnoses}
        />
      )}
      <h3>entries</h3>
      {patient.entries?.map((entry) => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
