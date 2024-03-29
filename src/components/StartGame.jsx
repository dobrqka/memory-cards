import "../styles/StartGame.css";

export function StartGame({ openDifficulty }) {
  return (
    <>
      <div className="modal">
        <p>Welcome!</p>
        <p>How good is your memory?</p>
        <p>Click the button below to put it to the test.</p>
        <img className="start-jake" src="/start-jake.png"></img>
        <img className="start-finn" src="/start-finn.webp"></img>
        <button type="button" onClick={openDifficulty}>
          New Game
        </button>
      </div>
    </>
  );
}
