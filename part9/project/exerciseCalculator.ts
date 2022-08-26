type ResultType = {
  periodLength?: number;
  trainingDays?: number;
  average?: number;
  success?: boolean;
  target?: number;
  ratingDescription?: string;
};

export const calculateExcersies = (
  hourTrainigDays: number[],
  averageTarget: number
) => {
  const result: ResultType = {};
  const traingDays = hourTrainigDays.filter((time) => time > 0).length;
  const average =
    hourTrainigDays.reduce((prev, actual) => prev + actual) /
    hourTrainigDays.length;
  result.periodLength = hourTrainigDays.length;
  result.trainingDays = traingDays;
  result.average = average;
  result.success = average >= averageTarget;
  result.target = averageTarget;
  if (average > averageTarget - 0.5) {
    result.ratingDescription = "not too bad but could be better";
  } else {
    result.ratingDescription = "bad";
  }
  return result;
};
