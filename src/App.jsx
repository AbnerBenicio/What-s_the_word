//Style
import "./App.css";
//React
import { useState, useEffect, useCallback } from "react";
//Data
import { wordsList } from "./data/words";
//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import Gameover from "./components/Gameover";

//Stages of the game
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
  //Setting max score of the user
  const [scoreMax, setScoreMax] = useState(() => {
    const data = localStorage.getItem("score");
    const initialValue = JSON.parse(data);
    return initialValue || 0;
  });

  //Setting game stage state
  const [gameStage, setGameStage] = useState(stages[0].name);

  //Setting array of words
  const [words] = useState(wordsList);

  //Setting word and category picked state
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")

  //Setting letters state of the picked word
  const [letters, setLetters] = useState([])

  //Picked the word and category
  const pickWordAndCategory = () => {
    //Pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }

  //Starts the game
  const startGame = () => {
    //Pick word and pick letter
    const {word, category} = pickWordAndCategory()
    
    //Create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map(l => l.toLowerCase())

    //Fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)
    

    setGameStage(stages[1].name)
  }

  //Process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //Retry the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  //Saving max score of user in localStorage
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(scoreMax));
  }, [scoreMax]);

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen
          score={scoreMax}
          startGame={startGame}
        />
      )}
      {gameStage === "game" && <Game setScore={setScoreMax} verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <Gameover retry={retry}/>}
    </div>
  );
}

export default App;
