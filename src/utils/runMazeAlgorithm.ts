import type { GridType, MazeType, SpeedType, TileType } from "./types";

export const runMazeAlgorithm = async ({
    maze,
    grid,
    startTile,
    endTile,
    setIsDisabled,
    speed
}:{
    maze: MazeType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    setIsDisabled: (isDisabled: void) => void;
    speed: SpeedType;
}) => {
    return null;
}