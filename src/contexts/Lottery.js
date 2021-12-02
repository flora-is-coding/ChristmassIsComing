import React from "react";
import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

const defaultContext = {
  users: [],
  username: null,
  recipientUser: null,
};
const LotteryContext = createContext(defaultContext);
const socket = io("http://localhost:3001");

export function Lottery(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(defaultContext.users);
  const [username, setUsername] = useState(defaultContext.username);
  const [recipientUser, setRecipientUser] = useState(
    defaultContext.recipientUser
  );

  const rollUsers = () => {
    console.log("client:roll");
    socket.emit("client:roll");
  };

  const addUser = (username) => {
    console.log("client:join", username);
    socket.emit("client:join", JSON.stringify({ username }));
    setUsername(username);
  };

  const value = {
    users,
    username,
    recipientUser,
    addUser,
    rollUsers,
  };

  console.log("Lottery Provider renders!", value);

  useEffect(() => {
    socket.on("server:client:joined", (message) => {
      const users = JSON.parse(message);
      console.log("client joined", users);
      setUsers(users);
    });
    socket.on("server:rolled", (message) => {
      const payload = JSON.parse(message);
      console.log("server rolled", payload);
      setRecipientUser(payload.recipient);
      navigate("/results");
    });
  }, []);

  return (
    <LotteryContext.Provider value={value}>
      {props.children}
    </LotteryContext.Provider>
  );
}

export default LotteryContext;
