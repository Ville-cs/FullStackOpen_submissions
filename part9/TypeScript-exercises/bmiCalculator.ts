import { isNumber, hasTwoArgs } from './utils';

export const calculateBmi = (weight: number, height: number) => {
  if (weight === 0 || height === 0) {
    throw new Error('weight nor height can be 0!');
  }

  let bmi: string =
    (weight / height / height) * 10000 < 18.5
      ? 'Underweight'
      : (weight / height / height) * 10000 > 24.9
      ? 'Overweight'
      : 'Normal range';

  return require.main === module
    ? console.log(bmi)
    : {
        weight,
        height,
        bmi,
      };
};

if (require.main === module) {
  try {
    isNumber(process.argv);
    const { value1, value2 } = hasTwoArgs(process.argv);
    calculateBmi(value1, value2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
