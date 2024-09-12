const SuccessfulAdd = ({ addMessage, setAddMessage }) => {
  const addStyle = {
    color: "green",
    backgroundColor: "white",
    borderStyle: "solid",
    borderRadius: 5
  }
  if (addMessage === null) {
    return null
  } else {
      setTimeout(() => {
        setAddMessage(null)
      }, 3000);
    }
  console.log("Add msg is", addMessage);
  
  return (
    <div style={addStyle}>
      {addMessage}
    </div>
  )
}

export default SuccessfulAdd