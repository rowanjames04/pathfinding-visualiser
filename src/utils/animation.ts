/**
 * Animation utilities for pathfinding visualizer
 * Centralizes animation timing and provides requestAnimationFrame-based animations
 */

import type { SpeedType } from "./types";

import { SPEEDS } from "./constants";

/**
 * Animation configuration interface
 */
export interface AnimationConfig {
  /** Base delay for traversed tiles */
  traversedDelay: number;
  /** Extended delay for path tiles */
  pathDelay: number;
  /** Wall creation delay */
  wallDelay: number;
  /** Maze generation delay */
  mazeDelay: number;
}

/**
 * Default animation configuration
 */
export const ANIMATION_CONFIG: AnimationConfig = {
  traversedDelay: 8,
  pathDelay: 30,
  wallDelay: 6,
  mazeDelay: 10,
};

/**
 * Get speed multiplier for animation timing
 * @param speed - Speed type (2 = slow, 1 = medium, 0.5 = fast)
 * @returns Speed multiplier
 */
export const getSpeedMultiplier = (speed: SpeedType): number => {
  const speedConfig = SPEEDS.find((s) => s.value === speed);
  return speedConfig ? speedConfig.value : 1;
};

/**
 * Create a promise-based delay for animations
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const createDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Animation frame manager for smoother animations
 */
export class AnimationFrameManager {
  private rafId: number | null = null;
  private isRunning = false;

  /**
   * Run an animation using requestAnimationFrame
   * @param callback - Animation callback function
   * @param duration - Duration in milliseconds
   * @returns Promise that resolves when animation completes
   */
  animate(callback: (progress: number) => void, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        callback(progress);
        
        if (progress < 1) {
          this.rafId = requestAnimationFrame(step);
        } else {
          this.rafId = null;
          this.isRunning = false;
          resolve();
        }
      };
      
      this.isRunning = true;
      this.rafId = requestAnimationFrame(step);
    });
  }

  /**
   * Cancel current animation
   */
  cancel(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
      this.isRunning = false;
    }
  }

  /**
   * Check if animation is currently running
   * @returns Boolean indicating if animation is running
   */
  isAnimating(): boolean {
    return this.isRunning;
  }
}

/**
 * Global animation manager instance
 */
export const animationManager = new AnimationFrameManager();

/**
 * Enhanced sleep function with speed adjustment
 * @param baseTime - Base time in milliseconds
 * @param speed - Speed type for multiplier
 * @returns Promise that resolves after adjusted delay
 */
export const enhancedSleep = async (baseTime: number, speed: SpeedType): Promise<void> => {
  const multiplier = getSpeedMultiplier(speed);
  const adjustedTime = baseTime * multiplier;
  return createDelay(adjustedTime);
};