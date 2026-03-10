import type { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

/**
 * Grid configuration interface
 */
export interface GridConfig {
  /** Number of rows in the grid */
  rows: number;
  /** Number of columns in the grid */
  cols: number;
}

/**
 * Default grid configuration
 * Can be modified to support different grid sizes
 */
export const DEFAULT_GRID_CONFIG: GridConfig = {
  rows: 39,
  cols: 49,
};

export const MAX_ROWS = DEFAULT_GRID_CONFIG.rows;
export const MAX_COLS = DEFAULT_GRID_CONFIG.cols;

/**
 * Tile configuration factory
 * Creates tile configurations based on grid size
 */
export const createTileConfig = (row: number, col: number) => ({
  row,
  col,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null
});

export const START_TILE_CONFIGURATION = createTileConfig(1, 1);

export const END_TILE_CONFIGURATION = createTileConfig(
  MAX_ROWS - 2,
  MAX_COLS - 2
);

export const TILE_STYLE = 
    "lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] lg:h[17px] md:h-[15px] xs:h-[8px] h-[7px] border-t border-r border-sky-200";

export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400"
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400"
export const END_TILE_STYLE = TILE_STYLE + " bg-red-400"
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400"
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-500"

export const MAZES: MazeSelectType[] = [
    {name: "No Maze", value: "NONE"},
    {name: "Binary Tree", value: "BINARY_TREE"},
    {name: "Recursive Division", value: "RECURSIVE_DIVISION"},
]

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
    {name: "Dijkstra", value: "DIJKSTRA"},
    {name: "A-Star", value: "A_STAR"},
    {name: "Breadth First Search", value: "BFS"},
    {name: "Depth First Search", value: "DFS"},
]

export const SPEEDS: SpeedSelectType[] = [
    {name: "Slow", value: 2},
    {name: "Medium", value: 1},
    {name: "Fast", value: 0.5},
]

/**
 * Animation timing configuration
 * Centralized timing values for consistent animations
 */
export const ANIMATION_TIMING = {
  /** Base delay for traversed tiles */
  SLEEP_TIME: 8,
  /** Extended delay for path tiles */
  EXTENDED_SLEEP_TIME: 30,
  /** Wall creation delay multiplier */
  WALL_DELAY_MULTIPLIER: 6,
  /** Maze generation delay multiplier */
  MAZE_DELAY_MULTIPLIER: 10,
} as const;

// Legacy exports for backward compatibility
export const SLEEP_TIME = ANIMATION_TIMING.SLEEP_TIME;
export const EXTENDED_SLEEP_TIME = ANIMATION_TIMING.EXTENDED_SLEEP_TIME;
