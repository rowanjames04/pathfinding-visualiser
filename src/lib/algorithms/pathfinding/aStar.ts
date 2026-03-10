import type { GridType, TileType } from "../../../utils/types";

import { initFunctionCost, initHeuristicCost } from "../../../utils/heuristics";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";

/**
 * A* (A-star) pathfinding algorithm implementation
 * 
 * A* is an informed search algorithm that finds the shortest path from start to end
 * using a heuristic function to guide the search. It combines the actual cost from
 * start (g-cost) with the estimated cost to end (h-cost) to determine the total cost (f-cost).
 * 
 * Time Complexity: O(b^d) where b is branching factor and d is depth
 * Space Complexity: O(b^d) for storing the open and closed sets
 * 
 * @param grid - 2D array representing the grid with tile information
 * @param startTile - Starting tile coordinates and properties
 * @param endTile - Target/ending tile coordinates and properties
 * @returns Object containing traversed tiles and final path
 * 
 * @example
 * ```typescript
 * const { traversedTiles, path } = aStar(grid, startTile, endTile);
 * // traversedTiles: Array of tiles visited during search
 * // path: Array of tiles forming the shortest path from start to end
 * ```
 */
export const aStar = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
): { traversedTiles: TileType[]; path: TileType[] } => {
    // Initialize data structures
    const traversedTiles: TileType[] = [];
    const heuristicCost = initHeuristicCost(grid, endTile);
    const functionCost = initFunctionCost();

    // Set up the starting tile
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    functionCost[base.row][base.col] = base.distance + heuristicCost[base.row][base.col];
    base.isTraversed = true;
    const untraversedTiles: TileType[] = [base];

    // Main A* search loop
    while (untraversedTiles.length > 0) {
        // Sort tiles by f-cost (g-cost + h-cost), then by g-cost as tiebreaker
        untraversedTiles.sort((a, b) => {
            const fCostA = functionCost[a.row][a.col];
            const fCostB = functionCost[b.row][b.col];
            
            if (fCostA === fCostB) {
                // If f-costs are equal, prefer tiles with lower g-cost (shorter actual path)
                return b.distance - a.distance;
            }
            return fCostA - fCostB;
        });

        const currentTile = untraversedTiles.shift();
        if (currentTile) {
            // Skip walls and stop if we've reached maximum distance
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;
            
            // Mark current tile as visited
            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);
            
            // Check if we've reached the destination
            if (isEqual(currentTile, endTile)) break;

            // Explore neighbors
            const neighbours = getUntraversedNeighbours(grid, currentTile);
            for (let i = 0; i < neighbours.length; i++) {
                const neighbour = neighbours[i];
                const distanceToNeighbour = currentTile.distance + 1;
                
                // If we found a shorter path to this neighbor
                if (distanceToNeighbour < neighbour.distance) {
                    // Remove from open set if present
                    dropFromQueue(neighbour, untraversedTiles);
                    
                    // Update neighbor's properties
                    neighbour.distance = distanceToNeighbour;
                    functionCost[neighbour.row][neighbour.col] = neighbour.distance + heuristicCost[neighbour.row][neighbour.col];
                    neighbour.parent = currentTile;
                    
                    // Add to open set for further exploration
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
