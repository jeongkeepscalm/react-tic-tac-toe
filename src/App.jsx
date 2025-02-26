import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {

  /* 상태 끌어올리기(lifting state) */
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const handleSelectSquare = (rowIndex, cellIndex) => {
    setGameTurns((prevGameTurns) => {
      const updatedTurns = [
        { square: {row: rowIndex, cell: cellIndex}, player: activePlayer }
        , ...prevGameTurns];
        return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">

        {/* Players Component */}
        <ol id="players" className="highlight-player">
          <Player initialName="사용자1" symbol="X" isActived={activePlayer === "X"} />
          <Player initialName="사용자2" symbol="O" isActived={activePlayer === "O"} />
        </ol>

        {/* Game Board Component*/}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />

      </div>

      {/* Log Component*/}
      <Log turns={gameTurns}/>
      
    </main>
  );
}

export default App;
