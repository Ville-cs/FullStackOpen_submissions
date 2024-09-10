const Part = ({ courses }) => {

  // const getParts = courses.map(item => {
  //   return (
  //     <div>
  //       <h2 key={item.id}> {item.name} </h2>
  //       <p key={item.id}> {item.parts[0].name} </p>
  //     </div>
  //   )
  // })

  //Not proud of this solution

  const both = []
  const loopArray = () => {
    for (let i = 0; i < courses.length; i++) {
      let total = 0
      both.push(<h2 key={courses[i].name}> {courses[i].name} </h2>)
      for (let j = 0; j < courses[i].parts.length; j++) {
        total += courses[i].parts[j].exercises
        both.push(
        <p key={courses[i].parts[j].name}>
          {courses[i].parts[j].name} {" "}
          {courses[i].parts[j].exercises}
        </p>)
        if (j == courses[i].parts.length -1) {    
          both.push(
            <p key={total}>
              <b> Total of {total} exercises </b>
            </p>)
        }
      }
    }
  }
  
  loopArray()
  
  // const getNames = getParts.map(
  //   item => item.map(
  //     item => <p key={item.id}> {item.name} {item.exercises}</p>
  //   )
  // )

  // console.log(getNames);

  // const listNames = courses.map(
  //   item => <p key={item.id}> {item.name} </p>)
  
  return (
    <div>
      {both}
    </div>
  )
}

export default Part