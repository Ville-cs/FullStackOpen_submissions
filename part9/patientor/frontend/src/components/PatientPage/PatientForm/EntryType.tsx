import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

interface Props {
  entryType: string;
  setEntryType: React.Dispatch<React.SetStateAction<string>>;
}

const EntryType = ({ entryType, setEntryType }: Props) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <FormControl sx={{ width: "50%", marginBottom: 2 }}>
        <FormLabel>Entry type</FormLabel>
        <RadioGroup row value={entryType} onChange={handleRadioChange}>
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="Health check"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="Occupational Healthcare"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default EntryType;
