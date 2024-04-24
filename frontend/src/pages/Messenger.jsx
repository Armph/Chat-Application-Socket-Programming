import { useState } from "react";
import "../assets/css/messenger.css";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export default function Messenger({ setName, users, myName, selectedChat, setSelectedChatRoom, selectedDestName, socket, sendPrivateMessage, chatMsg, setSelectedGroupChatRoom, groups, createGroupChat, sendGroupMessage, joinGroupChat, disconnectHandler }) {
  const [chat, setChat] = useState(false);
  const [btn ,setBtn] = useState(false);
  const [isPrivate,setPrivate] = useState(false);

  const toPrivate = () => {
    setPrivate(true);
  }

  const dontPrivate = () => {
    setPrivate(false);
  }

  const handleBtn = () => {
    setBtn(!btn);
    setChat(false);
  }

  return (
    <div className="messenger">
      <Sidebar setChat={setChat} handleBtn ={handleBtn} setBtn={setBtn} btn = {btn} setName={setName} users={users} myName={myName} setSelectedChatRoom={setSelectedChatRoom} setSelectedGroupChatRoom={setSelectedGroupChatRoom} groups={groups} toPrivate={toPrivate} dontPrivate={dontPrivate} disconnectHandler={disconnectHandler}/>
      <Content chat={chat} setChat={setChat} btn ={btn} setBtn={setBtn} selectedChat={selectedChat} selectedDestName={selectedDestName} socket={socket} sendPrivateMessage={sendPrivateMessage} chatMsg={chatMsg} createGroupChat={createGroupChat} sendGroupMessage={sendGroupMessage} isPrivate={isPrivate} joinGroupChat={joinGroupChat} myName={myName}/>
    </div>
  );
}
