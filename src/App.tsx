import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";

function App() {
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
            Hello world!
          </h1>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  )
}

export default App;
