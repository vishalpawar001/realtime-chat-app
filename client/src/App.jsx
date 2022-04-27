import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import Css from "./Css";

const socket = io.connect("http://localhost:3100");


function App() {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(true);

  function joinRoom(event) {
    socket.emit("join_room", room);
    setShowChat(false)
    event.preventDefault();
  }


  return (
    <div className="App">
      {showChat ? (
        <div>
          <form>
            <div className="joinChatContainer">
              <h3> Join chat</h3>

              <input
                type="text"
                name="username"
                value={name}
                placeholder="username"
                autoComplete="off"
                required="required"
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />

              <input type="text" name="room"
                value={room}
                placeholder="room ID"
                autoComplete="off"
                required="required"
                onChange={(event) => {
                  setRoom(event.target.value)
                }}
              />

              <button
                onClick={joinRoom} type="submit"> Enter room
              </button>

            </div>
          </form>
         
        </div>
      ) :  <Chat username={name} room={room} socket={socket} />}
    </div>
  )
}

export default App;