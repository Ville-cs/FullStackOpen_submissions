const Notification = ({ errorMessage, message }) => {
  const errorStyle = {
    color: 'red',
    fontSize: 25,
    background: 'lightgrey',
    maxWidth: '500px',
    borderStyle: 'solid',
    borderColor: 'red',
    padding: '5px 10px',
  }
  const messageStyle = {
    color: 'green',
    fontSize: 25,
    backgroundColor: 'white',
    maxWidth: '500px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: '5px 10px',
  }
  if (errorMessage) {
    return <div style={errorStyle}>{errorMessage}</div>
  } else if (message) {
    return <div style={messageStyle}>{message}</div>
  }

  return null
}

export default Notification
