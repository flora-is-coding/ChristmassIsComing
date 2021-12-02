import react, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import LotteryContext from "./contexts/Lottery";

function Results() {
  const navigate = useNavigate();
  const { recipientUser, rollUsers, username } = useContext(LotteryContext);

  useEffect(() => {
    if (!recipientUser) {
      navigate("/lottery");
    }
  }, []);
  //   if (rollUsers !== undefined) {
  //     recipirntUser = (
  //       <div className="user__tittle">
  //         The present goes to: <div className="user__rolledEvent">{username}</div>
  //       </div>
  //     );
  //   }

  function goToLottery() {
    navigate("/lottery");
  }

  return (
    <div className="results__container result">
      <div className="result__button">
        <button className="result__button--back button" onClick={goToLottery}>
          {" "}
          ←{" "}
        </button>
      </div>

      <div className="result_section">
        <div className="first__name">{username}</div>
        <div className="icon__arrow">→</div>
        <div className="second__name">
          {recipientUser ? recipientUser.username : ""}
        </div>
      </div>
    </div>
  );
}

export default Results;
