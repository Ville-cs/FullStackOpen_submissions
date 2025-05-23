export const isNumber = (args: string[] | number[]) => {
  args.slice(2).map(arg => {
    if (isNaN(Number(arg)))
      throw new Error('error: all inputs must be numbers!');
  });

  return args;
};

export const hasTwoArgs = (args: string[]) => {
  if (args.length !== 4)
    throw new Error('error: there must be two arguments in total!');

  return {
    value1: Number(args[2]),
    value2: Number(args[3]),
  };
};
