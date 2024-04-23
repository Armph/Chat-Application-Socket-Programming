import { useState } from "react";
import NoAvatar from "../assets/images/noavatar.png";

export default function Avatar2({ src, username, height, width }) {
  const [add,setAdd] = useState(false);
  return (
    <div className="d-flex-row">
      <img
        src={src ? src : NoAvatar}
        alt=""
        style={{
          height: `${height}px`,
          width: `${width}px`,
          objectFit: `cover`,
          borderRadius: `0.5rem`,
        }}
      />
      {username && (
        <span style={{ fontSize: "1rem" }} className="usern">
          {username ? username : "Name Surname"}
        </span>
      )}
      <div className={add ? "app-icon active" : "app-icon"} onClick={() => {setAdd(!add)}}>
         <i className="fa-solid fa-plus"></i>
      </div>
    </div>
  );
}
