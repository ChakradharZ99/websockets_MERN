import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import bell from "../assets/bell.png"

const socket = io("http://localhost:5001");

function Message() {
  const [msg, setMsg] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle visibility

  const sendMessage = () => {
    socket.emit("send_message", { message: msg });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    });
  }, [socket]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <label htmlFor="">Enter message</label>
      <br />
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      <br />
      <br />
      <button onClick={sendMessage}>Send</button>
      <br />
      <br />
      {/* Render bell button to toggle notifications */}
      <button onClick={toggleNotifications}>
        <img src={bell} alt="bell" width="30px" />
      </button>

      {/* Render notifications if showNotifications is true */}
      {showNotifications && (
        <>
          <p>{notifications.length}</p>
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Message;
