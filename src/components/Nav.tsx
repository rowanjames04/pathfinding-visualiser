import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import type { MutableRefObject } from "react";

import { useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { ANIMATION_TIMING, MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { PlayButton } from "./PlayButton";
import { animatePath } from "../utils/animatePath";

/**
 * Navigation component for the pathfinding visualizer
 * Contains controls for algorithm selection, maze generation, and visualization
 */
export function Nav({
    isVisualisationRunningRef,
}: { 
    isVisualisationRunningRef: MutableRefObject<boolean>;
}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const {maze, setMaze, grid, setGrid, isGraphVisualised, setIsGraphVisualised, algorithm, setAlgorithm} = usePathfinding();
    const {startTile, endTile} = useTile();
    const {speed, setSpeed} = useSpeed();

    /**
     * Handle maze generation
     * @param maze - Type of maze to generate
     */
    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === 'NONE') {
            setMaze(maze);
            resetGrid({grid, startTile, endTile});
            return;
        }

        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze, grid, startTile, endTile, setIsDisabled, speed
        });
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualised(false);
    };

    /**
     * Handle pathfinding visualization execution
     */
    const handleRunVisualiser = async () => {
        if (isGraphVisualised) {
            setIsGraphVisualised(false);
            resetGrid({grid: grid.slice(), startTile, endTile});
            return;
        }

        const {traversedTiles, path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile
        });

        // Use the improved animation system
        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisualisationRunningRef.current = true;
        
        // Calculate total animation time more accurately
        const speedMultiplier = SPEEDS.find((s) => s.value === speed)!.value;
        const totalAnimationTime = (
            ANIMATION_TIMING.SLEEP_TIME * traversedTiles.length +
            ANIMATION_TIMING.EXTENDED_SLEEP_TIME * path.length +
            ANIMATION_TIMING.EXTENDED_SLEEP_TIME * 2 // Buffer time
        ) * speedMultiplier;

        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualised(true);
            setIsDisabled(false);
            isVisualisationRunningRef.current = false;
        }, totalAnimationTime);
    };

    return (
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualiser
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                    <Select 
                        label='Maze'
                        value={maze}
                        options={MAZES}
                        onChange={(e) => {
                            handleGenerateMaze(e.target.value as MazeType);
                        }}
                    />
                    <Select 
                        label='Graph'
                        value={algorithm}
                        options={PATHFINDING_ALGORITHMS}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType);
                        }}
                    />
                    <Select 
                        label='Speed'
                        value={speed}
                        options={SPEEDS}
                        onChange={(e) => {
                            setSpeed(parseInt(e.target.value) as SpeedType);
                        }}
                    />
                    <PlayButton
                        isDisabled={isDisabled}
                        isGraphVisualised={isGraphVisualised}
                        handleRunVisualiser={handleRunVisualiser}
                    />
                </div>
            </div>
        </div>
    );
}
