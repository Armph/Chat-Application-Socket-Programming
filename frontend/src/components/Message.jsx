import "../assets/css/message.css";

export default function Message({ owner, msg }) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <div className="message-wrapper">
        <p>{msg}</p>
      </div>
      <span className="timeline">just now</span>
    </div>
  );
}
