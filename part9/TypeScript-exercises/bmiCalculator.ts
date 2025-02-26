import { isNumber, hasTwoArgs } from './utils';

const calculateBmi = (weight: number, height: number) => {
  if (weight === 0 || height === 0) {
    throw new Error('weight nor height can be 0!');
  }
  let bmi: number = (weight / height / height) * 10000;
  if (bmi < 18.5) {
    console.log('Underweight');
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    console.log('Normal range');
  } else {
    console.log('Overweight');
  }
};

try {
  isNumber(process.argv);
  const { value1, value2 } = hasTwoArgs(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
