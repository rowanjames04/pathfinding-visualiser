import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { checkStack, isEqual } from "../../../utils/helpers";
import type { GridType, TileType } from "../../../utils/types";

/**
 * Depth-First Search (DFS) pathfinding algorithm implementation
 * 
 * DFS explores as far as possible along each branch before backtracking.
 * It does not guarantee finding the shortest path but can be useful for
 * exploring all possible paths or when the goal is to find any path quickly.
 * 
 * Time Complexity: O(V + E) where V is vertices (tiles) and E is edges
 * Space Complexity: O(V) for the stack and visited tracking
 * 
 * @param grid - 2D array representing the grid with tile information
 * @param startTile - Starting tile coordinates and properties
 * @param endTile - Target/ending tile coordinates and properties
 * @returns Object containing traversed tiles and final path
 * 
 * @example
 * ```typescript
 * const { traversedTiles, path } = dfs(grid, startTile, endTile);
 * // traversedTiles: Array of tiles visited in depth-first order
 * // path: Array of tiles forming a path from start to end (not necessarily shortest)
 * ```
 */
export const dfs = (
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
    const untraversedTiles: TileType[] = [base];

    // Main DFS algorithm loop using stack
    while (untraversedTiles.length > 0) {
        // Get the next tile from the top of the stack (LIFO)
        const currentTile = untraversedTiles.pop();
        if (currentTile) {
            // Skip walls and stop if we've reached unreachable tiles
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;
            
            // Mark current tile as visited
            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);
            
            // Check if we've reached the destination
            if (isEqual(currentTile, endTile)) break;

            // Explore all unvisited neighbors
            const neighbours = getUntraversedNeighbours(grid, currentTile);
            for (let i = 0; i < neighbours.length; i++) {
                const neighbour = neighbours[i];
                
                // Only add to stack if not already present (avoid duplicates)
                if (!checkStack(neighbour, untraversedTiles)) {
                    // Update neighbor's properties
                    neighbour.distance = currentTile.distance + 1;
                    neighbour.parent = currentTile;
                    
                    // Add to stack for exploration (LIFO order)
                    untraversedTiles.push(neighbour);
                }
            }
        }
    }

    // Reconstruct the path from end to start
    const path: TileType[] = [];
    let current: TileType | null = grid[endTile.row][endTile.col];
    
    while (current != null) {
        current.isPath = true;
        path.unshift(current);
        current = current.parent;
    }
    
    return { traversedTiles, path };
};
