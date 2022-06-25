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
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

export default App;
