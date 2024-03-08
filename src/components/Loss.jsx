import "../styles/Loss.css";

export function Loss({ startClick, chooseDifficulty }) {
  return (
    <div className="loss modal">
      <h1>You lose.</h1>
      <img src="../../public/loss.webp"></img>
      <button type="button" onClick={startClick}>
        New Game
      </button>
      <button type="button" onClick={chooseDifficulty}>
        Change Difficulty
      </button>
    </div>
  );
}
