import React from "react";
import Part from "./Part";

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
    </div>
  );
};

export default Content;
