import React from "react";
import Avatar from "./Avatar";
// import "../assets/css/joinroom.css";

export default function JoinRoom({setBtn , setChat}){
    return (
        <div className="wrapper">
            <div className="top">
                <Avatar username="Group name" height={45} width={45} />
            </div>
            <div  className="center">
                <h1> You not in this chat room</h1>
                <h2> Click "Join" button below to join this room</h2>
            </div>
            <div className="bottom">
            <button className="button" onClick={() => { setBtn(false);setChat(false); }}>cancel</button>
            <button className="button" onClick={() => { setBtn(false);setChat(false); }}>Join</button>
            </div>
        </div>
    );
}