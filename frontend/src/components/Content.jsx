import { useState , useEffect} from "react";
import "../assets/css/content.css";
import Avatar from "./Avatar";
import Message from "./Message";
import { SeedMessages } from "../data/Messages";
import ImageSlider from "./ImageSlider";
import InfoContainer from "./InfoContainer";
import CreateGroupChat from "./CreateGroupchat";
import JoinRoom from "./JoinRoom";



export default function Content({ chat, setChat, btn, setBtn, selectedChat, selectedDestName, socket, sendPrivateMessage, chatMsg, createGroupChat, sendGroupMessage, isPrivate }) {
  const [onMenu, setOnMenu] = useState(false);
  const [onViewer, setOnViewer] = useState(false);
  const [messages, setMessages] = useState(SeedMessages);
  const [msgImages, setMsgImages] = useState([]);
  const [text,setText] = useState('');
  const [savedText,setSavedText] = useState('');
  const colors = ['DarkSlateBlue', 'MediumAquaMarine', 'LightPink', 'salmon'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const handleColor = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
  };

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

  function handleText() {
    setSavedText(text);
  }

  function handleSubmit() {
    if (selectedChat.length <= 19) {
      sendGroupMessage(text);
    } else {
      sendPrivateMessage(text);
    }
    setText('');
  }

  return (
    <div className={chat ? "content active" : "content"}>
      {/* {!btn && !chat ? (
        <InfoContainer/> ) : (
          <JoinRoom setBtn={setBtn} setChat={setChat}/>
        )} */}
      {!btn && !chat ? (
        <InfoContainer/> ) : (
          <div></div>
        )
      }
      {btn && !chat? (
        <CreateGroupChat setChat={setChat} setBtn={setBtn} createGroupChat={createGroupChat} />
      ) : (
        <div></div>
      )
      }
      {chat && !btn ? (
        <div className="wrapper">
          <div className="top">
            <Avatar username={selectedDestName} height={45} width={45} />
            {isPrivate ? null : <button className="button">Join room</button>}
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
                  <span className="menu-item" onClick={() => handleColor()} >
                    Change colors
                  </span>
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

                {chatMsg[selectedChat] && chatMsg[selectedChat].map((e, idx) => (
                  <Message
                    key={idx}
                    owner={e.from === socket}
                    msg={e.msg}
                    openImageViewer={openImageViewer}
                    backgroundColor = {colors[currentColorIndex]}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="bottom">
            <textarea placeholder="Write a message" value={text} onChange={(e) => setText(e.target.value)}/>
            <div className="app-icon" onClick={() => {handleSubmit();}}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
      ) :  (
          <div></div>
        )
      }

    </div>
  );
}
