import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LotteryContext from "./contexts/Lottery";

function Lottery() {
  const context = useContext(LotteryContext);
  const { username, users } = context;
  const [usernameInput, setUsernameInput] = useState("");

  const onAddClickHandler = () => {
    context.addUser(usernameInput);
  };

  const onInputHandler = (event) => {
    const username = event.target.value;
    setUsernameInput(username);
  };

  const userElements = users.map((user, index) => {
    return (
      <div className="user__tittle" key={user.username}>
        {" "}
        <div className="cu users" key={index}>
          <div className="users__name">{user.username}</div>
        </div>
      </div>
    );
  });

  let onRollClickHandler = () => {
    context.rollUsers();
  };

  const currentUser = users.find((user) => user.username === username) || {};

  return (
    <div className="lottery">
      <div className="lottery__container">
        <div className="lottery__header header">
          <div className="header__input">
            <input
              className="header__name"
              placeholder="Wpisz imiona"
              onInput={onInputHandler}
              type="text"
            />
          </div>
          <button
            className="header__button header__button--add button"
            onClick={onAddClickHandler}
          >
            +
          </button>{" "}
          <button
            className="header__button header__button--roll button"
            onClick={onRollClickHandler}
            disabled={!currentUser.host}
          >
            Losuj
          </button>
        </div>

        <div className="lottery__connectedUsers cu">
          <div className="users">Users:{userElements}</div>
        </div>
      </div>
    </div>
  );
}

export default Lottery;
