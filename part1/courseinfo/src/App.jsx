const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name} />
      <Content part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Content part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Content part={course.parts[2].name} exercises={course.parts[2].exercises} />
      <Total number={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part} exercises={props.exercises} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
  <div>
  <p>
    {props.part}
  </p>
  <p>
    {props.exercises}
  </p>
  </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
  <p>
    Total number of exercises {props.number}
  </p>
  )
}

export default App
