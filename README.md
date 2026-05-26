# Pathfinding Visualiser

An interactive React + TypeScript visualiser for pathfinding and maze-generation algorithms. Built with Vite, Tailwind CSS, and custom requestAnimationFrame-driven animations.

## Algorithms

### Pathfinding
- **Dijkstra** — weighted shortest-path (guarantees optimal path)
- **A\*** — heuristic-guided shortest-path (optimal with admissible heuristic)
- **Breadth-First Search (BFS)** — unweighted shortest-path
- **Depth-First Search (DFS)** — explores as far as possible before backtracking

### Maze Generation
- **Binary Tree**
- **Recursive Division**

## Features

- Interactive grid (39×49) with draggable start and end tiles
- Click and drag to draw/erase walls
- Step-by-step animation with three speed settings (Slow, Medium, Fast)
- Algorithm selection and maze generation via the top navigation bar
- Smooth tile colour transitions using a centralized animation system

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- react-icons
- Custom animation utilities with `requestAnimationFrame`

## Project Structure

```
src/
  components/          # Grid, Nav, Select, PlayButton, Tile
  context/             # React Context providers (Pathfinding, Tile, Speed)
  hooks/               # Custom hooks for state access
  lib/algorithms/      # Algorithm implementations
    pathfinding/       # aStar, bfs, dfs, dijkstra
    maze/              # binaryTree, recursiveDivision, horizontal/verticalDivision
  utils/               # Helpers, constants, animation, grid reset, etc.
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the port shown in your terminal) to use the visualiser.

## Build

```bash
npm run build
npm run preview
```

## License

MIT
