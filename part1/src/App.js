const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", excersices: 10 },
      { name: "Using props to pass data", excersices: 7 },
      { name: "State of a component", excersices: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].excersices + parts[1].excersices + parts[2].excersices}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} excersices={parts[0].excersices} />
      <Part part={parts[1].name} excersices={parts[1].excersices} />
      <Part part={parts[2].name} excersices={parts[2].excersices} />
    </div>
  );
};

const Part = ({ part, excersices }) => {
  return (
    <p>
      {part} {excersices}
    </p>
  );
};

export default App;
