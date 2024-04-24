import "../assets/css/message.css";

export default function Message({ owner, msg, backgroundColor}) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <span className="name">Name</span>
      <div className="message-wrapper" style={{backgroundColor: backgroundColor}}>
        <p>{msg}</p>
      </div>
    </div>
  );
}
