import { useEffect, useState } from "react";
import Die from "./Die.jsx";
import confetti from "canvas-confetti";
import diceIcon from "./assets/dice-svgrepo-com.svg";

import "./App.css";

function App() {
  function runConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = {
      particleCount: 100,
      startVelocity: 20,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function generateArray() {
    return Array.from({ length: 10 }, () => {
      return { value: getRandomInt(6) + 1, fixed: false };
      //return { value: 5, fixed: false };
    });
  }

  const [dice, setDice] = useState(generateArray());
  const gameWon =
    dice.every((die) => die.value === dice[0].value) &&
    dice.every((die) => die.fixed);

  useEffect(() => {
    if (gameWon) {
      runConfetti();
    }
  }, [gameWon]);

  function fixDie(index) {
    const nextDice = dice.map((v, i) => {
      return i === index ? { value: v.value, fixed: !v.fixed } : v;
    });
    setDice(nextDice);
  }

  function roll() {
    const nextDice = dice.map((v) => {
      return !v.fixed ? { value: getRandomInt(6) + 1, fixed: v.fixed } : v;
    });
    setDice(nextDice);
  }

  function newGame() {
    setDice(generateArray);
  }

  return (
    <>
      <div className="main-container">
        <div className="title">
          <h1>Tenzie</h1>
          <p>
            Roll until all the dice are the same number. <br />
            You can lock a die by clicking it
          </p>
        </div>
        <div className="dice-container">
          {dice.map((d, i) => (
            <Die
              key={i}
              value={d.value}
              fixed={d.fixed}
              onClick={() => fixDie(i)}
            />
          ))}
        </div>

        {!gameWon && (
          <button
            onClick={roll}
            className="roll-button group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"
          >
            <span>Roll</span>
            <div className="ml-1 transition duration-300 group-hover:rotate-[360deg]">
              <img src={diceIcon} className="w-5 h-5 ml-2" />
            </div>
          </button>
        )}
        {gameWon && (
          <button
            onClick={newGame}
            className="roll-button group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"
          >
            <span>New Game</span>
          </button>
        )}
      </div>
    </>
  );
}

export default App;
