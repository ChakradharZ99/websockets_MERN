import  { useEffect, useState } from "react";
import { io } from "socket.io-client";
import bell from "../assets/bell.png";

const socket = io("http://localhost:5001");

function Message() {
  const [msg, setMsg] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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
    <div className="p-4 relative">
      <label htmlFor="messageInput" className="block text-sm font-medium text-gray-700">
        Enter message
      </label>
      <input
        id="messageInput"
        type="text"
        onChange={(e) => setMsg(e.target.value)}
        className="mt-1 block w-2/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        onClick={sendMessage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Send
      </button>
      
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <div className="relative">
          <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">{notifications.length}</div>
          <img src={bell} alt="bell" className="h-6 w-6 cursor-pointer" onClick={toggleNotifications} />
        </div>
      </div>

      {showNotifications && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Notifications</h2>
          <ul className="list-disc pl-5">
            {notifications.map((notification, index) => (
              <p key={index} className="text-sm text-gray-800">{notification}</p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Message;
