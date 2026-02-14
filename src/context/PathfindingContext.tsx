import type { AlgorithmType, MazeType, GridType } from "../utils/types";
import type { ReactNode } from "react";

import { createContext, useState } from "react";
import { createGrid } from "../utils/helpers";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";


interface PathfindingContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) => void;
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isGraphVisualised: boolean;
    setIsGraphVisualised: (isGraphVisualised: boolean) => void;
};

export const PathfindingContext = createContext<
    PathfindingContextInterface | undefined
>(undefined);

export const PathfindingProvider = ({children}: {children: ReactNode}) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMaze] = useState<MazeType>("NONE");
    const [grid, setGrid] = useState<GridType>(createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION));
    const [isGraphVisualised, setIsGraphVisualised] = useState<boolean>(false);

    return (
        <PathfindingContext.Provider
            value={{
                algorithm,
                setAlgorithm,
                maze,
                setMaze,
                grid,
                setGrid,
                isGraphVisualised,
                setIsGraphVisualised,
            }}
        >{children}</PathfindingContext.Provider>
    )
};