/* eslint-disable react/prop-types */
import "./Game.css";

const Game = ({ setScore, verifyLetter }) => {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={verifyLetter}>Finalizar game</button>
    </div>
  );
};

export default Game;