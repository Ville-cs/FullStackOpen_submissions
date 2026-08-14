import { extractAndSortCodes } from "../../../utils";

import OutlinedInput from "@mui/material/OutlinedInput";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import type { SelectChangeEvent } from "@mui/material/Select";
// import type { Dayjs } from "dayjs";
import type { Diagnosis } from "../../../types";
import type { Field } from "../../../customHook";

interface Props {
  diagnoses: Diagnosis[];
  codes: string[];
  setCodes: React.Dispatch<React.SetStateAction<string[]>>;
  specialist: Field;
  description: Field;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const SharedFields = ({
  diagnoses,
  codes,
  setCodes,
  specialist,
  description,
  date,
  setDate,
}: Props) => {
  const handleCodes = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setCodes(typeof value === "string" ? value.split(",") : value);
  };

  const allCodes = extractAndSortCodes(diagnoses);

  return (
    <div>
      <TextField
        fullWidth
        label="Description"
        sx={{ marginBottom: 2, marginTop: 2 }}
        {...description}
      />
      {/* MUI date did not work with strict testing due to too
      many date labels, so a plain input instead */}
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"date"}
          value={date}
          onChange={(newValue) => setDate(newValue)}
          sx={{ marginBottom: 2 }}
        />
      </LocalizationProvider> */}
      <TextField
        fullWidth
        label="Specialist"
        sx={{ marginBottom: 2 }}
        {...specialist}
      />
      <br></br>
      <FormControl sx={{ width: "50%", maxWidth: "300px", marginBottom: 2 }}>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          value={codes}
          onChange={handleCodes}
          input={<OutlinedInput label="Diagnosis codes" />}
        >
          {allCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SharedFields;
