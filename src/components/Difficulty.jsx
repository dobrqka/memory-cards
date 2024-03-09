import "../styles/Difficulty.css";

export function Difficulty({ startClick, changeDifficulty, difficulty }) {
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
          <img src="/easy.webp" alt="easy"></img>
        </label>

        <input type="radio" id="normal" name="difficulty"></input>
        <label htmlFor="normal" onClick={(e) => changeDifficulty(e)}>
          <img src="/normal.webp" alt="normal"></img>
        </label>

        <input type="radio" id="hard" name="difficulty"></input>
        <label htmlFor="hard" onClick={(e) => changeDifficulty(e)}>
          <img src="/hard.webp" alt="hard"></img>
        </label>
      </form>

      {difficulty === "undefined" ? (
        <button type="button" onClick={startClick} className="hidden">
          Start Game
        </button>
      ) : (
        <button type="button" onClick={startClick}>
          Start Game
        </button>
      )}
    </div>
  );
}
