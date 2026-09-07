const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }
  console.log("notification");
  console.log(message);

  const errorStyle = {
    color: "red",
    border: "2px solid red",
    display: "inline-block",
    margin: "1em 0",
  };
  const successStyle = {
    color: "green",
    border: "2px solid green",
    display: "inline-block",
    margin: "1.5em 0",
  };

  return (
    <div style={success === true ? successStyle : errorStyle}>{message}</div>
  );
};

export default Notification;
