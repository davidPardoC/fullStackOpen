const App = () => {
  const course = "Half Stack application development";
  const part1 = { name: "Fundamentals of React", excersices: 10 };
  const part2 = { name: "Using props to pass data", excersices: 7 };
  const part3 = { name: "State of a component", excersices: 14 };

  return (
    <div>
      <Header course={course} />
      <Content exercises={[part1, part2, part3]} />
      <Total total={part1.excersices + part2.excersices + part3.excersices} />
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
      <Part part={exercises[0].name} excersices={exercises[0].excersices} />
      <Part part={exercises[1].name} excersices={exercises[1].excersices} />
      <Part part={exercises[2].name} excersices={exercises[2].excersices} />
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
