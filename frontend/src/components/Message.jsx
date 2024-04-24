import "../assets/css/message.css";

export default function Message({ owner, msg, backgroundColor, myName }) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <span className="name">{myName}</span>
      <div className="message-wrapper" style={{backgroundColor: backgroundColor}}>
        <p>{msg}</p>
      </div>
    </div>
  );
}
