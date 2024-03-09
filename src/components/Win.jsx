import "../styles/Win.css";

export function Win({ startClick, openDifficulty }) {
  return (
    <div className="win modal">
      <h1>You win!</h1>
      <img src="/win.webp"></img>
      <button type="button" onClick={startClick}>
        New Game
      </button>
      <button type="button" onClick={openDifficulty}>
        Change Difficulty
      </button>
    </div>
  );
}
