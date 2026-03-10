import type { GridType, TileType } from "../../../utils/types";

import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";

/**
 * Breadth-First Search (BFS) pathfinding algorithm implementation
 * 
 * BFS explores all nodes at the current depth level before moving to nodes
 * at the next depth level. It guarantees finding the shortest path in an
 * unweighted graph (like our grid where all moves have equal cost).
 * 
 * Time Complexity: O(V + E) where V is vertices (tiles) and E is edges
 * Space Complexity: O(V) for the queue and visited tracking
 * 
 * @param grid - 2D array representing the grid with tile information
 * @param startTile - Starting tile coordinates and properties
 * @param endTile - Target/ending tile coordinates and properties
 * @returns Object containing traversed tiles and final path
 * 
 * @example
 * ```typescript
 * const { traversedTiles, path } = bfs(grid, startTile, endTile);
 * // traversedTiles: Array of tiles visited in breadth-first order
 * // path: Array of tiles forming the shortest path from start to end
 * ```
 */
export const bfs = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
): { traversedTiles: TileType[]; path: TileType[] } => {
    // Initialize data structures
    const traversedTiles: TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    
    // Set up the starting tile
    base.distance = 0;
    base.isTraversed = true;
    const unTraversed: TileType[] = [base];

    // Main BFS algorithm loop using queue
    while (unTraversed.length) {
        // Get the next tile from the front of the queue (FIFO)
        const tile = unTraversed.shift()!;
        
        // Skip walls and stop if we've reached unreachable tiles
        if (tile.isWall) continue;
        if (tile.distance === Infinity) break;
        
        // Mark current tile as visited
        tile.isTraversed = true;
        traversedTiles.push(tile);
        
        // Check if we've reached the destination
        if (isEqual(tile, endTile)) break;

        // Explore all unvisited neighbors
        const neighbours = getUntraversedNeighbours(grid, tile);
        for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];
            
            // Only add to queue if not already present (avoid duplicates)
            if (!isInQueue(neighbour, unTraversed)) {
                // Update neighbor's properties
                neighbour.distance = tile.distance + 1;
                neighbour.parent = tile;
                
                // Add to queue for exploration
                unTraversed.push(neighbour);
            }
        }
    }

    // Reconstruct the shortest path from end to start
    const path: TileType[] = [];
    let current: TileType | null = grid[endTile.row][endTile.col];
    
    while (current != null) {
        current.isPath = true;
        path.unshift(current);
        current = current.parent;
    }
    
    return { traversedTiles, path };
};
