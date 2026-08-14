import { isNumber, hasTwoArgs } from "./utils.ts";

export const calculateBmi = (weight: number, height: number) => {
  if (weight === 0 || height === 0) {
    throw new Error("weight nor height can be 0!");
  }
  const bmiValue = (weight / height / height) * 10000;
  const bmi: string =
    bmiValue < 18.5
      ? "Underweight"
      : bmiValue > 24.9
        ? "Overweight"
        : "Normal range";
  return { weight, height, bmiValue, bmi };
};

const isMain = process.argv[1] === import.meta.filename;

if (isMain) {
  try {
    isNumber(process.argv);
    const { value1, value2 } = hasTwoArgs(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
