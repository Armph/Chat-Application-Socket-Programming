import React, { useState } from "react";
import "../assets/css/creategroupchat.css"
import ContactItem from "./ContactItem";
import Avatar from "./Avatar";


export default function CreateGroupChat({setChat , setBtn} ) {

    const [chatName,setChatName] = useState('');

    return (
        <div className="wrapper">
            <div className="top">
                <div className="title"> Create group chat</div>
            </div>
            <div className="center">
                <div className="label" id="1"> Chat name </div>
                <input type="text" id="1" placeholder="Your chat name.." value={chatName} onChange = {(e) => setChatName(e.target.value)}></input>
                {/* <div className="label" id="1"> Chat photo </div>
                <div className="avatar-wrapper" id="1">
                    <Avatar height={150} width={150} />
                     <i className="fa-solid fa-camera"></i>
                </div>
                <div className="label" id="1"> Member </div>
                <div className="scroll-container" id="1">
                    <div className="scroll-content">
                        {[...Array(10)].map((contact, index) => (
                            <ContactItem setChat={setChat} key={index} />
                        ))}
                    </div>
                </div> */}
            </div>
            <div className="bottom">
                <button className="button" onClick={() => { setBtn(false);setChat(false); }}>Cancel</button>
                <button className="button" onClick={() => { setBtn(false);setChat(false); }}>Confirm</button>
            </div>
        </div>
    );
}
