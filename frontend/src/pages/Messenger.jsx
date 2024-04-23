import { useState } from "react";
import "../assets/css/messenger.css";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export default function Messenger({ setName, users, myName, selectedChat, setSelectedChatRoom, selectedDestName, socket, sendPrivateMessage, chatMsg }) {
  const [chat, setChat] = useState(false);
  const [btn ,setBtn] = useState(false);

  const handleBtn = () => {
    setBtn(!btn);
    setChat(false);
  }

  return (
    <div className="messenger">
      <Sidebar setChat={setChat} handleBtn ={handleBtn} setBtn={setBtn} btn = {btn} setName={setName} users={users} myName={myName} setSelectedChatRoom={setSelectedChatRoom} />
      <Content chat={chat} setChat={setChat} btn ={btn} setBtn={setBtn} selectedChat={selectedChat} selectedDestName={selectedDestName} socket={socket} sendPrivateMessage={sendPrivateMessage} chatMsg={chatMsg} />
    </div>
  );
}
