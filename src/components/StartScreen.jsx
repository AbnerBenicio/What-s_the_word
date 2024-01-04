
import "./StartScreen.css";

// eslint-disable-next-line react/prop-types
const StartScreen = ({score, setScore}) => {

  return (
    <div className="start">
      <h1>What's the Word?</h1>
      <p>Clique no botão abaixo para começara jogar</p>
      <button>Iniciar</button>
      <button onClick={() => setScore(score + 7)}>Teste</button>
      <p>Sua pontuação máxima foi: {score}</p>
    </div>
  );
};

export default StartScreen;
