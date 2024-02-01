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

  const [currentScore, setCurrentScores] = useState(0);

  //Setting game stage state
  const [gameStage, setGameStage] = useState(stages[0].name);

  //Setting array of words
  const [words] = useState(wordsList);

  //Setting word and category picked state
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");

  //Setting letters state of the picked word
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);

  //Picked the word and category
  const pickWordAndCategory = useCallback(() => {
    //Pick random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  //Starts the game
  const startGame = useCallback(() => {

    //clear all letters
    clearLetterStates()

    //Pick word and pick letter
    const { word, category } = pickWordAndCategory();

    //Create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //Fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has a already been utilized

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => {
        return actualGuesses - 1;
      });
    }
  };

  const clearLetterStates = () => {
    setWrongLetters([]);
    setGuessedLetters([]);
  };

  //check if guesseds ended
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //check win condition
  useEffect(() => {

    //creating an array with no repetive letters
    const uniqueLetters = [... new Set(letters)]

    //win condition
    if (guessedLetters.length === uniqueLetters.length && letters.length !== 0) {
      setCurrentScores(actualScore => actualScore += 100)
      startGame()
      
    }

  }, [guessedLetters, letters, startGame])

  //Retry the game
  const retry = () => {
    setGuesses(3);
    if (currentScore > scoreMax) {
      setScoreMax(currentScore)
    }
    setCurrentScores(0)
    setGameStage(stages[0].name);
  };

  //Saving max score of user in localStorage
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(scoreMax));
  }, [scoreMax]);

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen score={scoreMax} startGame={startGame} />
      )}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          currentScore={currentScore}
        />
      )}
      {gameStage === "end" && <Gameover retry={retry} currentScore={currentScore} pickedWord={pickedWord}/>}
    </div>
  );
}

export default App;
