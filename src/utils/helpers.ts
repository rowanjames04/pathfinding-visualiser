import type { GridType, TileType } from './types';

import { MAX_ROWS, MAX_COLS, createTileConfig } from "./constants";


/**
 * Create a single row of tiles for the grid
 * @param row - Row index
 * @param startTile - Starting tile configuration
 * @param endTile - Ending tile configuration
 * @returns Array of tiles for the row
 */
const createRow = (row: number, startTile: TileType, endTile: TileType): TileType[] => {
    const currentRow: TileType[] = [];
    for (let col = 0; col < MAX_COLS; col++) {
        currentRow.push({
            ...createTileConfig(row, col),
            isEnd: row === endTile.row && col === endTile.col,
            isWall: false,
            isPath: false,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isTraversed: false,
            parent: null
        });
    }
    return currentRow;
}

/**
 * Create a new grid with specified start and end tiles
 * @param startTile - Starting tile configuration
 * @param endTile - Ending tile configuration
 * @returns 2D array representing the grid
 */
export const createGrid = (startTile: TileType, endTile: TileType): GridType => {
    const grid: GridType = [];
    for (let row = 0; row < MAX_ROWS; row++) {
        grid.push(createRow(row, startTile, endTile));
    }
    return grid;
};

/**
 * Check if a tile is the start or end tile
 * @param row - Row index of the tile
 * @param col - Column index of the tile
 * @returns Boolean indicating if the tile is start or end
 */
export const checkIfStartOrEnd = (row: number, col: number): boolean => {
    return (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2);
};

/**
 * Create a new grid with a wall toggle at the specified position
 * @param grid - Current grid state
 * @param row - Row index where wall should be toggled
 * @param col - Column index where wall should be toggled
 * @returns New grid with wall toggled at the specified position
 */
export const createNewGrid = (grid: GridType, row: number, col: number): GridType => {
    const newGrid = grid.slice();
    const newTile = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall,
    };

    newGrid[row][col] = newTile;
    return newGrid;
};

/**
 * Check if two tiles are equal (same position)
 * @param a - First tile
 * @param b - Second tile
 * @returns Boolean indicating if tiles are equal
 */
export const isEqual = (a: TileType, b: TileType): boolean => {
    return a.row === b.row && a.col === b.col;
};

/**
 * Check if a row and column match a tile's position
 * @param row - Row index to check
 * @param col - Column index to check
 * @param tile - Tile to compare against
 * @returns Boolean indicating if position matches tile
 */
export const isRowColEqual = (row: number, col: number, tile: TileType): boolean => {
    return row === tile.row && col === tile.col;
};

/**
 * Create a promise-based delay
 * @param ms - Number of milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate a random integer between min and max (inclusive)
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer between min and max
 */
export const getRandInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Check if a tile exists in a stack/array
 * @param tile - Tile to search for
 * @param stack - Array of tiles to search in
 * @returns Boolean indicating if tile is found in stack
 */
export const checkStack = (tile: TileType, stack: TileType[]): boolean => {
    for (let i = 0; i < stack.length; i++) {
        if (isEqual(stack[i], tile)) return true;
    }
    return false;
};

/**
 * Remove a tile from a queue/array
 * @param tile - Tile to remove
 * @param queue - Array to remove the tile from
 */
export const dropFromQueue = (tile: TileType, queue: TileType[]): void => {
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) {
            queue.splice(i, 1);
            break;
        }
    }
};
