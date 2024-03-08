import "../styles/Difficulty.css";
import { useState } from "react";

export function Difficulty({ startClick, changeDifficulty }) {
  //   const [difficulty, setDifficulty] = useState("undefined");

  //   const changeDifficulty = (e) => {
  //     setDifficulty(e.target.alt);
  //   };

  return (
    <div className="difficulty modal">
      <h1>Instructions:</h1>
      <p>
        You will have to click on all the cards one by one. Just be careful not
        to click on the same card twice or you lose.
      </p>
      <h1>Choose your difficulty!</h1>
      <form>
        <input type="radio" id="easy" name="difficulty"></input>
        <label
          htmlFor="easy"
          value="easy "
          onClick={(e) => changeDifficulty(e)}
        >
          <img
            className="easy-image "
            src="../../public/easy.webp"
            alt="easy"
          ></img>
        </label>

        <input type="radio" id="normal" name="difficulty"></input>
        <label htmlFor="normal" onClick={(e) => changeDifficulty(e)}>
          <img
            className="normal-image "
            src="../../public/normal.webp"
            alt="normal"
          ></img>
        </label>

        <input type="radio" id="hard" name="difficulty"></input>
        <label htmlFor="hard" onClick={(e) => changeDifficulty(e)}>
          <img
            className="hard-image "
            src="../../public/hard.webp"
            alt="hard"
          ></img>
        </label>
      </form>
      <button type="button" onClick={startClick}>
        Start Game
      </button>
    </div>
  );
}
