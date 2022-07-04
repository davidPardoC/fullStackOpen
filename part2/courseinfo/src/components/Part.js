import React from "react";

const Part = ({ part }) => {
  return (
    <tr>
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  );
};

export default Part;
