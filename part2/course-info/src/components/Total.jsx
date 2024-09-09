const Total = ({ courses }) => {

  const array = []
  const mapEx = courses.parts.map(
    item => array.push(item.exercises))
  
  const toSum = array.reduce((sum, item) => {
    return sum + item
  }, 0)

  console.log("toSum is ", toSum);

  return (
    <div>
      <b> Total of {toSum} exercises </b>
    </div>
  )
}

export default Total