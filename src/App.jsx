import { useState, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";

function App() {
  const [score, setScore] = useState(() => {
    const data = localStorage.getItem("score");
    const initialValue = JSON.parse(data);
    return initialValue || 0;
  });

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  return (
    <div className="App">
      <StartScreen score={score} setScore={setScore}/>
    </div>
  );
}

export default App;
