import { useState } from "react";
import axios from "axios";
import type {
  Patient,
  Diagnosis,
  EntryWithoutId,
  HealthCheckNoId,
  HospitalNoId,
  OccupationalHealthcareNoId,
} from "../../../types";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import { useField } from "../../../customHook";
import entryService from "../../../services/entries";
import Notification from "./Notification";
import EntryType from "./EntryType";
import SharedFields from "././SharedFields";
import EntrySpecificFields from "./EntrySpecificFields";

interface props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnoses: Diagnosis[];
}

const PatientForm = ({ patient, setPatient, diagnoses }: props) => {
  const [rating, setRating] = useState<string>("0");
  // const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [date, setDate] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [entryType, setEntryType] = useState("HealthCheck");
  const [discharge, setDischarge] = useState<Dayjs | null>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const description = useField("text");
  const specialist = useField("text");
  const criteria = useField("text");
  const employerName = useField("text");

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let strStartDate = "";
    let strEndDate = "";
    if (startDate && endDate) {
      strStartDate = parseDate(startDate);
      strEndDate = parseDate(endDate);
    }

    const newEntry = {
      description: description.value,
      date: parseDate(date),
      specialist: specialist.value,
      diagnosisCodes: codes,
    };

    switch (entryType) {
      case "HealthCheck":
        (newEntry as HealthCheckNoId).type = "HealthCheck";
        (newEntry as HealthCheckNoId).healthCheckRating = Number(rating);
        submitEntry(newEntry as HealthCheckNoId);
        break;
      case "Hospital":
        (newEntry as HospitalNoId).type = "Hospital";
        (newEntry as HospitalNoId).discharge = {
          date: parseDate(discharge),
          criteria: criteria.value,
        };
        submitEntry(newEntry as HospitalNoId);
        break;
      case "OccupationalHealthcare":
        (newEntry as OccupationalHealthcareNoId).type =
          "OccupationalHealthcare";
        (newEntry as OccupationalHealthcareNoId).employerName =
          employerName.value;
        (newEntry as OccupationalHealthcareNoId).sickLeave = {
          startDate: strStartDate,
          endDate: strEndDate,
        };
        submitEntry(newEntry as OccupationalHealthcareNoId);
        break;
      default: {
        setError("You need to select an entry type");
      }
    }
  };

  const submitEntry = async (entry: EntryWithoutId) => {
    try {
      const res = await entryService.postEntry(patient.id, entry);
      console.log(res);
      setError("");
      setMessage("Entry successfully added");
      setPatient({
        ...patient,
        entries: patient.entries?.concat(res),
      });
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const errorMessage = e?.response?.data.error[0].message;
        const errorPath = e?.response?.data?.error[0].path[0];
        const errorNotification = `Error in field ${errorPath}: ${errorMessage}`;
        console.log(errorNotification);
        setMessage("");
        setError(errorNotification);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const parseDate = (date: dayjs.Dayjs | null | string) => {
    const strDate: string = JSON.parse(JSON.stringify(date)).split("T")[0];
    return strDate;
  };

  return (
    <Box sx={{ p: 2, border: "1px solid grey" }}>
      <form onSubmit={submitForm}>
        <Notification error={error} message={message} />
        <h3>New Healthcheck entry</h3>

        <EntryType entryType={entryType} setEntryType={setEntryType} />

        <SharedFields
          diagnoses={diagnoses}
          codes={codes}
          setCodes={setCodes}
          specialist={specialist}
          description={description}
          date={date}
          setDate={setDate}
        />

        <EntrySpecificFields
          entryType={entryType}
          discharge={discharge}
          setDischarge={setDischarge}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          rating={rating}
          setRating={setRating}
          criteria={criteria}
          employerName={employerName}
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={(e) => {
            submitForm(e);
          }}
        >
          Add
        </Button>
      </form>
    </Box>
  );
};

export default PatientForm;
