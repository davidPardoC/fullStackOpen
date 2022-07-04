import React from "react";
import Part from "./Part";
import Sum from "./Sum";

const Content = ({ parts }) => {
  return (
    <div>
      <table>
        <tbody>
          {parts.map((part) => (
            <Part part={part} key={part.id} />
          ))}
        </tbody>
      </table>
      <Sum exercises={parts.map(part=>part.exercises)} />
    </div>
  );
};

export default Content;
