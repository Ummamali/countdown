import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [game, setGame] = useState({ timerId: null, score: 0, started: null });
  const modalRef = useRef();

  // derived state
  const hasEnded = game.score !== 0;

  function clickHandler() {
    if (game.timerId === null) {
      // new game starts
      const tId = setTimeout(() => {
        setGame({ timerId: null, score: -1, started: null });
        modalRef.current.open();
      }, targetTime * 1000);
      // new time
      setGame({ timerId: tId, score: 0, started: Date.now() });
    } else {
      clearTimeout(game.timerId);
      const elapsedMS = Date.now() - game.started;
      // Lets say targetTime if 10 seconds, so player will get 50 scores if they stop after 10/2 ===> 5 seconds
      const newScore = parseInt((elapsedMS * 100) / (targetTime * 1000));
      setGame({ timerId: null, score: newScore, started: null });
      modalRef.current.open();
    }
  }

  return (
    <>
      <ResultModal
        result={game.score < 0 ? "Lost" : "Won"}
        targetTime={targetTime}
        ref={modalRef}
        score={game.score}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={clickHandler}>
            {game.timerId === null ? "Start" : "Stop"} Challenge
          </button>
        </p>
        <p className={game.timerId !== null ? "active" : ""}>
          {game.timerId === null ? "Timer is not running" : "Timer is Running"}
        </p>
      </section>
    </>
  );
}
