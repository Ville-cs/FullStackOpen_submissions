import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ courses }) => {

  return (
    <div>
      <Header name="Web development curriculum" />
      <Content courses={courses} />
      {/* <Total courses={courses} /> */}
    </div>
  )
}


export default Course