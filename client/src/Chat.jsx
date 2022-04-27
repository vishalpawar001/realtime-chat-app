import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './styles.css';

function Chat({ username, room, socket }) {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const handleClick = async () => {
        if (message !== "") {
            const messageData = {
                author: username,
                room: room,
                message: message,
                time: new Date(Date.now()).getHours() + ": " + new Date(Date.now()).getMinutes()
            }
            await setMessageList((prev) => { return [...prev, messageData] })
            await socket.emit("send_message", messageData);
            await setMessage("");

        }
    }

    useEffect(() => {

        socket.on("recieve_message", (data) => {
            setMessageList((prev) => {
                return [...prev, data]
            })
        })

    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p> live chat </p>
            </div>
            <div className="chat-body">
               <ScrollToBottom className="message-container" >
                {messageList.map((msgObj) => {
                    return (
                        <div className="message" id={username === msgObj.author ? "other" : "you"}>
                            <div>
                                <div className="message-content">
                                    <p>{msgObj.message} </p>
                                </div>

                                <div className="message-meta">
                                    <p>{msgObj.time} </p>
                                    <p>{msgObj.author} </p>
                                </div>
                            </div>

                        </div>)
                })}
                </ScrollToBottom>

            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={message}
                    name="message"
                    placeholder="hey..."

                    onChange={(event) => {
                        setMessage(event.target.value)
                    }}
                    onKeyPress={(event)=>{ 
                        event.key ==="Enter" && handleClick();
                    }}

                />
                <button onClick={handleClick} type="submit"> &#9658; </button>
            </div>
        </div>
    )
}

export default Chat;