import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

// 초기 게임 보드
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// 초기 플레이어 
const PLAYERS = {
  X : '사용자1',
  O : '사용자2'
};

// [Helper Function] 현재 플레이어의 상태를 보여준다. 
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

// [Helper Function] 게임 턴을 기반으로 게임 판을 업데이트한다.
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])]; // 깊은 복사
    for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, cell} = square;
      gameBoard[row][cell] = player;
    }
    return gameBoard;
}

// [Helper Function] 게임 보드를 기반으로 승자를 결정한다.
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thridSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol 
        && firstSquareSymbol === secondSquareSymbol 
        && firstSquareSymbol === thridSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

    /*
      if (gameBoard.flat().every((cell) => cell !== null) && !winner) {
        winner = '무승부';
      }
    */
  }
  return winner;
}


function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  // 무승부 상태 확인 변수
  const hasDraw = gameTurns.length === 9 && !winner;

  // 버튼 클릭 이벤트 핸들러
  const handleSelectSquare = (rowIndex, cellIndex) => {
    setGameTurns((prevGameTurns) => {
      const updatedTurns = [
        { square: {row: rowIndex, cell: cellIndex}, player: activePlayer }
        , ...prevGameTurns
      ];
      return updatedTurns;
    });
  };

  // 게임 재시작 이벤트 핸들러
  function handleRestart() {
    // useState 값 변경 -> App 컴포넌트 재랜더링 -> win 변수 상태 초기화
    setGameTurns([]);
  }

  // 유저 이름 변경 이벤트 핸들러
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">

        {/* Players Component */}
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActived={activePlayer === "X"} onChangePlayerName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActived={activePlayer === "O"} onChangePlayerName={handlePlayerNameChange} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}

        {/* Game Board Component*/}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

      </div>

      {/* Log Component*/}
      <Log turns={gameTurns}/>
      
    </main>
  );
}

export default App;
