import "../styles/Loss.css";

export function Loss({ startClick, openDifficulty }) {
  return (
    <div className="loss modal">
      <h1>You lose.</h1>
      <img src="/loss.webp"></img>
      <button type="button" onClick={startClick}>
        New Game
      </button>
      <button type="button" onClick={openDifficulty}>
        Change Difficulty
      </button>
    </div>
  );
}
