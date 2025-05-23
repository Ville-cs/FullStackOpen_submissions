import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import diagnosisService from './services/diagnoses';

import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getDiagnoses();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const matchPatient = useMatch('patients/:id');
  useEffect(() => {
    if (matchPatient && matchPatient.params.id) {
      patientService
        .getPatient(matchPatient.params.id)
        .then(data => setPatient(data));
    }
  }, [matchPatient]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientPage
                patient={patient}
                setPatient={setPatient}
                diagnoses={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
