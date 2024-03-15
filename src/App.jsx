import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { StartGame } from "./components/StartGame.jsx";
import { Difficulty } from "./components/Difficulty.jsx";
import { Card } from "./components/Card.jsx";
import { Win } from "./components/Win.jsx";
import { Loss } from "./components/Loss.jsx";
import { allCards } from "./components/AllCards.jsx";

function App() {
  const startingCards = allCards;

  const [gameState, setGameState] = useState("start");
  const [difficulty, setDifficulty] = useState("undefined");
  const [turning, setTurning] = useState(false);
  const [cards, setCards] = useState([...startingCards]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const openDifficulty = () => {
    setDifficulty("undefined");
    setGameState("choose");
  };

  const changeDifficulty = (e) => {
    if (e.target.alt == undefined) {
      setDifficulty(e.target.querySelector("img").alt);
    } else {
      setDifficulty(e.target.alt);
    }
  };

  const startClick = (difficulty) => {
    if (difficulty == "easy") {
      setCards(startingCards.slice(-3));
      setGameState("ongoing");
    } else if (difficulty == "normal") {
      setCards(startingCards.slice(-5));
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
        <StartGame openDifficulty={openDifficulty}></StartGame>
      ) : gameState == "choose" ? (
        <Difficulty
          startClick={() => startClick(difficulty)}
          changeDifficulty={changeDifficulty}
          difficulty={difficulty}
        ></Difficulty>
      ) : gameState == "loss" ? (
        <Loss
          startClick={() => startClick(difficulty)}
          openDifficulty={openDifficulty}
        ></Loss>
      ) : gameState == "win" ? (
        <Win
          startClick={() => startClick(difficulty)}
          openDifficulty={openDifficulty}
        ></Win>
      ) : gameState == "ongoing" ? (
        <>
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
          <div className="score-board">
            <div className="score-container">
              <p className="score">Score: {score}</p>
              <p className="high-score">High score: {highScore}</p>
              <img className="glitch" src="/glitch.gif"></img>
            </div>
            <img className="score-background" src="/scoreBoard.jpg" />
          </div>
        </>
      ) : null}

      <video autoPlay muted loop id="myVideo">
        <source src="/background3.mp4" type="video/mp4" />
      </video>
    </>
  );
}

export default App;
