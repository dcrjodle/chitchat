import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const ENDPOINT = "https://young-beach-90877.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    console.log(name, room);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };

    //console.log(socket);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("roomData", (users) => {
      console.log("test", users.users);

      setUsers(users.users, users);
    });
  }, [users]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      console.log(message);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  //function for sending messages

  return (
    <div className="generalOuter">
      <h1 className="heading">ChitChat</h1>
      <div className="room-select">
        <h3 className="rooms">Rooms</h3>
        <Link onClick={clickgen}>
          <div className="space"></div>
          <button className="generalButton" id="0" type="submit">
            {" "}
            General{" "}
          </button>
        </Link>
        <div className="roomButtonWrapper"></div>
        <div className="roomButtons">
          <Link onClick={clickafk}>
            <div className="space"></div>
            <button className="roomButton" id="1" type="submit">
              {" "}
              AFK{" "}
            </button>
          </Link>
          <Link onClick={clickdt}>
            <div className="space"></div>
            <button className="roomButton" id="2" type="submit">
              Dirtytalk
            </button>
          </Link>
          <Link onClick={clickmr}>
            <div className="space"></div>
            <button className="roomButton" id="3" type="submit">
              Memeroom
            </button>
          </Link>
          <Link onClick={clickr}>
            <div className="space"></div>
            <button className="roomButton" id="4" type="submit">
              Random
            </button>
          </Link>
        </div>
      </div>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages className="messages" messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <Users users={users} />
      </div>
      <h3 className="joinRoom">Join another room</h3>
      <div className="newRoom">
        <div>
          <input
            placeholder="Enter a room name...."
            className="joinInput"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          ></input>
        </div>
        <div className="space"></div>

        <Link onClick={clicknew}>
          <button className="button mt-20" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );

  function clickgen() {
    setRoom("General");
    window.location = `/chat?name=${name}&room=General`;
  }

  function clickr() {
    window.location = `/chat?name=${name}&room=Random`;
  }

  function clickmr() {
    setRoom("Memeroom");
    window.location = `/chat?name=${name}&room=Memeroom`;
  }
  function clickdt() {
    setRoom("Dirtytalk");
    window.location = `/chat?name=${name}&room=Dirtytalk`;
  }
  function clickafk() {
    setRoom("AFK");
    window.location = `/chat?name=${name}&room=AFK`;
  }

  function clicknew() {
    window.location = `/chat?name=${name}&room=${room}`;
  }
};

export default Chat;
