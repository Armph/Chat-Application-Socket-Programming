import { useState } from "react";
import "../assets/css/messenger.css";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export default function Messenger() {
  const [chat, setChat] = useState(false);
  const [btn ,setBtn] = useState(false);

  const handleBtn = () => {
    setBtn(!btn);
    setChat(false);
  } 

  return (
    <div className="messenger">
      <Sidebar setChat={setChat} handleBtn ={handleBtn} setBtn={setBtn} btn = {btn}/>
      <Content chat={chat} setChat={setChat} btn ={btn} serBtn={setBtn}/>
    </div>
  );
}
