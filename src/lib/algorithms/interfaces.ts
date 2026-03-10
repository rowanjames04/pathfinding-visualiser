/**
 * Algorithm interface definitions for pathfinding algorithms
 * Provides a consistent API for all pathfinding algorithms
 */

import type { GridType, TileType } from "../../utils/types";

/**
 * Result of a pathfinding algorithm execution
 */
export interface AlgorithmResult {
  /** Array of tiles that were traversed during the search */
  traversedTiles: TileType[];
  /** Array of tiles forming the path from start to end */
  path: TileType[];
}

/**
 * Base interface for all pathfinding algorithms
 */
export interface PathfindingAlgorithm {
  /**
   * Execute the pathfinding algorithm
   * @param grid - The grid to search on
   * @param startTile - Starting tile
   * @param endTile - Target/ending tile
   * @returns Algorithm result containing traversed tiles and path
   */
  execute(grid: GridType, startTile: TileType, endTile: TileType): AlgorithmResult;

  /**
   * Get the name of the algorithm
   * @returns Human-readable name of the algorithm
   */
  getName(): string;

  /**
   * Get the algorithm's time complexity
   * @returns Time complexity description
   */
  getTimeComplexity(): string;

  /**
   * Get the algorithm's space complexity
   * @returns Space complexity description
   */
  getSpaceComplexity(): string;
}

/**
 * Abstract base class for pathfinding algorithms
 * Provides common functionality and enforces implementation of required methods
 */
export abstract class BasePathfindingAlgorithm implements PathfindingAlgorithm {
  /**
   * Execute the pathfinding algorithm
   * @param grid - The grid to search on
   * @param startTile - Starting tile
   * @param endTile - Target/ending tile
   * @returns Algorithm result containing traversed tiles and path
   */
  abstract execute(grid: GridType, startTile: TileType, endTile: TileType): AlgorithmResult;

  /**
   * Get the name of the algorithm
   * @returns Human-readable name of the algorithm
   */
  abstract getName(): string;

  /**
   * Get the algorithm's time complexity
   * @returns Time complexity description
   */
  abstract getTimeComplexity(): string;

  /**
   * Get the algorithm's space complexity
   * @returns Space complexity description
   */
  abstract getSpaceComplexity(): string;

  /**
   * Reset tile properties for a fresh algorithm run
   * @param grid - Grid to reset
   * @param startTile - Starting tile (will not be reset)
   * @param endTile - Ending tile (will not be reset)
   */
  protected resetGridForAlgorithm(grid: GridType, startTile: TileType, endTile: TileType): void {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const tile = grid[row][col];
        
        // Skip start and end tiles
        if (tile === startTile || tile === endTile) continue;
        
        // Reset tile properties
        tile.distance = Infinity;
        tile.isTraversed = false;
        tile.isPath = false;
        tile.parent = null;
      }
    }
  }

  /**
   * Reconstruct path from end tile to start tile
   * @param endTile - The end tile to start path reconstruction from
   * @returns Array of tiles forming the path
   */
  protected reconstructPath(endTile: TileType): TileType[] {
    const path: TileType[] = [];
    let current: TileType | null = endTile;
    
    while (current != null) {
      current.isPath = true;
      path.unshift(current);
      current = current.parent;
    }
    
    return path;
  }

  /**
   * Mark tiles as traversed for visualization
   * @param tiles - Array of tiles to mark as traversed
   */
  protected markTraversedTiles(tiles: TileType[]): void {
    tiles.forEach(tile => {
      tile.isTraversed = true;
    });
  }
}

/**
 * Algorithm registry for managing available algorithms
 */
export class AlgorithmRegistry {
  private static algorithms: Map<string, PathfindingAlgorithm> = new Map();

  /**
   * Register an algorithm
   * @param key - Unique identifier for the algorithm
   * @param algorithm - Algorithm instance
   */
  static register(key: string, algorithm: PathfindingAlgorithm): void {
    this.algorithms.set(key, algorithm);
  }

  /**
   * Get an algorithm by key
   * @param key - Algorithm identifier
   * @returns Algorithm instance or undefined
   */
  static get(key: string): PathfindingAlgorithm | undefined {
    return this.algorithms.get(key);
  }

  /**
   * Get all registered algorithms
   * @returns Array of all registered algorithms
   */
  static getAll(): PathfindingAlgorithm[] {
    return Array.from(this.algorithms.values());
  }

  /**
   * Check if an algorithm is registered
   * @param key - Algorithm identifier
   * @returns Boolean indicating if algorithm is registered
   */
  static has(key: string): boolean {
    return this.algorithms.has(key);
  }

  /**
   * Get algorithm keys
   * @returns Array of registered algorithm keys
   */
  static getKeys(): string[] {
    return Array.from(this.algorithms.keys());
  }
}