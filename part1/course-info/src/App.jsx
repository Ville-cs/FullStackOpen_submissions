const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <div>{course}</div>;
};

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.name} part={part} />);
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} has {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const exercisesSum = parts.reduce((sum, next) => sum + next.exercises, 0);
  return <p>Total number of exercises {exercisesSum}</p>;
};

export default App;
