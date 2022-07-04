import React from "react";

const Sum = ({ exercises }) => {
  const sum = exercises.reduce((partialSum, a) => partialSum + a, 0);
  return <strong>total of {sum} exercises</strong>;
};

export default Sum;
