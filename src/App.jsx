import Player from "./components/Player";


function App() {
  return (
    <main>
      <div id="game-container">
        {/* Players Component */}
        <ol id="players">
          <Player initialName="사용자1" symbol="X"/>
          <Player initialName="사용자2" symbol="O"/>
        </ol>

        {/* Game Board Component*/}
      </div>

      {/* Log Component*/}
    </main>
  );
}

export default App;
