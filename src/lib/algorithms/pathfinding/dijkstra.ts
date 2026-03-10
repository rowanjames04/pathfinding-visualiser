import type { GridType, TileType } from "../../../utils/types";

import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";

/**
 * Dijkstra's pathfinding algorithm implementation
 * 
 * Dijkstra's algorithm finds the shortest path from a start node to all other nodes
 * in a graph with non-negative edge weights. In this grid implementation, all edges
 * have equal weight (1), making it equivalent to BFS but with explicit distance tracking.
 * 
 * Time Complexity: O(V log V + E) where V is vertices (tiles) and E is edges
 * Space Complexity: O(V) for storing distances and parent pointers
 * 
 * @param grid - 2D array representing the grid with tile information
 * @param startTile - Starting tile coordinates and properties
 * @param endTile - Target/ending tile coordinates and properties
 * @returns Object containing traversed tiles and final path
 * 
 * @example
 * ```typescript
 * const { traversedTiles, path } = dijkstra(grid, startTile, endTile);
 * // traversedTiles: Array of tiles visited during search in order
 * // path: Array of tiles forming the shortest path from start to end
 * ```
 */
export const dijkstra = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
): { traversedTiles: TileType[]; path: TileType[] } => {
    // Initialize data structures
    const traversedTiles: TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    
    // Set up the starting tile with zero distance
    base.distance = 0;
    base.isTraversed = true;
    const untraversedTiles: TileType[] = [base];

    // Main Dijkstra's algorithm loop
    while (untraversedTiles.length > 0) {
        // Sort by distance to implement priority queue behavior
        // Always process the tile with minimum distance first
        untraversedTiles.sort((a, b) => a.distance - b.distance);
        
        const currentTile = untraversedTiles.shift();
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
                const newDistance = currentTile.distance + 1;
                
                // If we found a shorter path to this neighbor
                if (newDistance < neighbour.distance) {
                    // Remove from priority queue if already present
                    dropFromQueue(neighbour, untraversedTiles);
                    
                    // Update neighbor's distance and parent
                    neighbour.distance = newDistance;
                    neighbour.parent = currentTile;
                    
                    // Add to priority queue for further exploration
                    untraversedTiles.push(neighbour);
                }
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
