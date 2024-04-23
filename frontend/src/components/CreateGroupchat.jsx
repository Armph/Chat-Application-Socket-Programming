import React, { useState } from "react";
import "../assets/css/creategroupchat.css"



export default function CreateGroupChat(setChat , setBtn) {

    const [chatName,setChatName] = useState('');
    const handleConfirm = () => {
        console.log(chatName);
    }

    return (
        <div className="wrapper">
            <div className="top">
                <div className="title"> Create group chat</div>
            </div>
            <div className="center">
                <div className="label"> Chat name </div>
                <input type="text" placeholder="Your chat name.." value={chatName} onChange = {(e) => setChatName(e.target.value)}></input>
                <div className="label"> Chat photo </div>
                <div className="label"> Member </div>
            </div>
            <div className="bottom">
                <button className="button" onClick={() => {  }}>Cancel</button>
                <button className="button" onClick={() => {handleConfirm()}}>Confirm</button>
            </div>
        </div>
    );
}