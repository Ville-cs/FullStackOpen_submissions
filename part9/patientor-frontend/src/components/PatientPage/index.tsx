import { useState } from 'react';
import axios from 'axios';
import {
  PatientProps,
  EntryWithoutId,
  HealthCheckNoId,
  HospitalNoId,
  OccupationalHealthcareNoId,
} from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from '../Entry';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField } from '../../customHook';
import entryService from '../../services/entries';

const PatientPage = (props: PatientProps) => {
  const { patient, setPatient, diagnoses } = props;
  const [rating, setRating] = useState<string>('0');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [codes, setCodes] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [entryType, setEntryType] = useState('');
  const [discharge, setDischarge] = useState<Dayjs | null>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const description = useField('text');
  const specialist = useField('text');
  const criteria = useField('text');
  const employerName = useField('text');

  if (!patient) return;

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // TODO refactor discharge date

    // const strDate: string = JSON.parse(JSON.stringify(date)).split('T')[0];
    // const dischargeDate: string = JSON.parse(JSON.stringify(discharge)).split(
    //   'T'
    // )[0];
    // const strStartDate: string = JSON.parse(JSON.stringify(startDate)).split(
    //   'T'
    // )[0];
    // const strEndDate: string = JSON.parse(JSON.stringify(endDate)).split(
    //   'T'
    // )[0];
    let strStartDate = '';
    let strEndDate = '';
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
      case 'HealthCheck':
        (newEntry as HealthCheckNoId).type = 'HealthCheck';
        (newEntry as HealthCheckNoId).healthCheckRating = Number(rating);
        submitEntry(newEntry as HealthCheckNoId);
        break;
      case 'Hospital':
        (newEntry as HospitalNoId).type = 'Hospital';
        (newEntry as HospitalNoId).discharge = {
          // date: dischargeDate,
          date: parseDate(discharge),
          criteria: criteria.value,
        };
        submitEntry(newEntry as HospitalNoId);
        break;
      case 'OccupationalHealthcare':
        (newEntry as OccupationalHealthcareNoId).type =
          'OccupationalHealthcare';
        (newEntry as OccupationalHealthcareNoId).employerName =
          employerName.value;
        (newEntry as OccupationalHealthcareNoId).sickLeave = {
          startDate: strStartDate,
          endDate: strEndDate,
          // startDate: parseDate(startDate),
          // endDate: parseDate(endDate),
        };
        submitEntry(newEntry as OccupationalHealthcareNoId);
        break;
    }
  };

  const submitEntry = async (entry: EntryWithoutId) => {
    try {
      const res = await entryService.postEntry(patient.id, entry);
      console.log(res);
      setError('');
      setMessage('Entry successfully added');
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
        setMessage('');
        setError(errorNotification);
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const parseDate = (date: dayjs.Dayjs | null) => {
    const strDate: string = JSON.parse(JSON.stringify(date)).split('T')[0];
    return strDate;
  };

  const handleRating = (event: SelectChangeEvent) => {
    setRating(event.target.value);
  };

  const handleCodes = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType((event.target as HTMLInputElement).value);
  };

  const allCodes: Array<string> = [];
  diagnoses.map(diagnosis => {
    if (!allCodes.includes(diagnosis.code)) {
      allCodes.push(diagnosis.code);
    }
  });
  allCodes.sort((n1, n2) => {
    if (n1 > n2) {
      return 1;
    }
    if (n1 < n2) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === 'male' ? (
        <MaleIcon />
      ) : patient.gender === 'female' ? (
        <FemaleIcon />
      ) : (
        'gender not specified'
      )}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <Box sx={{ p: 2, border: '1px solid grey' }}>
        <form onSubmit={submitForm}>
          <h3>New Healthcheck entry</h3>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}

          <FormControl sx={{ width: '50%', marginBottom: 2 }}>
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
          <TextField
            fullWidth
            label="Description"
            sx={{ marginBottom: 2, marginTop: 2 }}
            {...description}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'date'}
              value={date}
              onChange={newValue => setDate(newValue)}
              sx={{ marginBottom: 2 }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Specialist"
            sx={{ marginBottom: 2 }}
            {...specialist}
          />
          <br></br>
          <FormControl
            sx={{ width: '50%', maxWidth: '300px', marginBottom: 2 }}
          >
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              label="Diagnosis codes"
              multiple
              value={codes}
              onChange={handleCodes}
              input={<OutlinedInput label="Diagnosis codes" />}
            >
              {allCodes.map(code => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br></br>
          {entryType === 'HealthCheck' ? (
            <FormControl
              sx={{ width: '50%', maxWidth: '300px', marginBottom: 2 }}
            >
              <InputLabel>Health rating</InputLabel>
              <Select
                label="Health rating"
                value={rating}
                onChange={handleRating}
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low risk</MenuItem>
                <MenuItem value={2}>High risk</MenuItem>
                <MenuItem value={3}>Critical risk</MenuItem>
              </Select>
            </FormControl>
          ) : entryType === 'Hospital' ? (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={'discharge'}
                  value={discharge}
                  onChange={newValue => setDischarge(newValue)}
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
          ) : entryType === 'OccupationalHealthcare' ? (
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
                  label={'Start date'}
                  value={startDate}
                  onChange={newValue => setStartDate(newValue)}
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
                  label={'End date'}
                  value={endDate}
                  onChange={newValue => setEndDate(newValue)}
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
          <br></br>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={e => {
              submitForm(e);
            }}
          >
            add
          </Button>
        </form>
      </Box>

      <h3>entries</h3>
      {patient.entries?.map(entry => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
