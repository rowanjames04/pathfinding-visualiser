import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Grid } from "./components/Grid";
import { useRef } from "react";

function App() {
  const isVisualisationRunningRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Grid isVisualisationRunningRef={isVisualisationRunningRef}/>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  )
}

export default App;
