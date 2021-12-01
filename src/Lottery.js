import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function Lottery() {
  let textInput = React.createRef();

  const [connectedUser, setConnectedUser] = useState([]);
  const [rolledUser, setRolledUser] = useState();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    console.log("use effect");
    socket.on("server:client:joined", (message) => {
      console.log(message);
      setConnectedUser(JSON.parse(message));
      console.log(JSON.parse(message));
    });
    socket.on("server:rolled", (message) => {
      console.log(message);
      setRolledUser(JSON.parse(message));
      console.log(JSON.parse(message));
    });
  }, []);

  let onAddClickHandler = (e) => {
    const userName = textInput.current.value;
    console.log(userName);
    const parseUserName = JSON.stringify({ username: userName });
    socket.emit("client:join", parseUserName);
  };
  const userElements = connectedUser.map((user, index) => {
    return (
      <div className="user__tittle">
        {" "}
        Users:{userElements}
        <div className="cu users" key={index}>
          <div className="users__name">{user.username}</div>
        </div>
      </div>
    );
  });

  console.log(userElements);

  let onRollClickHandler = () => {
    socket.emit("client:roll");
  };

  // let hostElement;
  // if () {
  //   const {
  //     recipient: { host },
  //   } = hostUser;
  //   hostElement = (
  //     <button
  //       className="button__roll"
  //       disable={disable}
  //       onClick={onRollClickHandler}
  //     >
  //       ROLL
  //     </button>
  //   );
  // } else {
  //   setDisable(true);
  //   hostElement = (
  //     <button
  //       className="button__roll"
  //       disable={disable}
  //       onClick={onRollClickHandler}
  //     >
  //       ROLL
  //     </button>
  //   );
  // }

  let recipientElement;
  if (rolledUser !== undefined) {
    const {
      recipient: { username },
    } = rolledUser;
    recipientElement = (
      <div className="user__tittle">
        The present goes to: <div className="user__rolledEvent">{username}</div>
      </div>
    );
  }

  return (
    <div className="lottery">
      <div className="lottery__container">
        <div className="lottery__header header">
          <div className="header__input">
            <input
              className="header__name"
              placeholder="Insert name/Wpisz swoje imię"
              type="text"
              ref={textInput}
            />
          </div>
          <div className="header__button">
            <button className="button__add" onClick={onAddClickHandler}>
              +
            </button>
          </div>
          <div className="lottery__footer footer">
            <div className="footer__button">
              {" "}
              <button
                className="button__roll"
                disabled={disable}
                onClick={onRollClickHandler}
              >
                ROLL
              </button>
            </div>
          </div>
        </div>

        <div className="lottery__connectedUsers cu">{recipientElement}</div>
      </div>
    </div>
  );
}

export default Lottery;
