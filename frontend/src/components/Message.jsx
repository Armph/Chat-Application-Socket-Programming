import { color } from "@mui/system";
import "../assets/css/message.css";

export default function Message({ owner, msg, backgroundColor,fcolor}) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <span className="name">Name</span>
      <div className="message-wrapper" style={{backgroundColor: backgroundColor}}>
        <p style={{color:fcolor}}>{msg}</p>
      </div>
    </div>
  );
}
