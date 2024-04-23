import React from "react";
import Avatar from "./Avatar";

export default function ChatItem({ setChat , setBtn, name, socketId, setSelectedChatRoom }) {
  function handleClick() {
    setChat(true);
    setBtn(false);
    setSelectedChatRoom(socketId);
  }
  return (
    <div className="chat-item" onClick={handleClick}>
      <Avatar src="" height={55} width={55} />
      <div className="chat-item-infos">
        <div className="avatar-infos">
          <span className="username">{name}</span>
        </div>
        <p className="last-message">Say hi!</p>
      </div>
    </div>
  );
}
