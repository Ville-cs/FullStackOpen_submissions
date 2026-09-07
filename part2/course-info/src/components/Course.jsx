const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part} />);
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
  return <strong>Total number of exercises {exercisesSum}</strong>;
};

export default Course;
