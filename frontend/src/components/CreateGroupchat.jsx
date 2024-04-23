import React from "react";
import "../assets/css/creategroupchat.css"

export default function CreateGroupChat(setChat , setBtn) {
    return (
        <div className="wrapper">
            <div className="top">
                <div className="title"> Create group chat</div>
            </div>
            <div className="center">
                <div className="label"> Chat name </div>
                <input type="text" placeholder="Your chat name.."></input>
                <div className="label"> Chat photo </div>
                <div className="label"> Member </div>
            </div>
            <div className="bottom">
                <button className="button" onClick={() => {  }}>Cancel</button>
                <button className="button">Confirm</button>
            </div>
        </div>
    );
}