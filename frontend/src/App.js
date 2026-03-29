import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", msg);
    setMsg("");
  };

  return (
    <div>
      <h2>Chat App</h2>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      {chat.map((c, i) => (
        <p key={i}>{c}</p>
      ))}
    </div>
  );
}

export default App;