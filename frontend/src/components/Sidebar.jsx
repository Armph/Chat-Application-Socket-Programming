import { MenuList } from "@mui/material";
import { useState } from "react";
import "../assets/css/sidebar.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import ContactItem from "./ContactItem";
import Profile from "./Profile";


export default function Sidebar({ setChat , handleBtn ,setBtn , btn }) {

  const [newChat, setNewChat] = useState(false);
  const [onProfile, setOnProfile] = useState(false);
  const [users, setUsers] = useState([]);

  // function userjoinHander() {
  //   setUsers(users + new_user)
  // }

  return (
    <div className="sidebar">
      <Profile open={onProfile} setOpen={setOnProfile} />
      <div className="wrapper">
        <div className="top">
            <div style={{cursor: "pointer"}} onClick={() => setOnProfile(true)}>
              <Avatar src="" height={45} width={45} />
            </div>
            <span className="heading">Name</span>
            <div className={btn ? "app-icon active" : "app-icon"} onClick={() => {
              handleBtn();;
            }}>
              <i className="fa-solid fa-plus"></i>
            </div>
        </div>
        <div className="private-chat-header">
          Private chat
        </div>
        <div className="scroll-container">
          <div className="scroll-content">
              {[...Array(7)].map((contact, index) => (
                 <ChatItem setChat={setChat} setBtn={setBtn} key={index} />
              ))}
          </div>
        </div>
        <div className="group-chat-header">
          Group chat
        </div>
        <div className="scroll-container">
          <div className="scroll-content">
              {[...Array(7)].map((contact, index) => (
                 <ChatItem setChat={setChat} key={index} />
              ))}
          </div>
        </div>
        <div className="bottom">
             <button className="disconnect-btn">
               <i className="fa-solid fa-power-off"></i>Disconnect
             </button>
        </div>
      </div>
    </div>
  );
}

// export default function Sidebar({ setChat }) {
//   const [newChat, setNewChat] = useState(false);
//   const [onProfile, setOnProfile] = useState(false);

//   const Menu = ["Add new private chat","Add new group chat","Join group chat"];

//   console.log(onProfile);
//   return (
//     <div className="sidebar">
//       <Profile open={onProfile} setOpen={setOnProfile} />
//       <div className="wrapper">
//         <div className="top">
//           <div style={{cursor: "pointer"}} onClick={() => setOnProfile(true)}>
//             <Avatar src="" height={45} width={45} />
//           </div>
//           {newChat ? <span className="heading">Add Conversation</span> : <span className="heading">Name Surname</span>}
//           <div
//             className={newChat ? "app-icon active" : "app-icon"}
//             onClick={() => setNewChat((prev) => !prev)  }
//           >
//             <i className="fa-solid fa-plus"></i>
//           </div>
//         </div>
//         <div className="center">
//           <div className="search-wrapper">
//             <div className="input-wrapper">
//               <i className="fa-solid fa-magnifying-glass"></i>
//               <input
//                 type="text"
//                 placeholder={
//                   newChat ? "Search a contact" : "Search a conversation"
//                 }
//               />
//             </div>
//           </div>
//           <div className="center-wrapper">
//             {newChat ? (
//               <div className="items-wrapper">
//                 {[...Array(5)].map((contact, index) => (
//                   <ContactItem key={index} />
//                 ))}
//               </div>
//             ) : (
//               <div className="items-wrapper">
//                 {[...Array(5)].map((chat, index) => (
//                   <ChatItem setChat={setChat} key={index} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bottom">
//           <button className="logout-btn">
//             <i className="fa-solid fa-power-off"></i>Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

