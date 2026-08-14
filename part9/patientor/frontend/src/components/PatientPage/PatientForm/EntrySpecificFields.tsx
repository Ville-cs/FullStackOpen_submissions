import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import type { SelectChangeEvent } from "@mui/material/Select";
import type { Dayjs } from "dayjs";
import type { Field } from "../../../customHook";

interface Props {
  entryType: string;
  discharge: Dayjs | null;
  setDischarge: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  startDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  endDate: Dayjs | null;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>;
  criteria: Field;
  employerName: Field;
}

const EntrySpecificFields = ({
  entryType,
  discharge,
  setDischarge,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rating,
  setRating,
  criteria,
  employerName,
}: Props) => {
  const handleRating = (event: SelectChangeEvent) => {
    setRating(event.target.value);
  };

  return (
    <div>
      {entryType === "HealthCheck" ? (
        <FormControl sx={{ width: "50%", maxWidth: "300px", marginBottom: 2 }}>
          <InputLabel>Health rating</InputLabel>
          <Select label="Health rating" value={rating} onChange={handleRating}>
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low risk</MenuItem>
            <MenuItem value={2}>High risk</MenuItem>
            <MenuItem value={3}>Critical risk</MenuItem>
          </Select>
        </FormControl>
      ) : entryType === "Hospital" ? (
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"discharge"}
              value={discharge}
              onChange={(newValue) => setDischarge(newValue)}
              sx={{ marginBottom: 2 }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Criteria"
            sx={{ marginBottom: 2 }}
            {...criteria}
          />
        </div>
      ) : entryType === "OccupationalHealthcare" ? (
        <div>
          <TextField
            fullWidth
            label="Employer name"
            sx={{ marginBottom: 2 }}
            {...employerName}
          />
          <h3>Sick leave</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Start date"}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ marginBottom: 2, marginRight: 2 }}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => setStartDate(null),
                },
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"End date"}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ marginBottom: 2 }}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => setEndDate(null),
                },
              }}
            />
          </LocalizationProvider>
        </div>
      ) : null}
    </div>
  );
};

export default EntrySpecificFields;
