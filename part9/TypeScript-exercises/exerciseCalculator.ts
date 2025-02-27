import { isNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const calculateExercises = (
  args: string[] | number[]
): Result | string => {
  try {
    isNumber(args);
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
  }

  let arr: number[];
  let target: number;
  if (require.main === module) {
    arr = args.slice(3).map(arg => Number(arg));
    target = Number(args[2]);
  } else {
    arr = args.slice(1).map(arg => Number(arg));
    target = Number(args[0]);
  }

  const trainingDays: number = arr.filter(n => n).length;
  const average: number = arr.reduce((a, b) => a + b) / arr.length;
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job!';
  } else if (average >= target - 0.5) {
    rating = 2;
    ratingDescription = 'Almost there!';
  } else {
    rating = 1;
    ratingDescription = 'Try again next week!';
  }

  return {
    periodLength: arr.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

if (require.main === module) {
  try {
    console.log(calculateExercises(process.argv));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
