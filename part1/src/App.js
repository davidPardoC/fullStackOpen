const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        exercises={[
          { part: part1, exercise: exercises1 },
          { part: part2, exercise: exercises2 },
          { part: part3, exercise: exercises3 },
        ]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const Content = ({ exercises }) => {
  return (
    <div>
      <Part part={exercises[0].part} excersices={exercises[0].exercise} />
      <Part part={exercises[1].part} excersices={exercises[1].exercise} />
      <Part part={exercises[2].part} excersices={exercises[2].exercise} />
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
