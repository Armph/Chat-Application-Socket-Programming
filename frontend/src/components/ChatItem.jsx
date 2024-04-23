import React from "react";
import Avatar from "./Avatar";

export default function ChatItem({ setChat , setBtn}) {

  return (
    <div className="chat-item" onClick={() => {setChat(true);setBtn(false);}}>
      <Avatar src="" height={55} width={55} />
      <div className="chat-item-infos">
        <div className="avatar-infos">
          <span className="username">Name Surname</span>
          <span className="timeline">2 days ago</span>
        </div>
        <p className="last-message">Say hi!</p>
      </div>
    </div>
  );
}
