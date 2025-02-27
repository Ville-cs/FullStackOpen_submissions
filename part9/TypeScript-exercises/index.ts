import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const result = calculateBmi(weight, height);
    res.status(200).json(result);
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  // eslint-disable-next-line
  const exercises = req.body.daily_exercises;
  // eslint-disable-next-line
  const target = req.body.target;

  const input = [target].concat(exercises);
  const result = calculateExercises(input);

  if (typeof result === 'string' && result.startsWith('error')) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  res.status(200).json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
