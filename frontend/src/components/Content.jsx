import { useState , useEffect} from "react";
import "../assets/css/content.css";
import Avatar from "./Avatar";
import Message from "./Message";
import { SeedMessages } from "../data/Messages";
import ImageSlider from "./ImageSlider";
import InfoContainer from "./InfoContainer";
import CreateGroupChat from "./CreateGroupchat";


export default function Content({ chat, setChat, btn, setBtn}) {
  const [onMenu, setOnMenu] = useState(false);
  const [onViewer, setOnViewer] = useState(false);
  const [messages, setMessages] = useState(SeedMessages);
  const [msgImages, setMsgImages] = useState([]);
  const [text,setText] = useState('');
  const [savedText,setSavedText] = useState('');

  const openImageViewer = (images) => {
    setMsgImages(images);
    setOnViewer(true);
  };

  const closeImageViewer = () => {
    setMsgImages([]);
    setOnViewer(false);
  };

  useEffect(() => {
    console.log("Saved message:", savedText);
  }, [savedText]);


  return (
    <div className={chat ? "content active" : "content"}>
      {!btn && !chat ? (
        <InfoContainer/> ) : (
          <div></div>
        )
      }
      {chat && !btn ? (
        <div className="wrapper">
          <div className="top">
            <Avatar username={"Marc"} height={45} width={45} />
            <div
              className="app-icon menu-icon"
              onClick={() => setOnMenu((prev) => !prev)}
            >
              <i className="fa-solid fa-ellipsis"></i>
              {onMenu && (
                <div className="menu-wrapper">
                  <span className="menu-item" onClick={() => setChat(false)}>
                    Close Chat
                  </span>
                  <span className="menu-item">Delete Messages</span>
                  <span className="menu-item">Delete Chat</span>
                </div>
              )}
            </div>
          </div>
          <div className="center">
            {msgImages.length > 0 && onViewer ? (
              <div className="image-viewer-wrapper">
                <ImageSlider images={msgImages} onClose={closeImageViewer} />
              </div>
            ) : (
              <div className="messages-wrapper">
                {messages.map((msg) => (
                  <Message
                    key={msg?.id}
                    msg={msg}
                    owner={msg?.owner}
                    openImageViewer={openImageViewer}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="bottom">
            <textarea placeholder="Write a message" value={text} onChange={(e) => setText(e.target.value)}/>
            <div className="app-icon" onClick={() => {setSavedText(text);setText('');}}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
      ) :  (
          <div></div>
        )
      }
      {btn && !chat? (
        <CreateGroupChat setChat={setChat} setBtn={setBtn}/>
      ) : (
        <div></div>
      )
      }

    </div>
  );
}
