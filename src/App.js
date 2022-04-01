import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const countdown = () => {
    const endDate = new Date("December 24, 2022 00:00:00").getTime();
    const today = new Date().getTime();

    const difference = endDate - today;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    let timeDays = Math.floor(difference / days);
    let timeHours = Math.floor((difference % days) / hours);
    let timeMinutes = Math.floor((difference % hours) / minutes);
    let timeSeconds = Math.floor((difference % minutes) / seconds);

    timeHours = timeHours < 10 ? "0" + timeHours : timeHours;
    timeMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
    timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;

    setDays(timeDays);
    setHours(timeHours);
    setMinutes(timeMinutes);
    setSeconds(timeSeconds);
    setIsLoading(false);
  };

  useEffect(() => {
    setInterval(countdown, 1000);
  });

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <section className="container">
          <h1>Christmas Eve Counter</h1>

          <div className="countdown">
            <article>
              <p>{days}</p>
              <h3>Days</h3>
            </article>
            <article>
              <p>{hours}</p>
              <h3>Hours</h3>
            </article>
            <article>
              <p>{minutes}</p>
              <h3>Minutes</h3>
            </article>
            <article>
              <p>{seconds}</p>
              <h3>Seconds</h3>
            </article>
          </div>
          <Link to="/lottery">Lottery</Link>
        </section>
      )}
    </div>
  );
};
export default App;
