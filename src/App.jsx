//Style
import "./App.css";
//React
import { useState, useEffect, useCallback } from "react";
//Data
import { wordsList } from "./data/words";
//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import Gameover from "./components/Gameover"

const stages = [
  {
    id: 1,
    name: "start",
  },
  {
    id: 2,
    name: "game",
  },
  {
    id: 3,
    name: "end",
  },
];

function App() {
  const [scoreMax, setScoreMax] = useState(() => {
    const data = localStorage.getItem("score");
    const initialValue = JSON.parse(data);
    return initialValue || 0;
  });

  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList)

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(scoreMax));
  }, [scoreMax]);

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen score={scoreMax} stages={stages} setGameStage={setGameStage} />
      )}
      {gameStage === "game" && (
        <Game setScore={setScoreMax} />
      )}
      {gameStage === "end" && (
        <Gameover score={score} setScore={setScore} />
      )}
    </div>
  );
}

export default App;
