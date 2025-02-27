export default function GameBoard({onSelectSquare, board}) {

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // const handleSelectSquare = (rowIndex, cellIndex) => {
  //   setGameBoard(prevGameBoard => {
  //     const updatedBoard = [...prevGameBoard.map((row) => [...row])];
  //     updatedBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, cellIndex) => (
              <li key={cellIndex}>
                {/* 
                  disabled={cell !== null} 
                  - 셀이 이미 선택되었으면 버튼을 비활성화한다.
                */}
                <button onClick={() => onSelectSquare(rowIndex, cellIndex)} disabled={cell !== null}>{cell}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
