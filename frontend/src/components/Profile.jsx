import { useState } from "react";
import "../assets/css/profile.css";
import Avatar from "./Avatar";

export default function Profile({ open, setOpen, setName, myName }) {
  const [onEdit, setOnEdit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    setName(name);
    setOnEdit(false);
  }

  return (
    <div className={open ? "profile active" : "profile"}>
      <div className="profile-wrapper">
        <div className="profile-topbar">
          <span className="heading">Profile</span>
          <div className="app-icon" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {onEdit ? (
          <div className="profile-infos">
            <div className="avatar-wrapper">
              <Avatar height={150} width={150} />
              <i className="fa-solid fa-camera"></i>
            </div>
            <form onSubmit={handleSubmit} className="profile-form">
              <input type="text" placeholder="Name" />
              <div className="profile-actions">
                <button onClick={() => setOnEdit(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-infos">
            <div className="avatar-wrapper">
              <Avatar height={150} width={150} />
            </div>
            <span className="username">{myName}</span>
            <button className="edit-btn" onClick={() => setOnEdit(true)}>
              <i className="fa-solid fa-pen-to-square"></i>Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
