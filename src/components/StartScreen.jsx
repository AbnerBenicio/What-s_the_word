import "./StartScreen.css";

// eslint-disable-next-line react/prop-types
const StartScreen = ({score, stages, setGameStage}) => {

  return (
    <div className="start">
      <h1>What's the Word?</h1>
      <p>Clique no botão abaixo para começara jogar</p>
      <button onClick={() => setGameStage(stages[1].name)}>Iniciar</button>
      <p>Sua pontuação máxima foi: {score}</p>
    </div>
  );
};

export default StartScreen;
