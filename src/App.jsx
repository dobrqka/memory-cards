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
  ]);

  const [randomizedCards, setRandomizedCards] = useState([...cards]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const cardClick = (e, id) => {
    e.preventDefault();
    cards.map((card) => {
      // you lose if the card was clicked already
      if (card.id == id && card.clicked) {
        setScore(0);
        alert("You lose.");
        return;
      } else if (card.id == id) {
        // set the card as clicked
        setCards(
          cards.map((card) => {
            if (card.id == id) {
              return { ...card, clicked: true };
            } else {
              return card;
            }
          })
        );
        // randomize the order of the cards for the next render
        let newOrder = cards.sort(() => {
          let sortIndex = 0;
          while (sortIndex == 0) {
            sortIndex = Math.floor(Math.random() * 3 - 1);
          }
          return sortIndex;
        });
        setScore(score + 1);
        if (highScore < score + 1) {
          setHighScore(score + 1);
        }
        setRandomizedCards([...newOrder]);
      }
    });
  };

  return (
    <>
      {randomizedCards.map((card) => {
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

// implement Winning condition - if all cards have been clicked
// reset 'clicked' property to 'false' if the game is won or lost
//
// design:
// - cool win/lose modals
// - animation of turning cards
// - 'start game' button
// - difficulties
