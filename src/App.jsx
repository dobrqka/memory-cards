import "./App.css";
import { Card } from "./components/Card.jsx";
import { StartGame } from "./components/StartGame.jsx";
import { Loss } from "./components/Loss.jsx";
import { Win } from "./components/Win.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Difficulty } from "./components/Difficulty.jsx";

function App() {
  const startingCards = [
    { id: 1, search: "Ice King", text: "Ice King", clicked: false },
    {
      id: 2,
      search: "Prismo adventure time",
      text: "Prismo",
      clicked: false,
    },
    { id: 3, search: "Lemon grab", text: "Lemongrab", clicked: false },
    {
      id: 4,
      search: "Finn the human adventure time",
      text: "Finn",
      clicked: false,
    },
    { id: 5, search: "Jake the dog", text: "Jake", clicked: false },
    {
      id: 6,
      search: "Princess Bubblegum",
      text: "P.B.",
      clicked: false,
    },
    {
      id: 7,
      search: "Gunther penguin adventure time",
      text: "Gunther",
      clicked: false,
    },
  ];

  const [cards, setCards] = useState([...startingCards]);

  const [turning, setTurning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [difficulty, setDifficulty] = useState("undefined");

  const changeDifficulty = (e) => {
    setDifficulty(e.target.alt);
  };

  const chooseDifficulty = () => {
    setGameState("choose");
  };

  const startClick = (difficulty) => {
    if (difficulty == "easy") {
      setCards(startingCards.splice(-3));
      setGameState("ongoing");
    } else if (difficulty == "normal") {
      setCards(startingCards.splice(-5));
      setGameState("ongoing");
    } else if (difficulty == "hard") {
      setCards(startingCards);
      setGameState("ongoing");
    }
  };

  // used to force cards turning animation
  useEffect(() => {
    setTurning(true);
  }, [score]);

  const resetRandomize = () => {
    setCards(
      cards
        .map((card) => {
          return { ...card, clicked: false };
        })
        .sort(() => Math.random() - 0.5)
    );
  };

  const cardClick = (e, id) => {
    e.preventDefault();
    cards.map((card) => {
      // you lose if the card was clicked already
      if (card.id == id && card.clicked) {
        setScore(0);
        resetRandomize();
        setGameState("loss");
        setTurning(false);
        return;
      } else if (card.id == id) {
        // if all the other cards are clicked - you win
        if (score == cards.length - 1) {
          setGameState("win");
          setHighScore(cards.length);
          setScore(0);
          resetRandomize();
          setTurning(false);
          return;
        } else {
          // set the card as clicked
          const updatedCards = cards
            .map((card) => {
              if (card.id == id) {
                return { ...card, clicked: true };
              } else {
                return card;
              }
            })
            .sort(() => Math.random() - 0.5);

          // set score, high score and randomize cards order
          setTurning(false);
          setCards([...updatedCards]);
          setScore(score + 1);
          if (highScore < score + 1) {
            setHighScore(score + 1);
          }
        }
      }
    });
  };

  return (
    <>
      {gameState == "start" ? (
        <StartGame startClick={chooseDifficulty}></StartGame>
      ) : gameState == "choose" ? (
        <Difficulty
          startClick={() => startClick(difficulty)}
          changeDifficulty={changeDifficulty}
        ></Difficulty>
      ) : gameState == "loss" ? (
        <Loss
          startClick={() => startClick(difficulty)}
          chooseDifficulty={chooseDifficulty}
        ></Loss>
      ) : gameState == "win" ? (
        <Win
          startClick={() => startClick(difficulty)}
          chooseDifficulty={chooseDifficulty}
        ></Win>
      ) : (
        <div className="cards">
          {cards.map((card) => {
            return (
              <Card
                key={card.id}
                searchWord={card.search}
                text={card.text}
                cardClick={(e) => cardClick(e, card.id)}
                turning={turning}
              ></Card>
            );
          })}
        </div>
      )}
      {gameState == "ongoing" && (
        <div className="score-board">
          <div className="score-container">
            <p className="score">Score: {score}</p>
            <p className="high-score">High score: {highScore}</p>
            <img className="glitch" src="/glitch.gif"></img>
          </div>
          <img className="score-background" src="/scoreBoard.jpg" />
        </div>
      )}

      <video autoPlay muted loop id="myVideo">
        <source src="/background3.mp4" type="video/mp4" />
      </video>
    </>
  );
}

export default App;

// design:
//
// - difficulties
