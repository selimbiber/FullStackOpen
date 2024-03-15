export default function Notification({ message, status }) {
  if (message === "") return;
  return (
    <p className={`message ${status === "success" ? "success" : "error"}`}>{message}</p>
  );
}
