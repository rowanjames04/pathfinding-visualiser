import type { SpeedType, TileType } from "./types";

import { ANIMATION_TIMING, PATH_TILE_STYLE, SPEEDS, TRAVERSED_TILE_STYLE } from "./constants";
import { enhancedSleep, getSpeedMultiplier } from "./animation";
import { isEqual } from "./helpers";

/**
 * Animate the pathfinding visualization with improved timing and performance
 * 
 * This function animates both the traversal of tiles during the search and
 * the final path reconstruction. Uses enhanced timing for smoother animations.
 * 
 * @param traversedTiles - Array of tiles visited during the search
 * @param path - Array of tiles forming the final path
 * @param startTile - Starting tile (will not be animated)
 * @param endTile - Ending tile (will not be animated)
 * @param speed - Animation speed multiplier
 */
export const animatePath = async (
    traversedTiles: TileType[],
    path: TileType[],
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType
): Promise<void> => {
    const speedMultiplier = getSpeedMultiplier(speed);
    
    // Animate traversed tiles
    for (let i = 0; i < traversedTiles.length; i++) {
        const tile = traversedTiles[i];
        
        // Skip start and end tiles for animation
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
                const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
                if (tileElement) {
                    tileElement.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
                }
            });
        }
        
        // Wait for the appropriate delay
        await enhancedSleep(ANIMATION_TIMING.SLEEP_TIME, speed);
    }

    // Wait a brief moment before starting path animation
    await enhancedSleep(ANIMATION_TIMING.EXTENDED_SLEEP_TIME, speed);

    // Animate final path
    for (let i = 0; i < path.length; i++) {
        const tile = path[i];
        
        // Skip start and end tiles for animation
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
                const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
                if (tileElement) {
                    tileElement.className = `${PATH_TILE_STYLE} animate-path`;
                }
            });
        }
        
        // Wait for the appropriate delay
        await enhancedSleep(ANIMATION_TIMING.EXTENDED_SLEEP_TIME, speed);
    }
};
