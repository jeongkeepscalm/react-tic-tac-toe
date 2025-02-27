export default function GameOver({winner, onRestart}) {

  let pElement = <p>{winner} won!</p>;
  if (winner === undefined) {
    pElement = <p>It's a draw!</p>;
  }

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {pElement}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  )
}