import { useState } from "react";
import PlayerButton from "./PlayerButton";


/**
 * 양방향 바인딩
 *  입력값의 변화에 반응하고 변경된 값을 다시 입력값에 전달하는 방식
 */
export default function Player({ initialName, symbol, isActived, onChangePlayerName }) {

  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const editName = () => {
    setIsEditing((v) => !v);
    
    if (isEditing) {
      onChangePlayerName(symbol, playerName)
    }
  };

  const changeName = (e) => {
    setPlayerName(e.target.value)
  }

  let playerNameElment = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    playerNameElment = <input type="text" required value={playerName} onChange={(e) => changeName(e)}/>;
  }

  return (
    <li className={isActived ? 'active' : undefined}>
      <span className="player">
        {playerNameElment}
        <span className="player-symbol">{symbol}</span>
      </span>
      <PlayerButton onClick={() => editName()}>{isEditing ? 'Save' : 'Edit'}</PlayerButton>
    </li>
  );
}
