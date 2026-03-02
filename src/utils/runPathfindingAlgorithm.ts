import type { AlgorithmType, GridType, TileType } from "./types";

import { bfs } from "../lib/algorithms/pathfinding/bfs";
import { dfs } from "../lib/algorithms/pathfinding/dfs";

export const runPathfindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}:{
    algorithm: AlgorithmType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
}) => {
    switch(algorithm) {
        case "BFS":
            return bfs(grid, startTile, endTile);
        case "DFS":
            return dfs(grid, startTile, endTile);
        default:
            return bfs(grid, startTile, endTile);  
    }
}