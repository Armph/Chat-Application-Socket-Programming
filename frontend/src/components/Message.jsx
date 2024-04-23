import "../assets/css/message.css";

export default function Message({ owner, msg, openImageViewer,backgroundColor}) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <span className="name">Name</span>
      <div className="message-wrapper" style={{backgroundColor: backgroundColor}}>
        {msg?.images.length > 0 && (
          <div
            className="image-wrapper"
            onClick={() => openImageViewer(msg.images)}
          >
            <img src={msg?.images[0]} alt="" />
            {msg?.images.length > 1 && (
              <div className="image-count">+{msg?.images.length - 1}</div>
            )}
          </div>
        )}
        <p>{msg?.message}</p>
      </div>
      <span className="timeline">just now</span>
    </div>
  );
}
