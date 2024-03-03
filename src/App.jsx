import "./App.css";
import { Card } from "./components/Card.jsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [cards, setCards] = useState([
    { id: uuidv4(), search: "Ice King", text: "Ice King", clicked: false },
    {
      id: uuidv4(),
      search: "Prismo adventure time",
      text: "Prismo",
      clicked: false,
    },
    { id: uuidv4(), search: "Lemon grab", text: "Lemongrab", clicked: false },
    {
      id: uuidv4(),
      search: "Finn the human adventure time",
      text: "Finn",
      clicked: false,
    },
    { id: uuidv4(), search: "Jake the dog", text: "Jake", clicked: false },
  ]);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
        alert("You lose.");
        resetRandomize();
        return;
      } else if (card.id == id) {
        // if all the other cards are clicked - you win
        if (score == cards.length - 1) {
          alert("You win!");
          setHighScore(cards.length);
          setScore(0);
          resetRandomize();
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
          setScore(score + 1);
          if (highScore < score + 1) {
            setHighScore(score + 1);
          }
          setCards([...updatedCards]);
        }
      }
    });
  };

  return (
    <>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            searchWord={card.search}
            text={card.text}
            cardClick={(e) => cardClick(e, card.id)}
          ></Card>
        );
      })}
      <div className="score-board">
        <p>Current score: {score}</p>
        <p>High score: {highScore}</p>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src="../public/background3.mp4" type="video/mp4" />
      </video>
    </>
  );
}

export default App;

// design:
// - animation of turning cards
// - cool win/lose modals
// - 'start game' button
// - difficulties
