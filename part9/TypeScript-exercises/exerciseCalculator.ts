interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExerecies = (arr: number[], target: number): Result => {
  let trainingDays: number = arr.filter(n => n).length;
  let average: number = arr.reduce((a, b) => a + b) / arr.length;
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

console.log(calculateExerecies([5, 1, 2, 1, 2], 2));
