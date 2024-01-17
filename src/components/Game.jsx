/* eslint-disable react/prop-types */
import "./Game.css";

const Game = ({ setScore, verifyLetter }) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquare"></span>
      </div>
      <div className="letterContainer">
        <form >
          <input type="text" name="letter" maxLength="1" required/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras utilizadas:</p>
        <span>a, </span>
        <span>b, </span>
      </div>
    </div>
  );
};

export default Game;