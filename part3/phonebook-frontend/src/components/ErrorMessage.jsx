const ErrorMessage = ({ errorMessage, setErrorMessage }) => {
  const errorStyle = {
    color: "red",
    fontSize: 25,
    background: "lightgrey",
    borderStyle: "solid",
    borderColor: "red",
    padding: "5px 10px"
  }
  if (errorMessage === null)
    return null

  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )

}

export default ErrorMessage