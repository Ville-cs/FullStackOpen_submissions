const Button = ({ value, handler, text }) => {
  return <button onClick={() => handler(value + 1)}>{text}</button>;
};

export default Button;
