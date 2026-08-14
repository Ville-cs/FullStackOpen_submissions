import Alert from "@mui/material/Alert";

interface Props {
  error: string;
  message: string;
}

const Notification = ({ error, message }: Props) => {
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
    </div>
  );
};

export default Notification;
