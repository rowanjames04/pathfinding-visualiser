import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";

const TILE_SIZE = 20;

export function Grid() {
    const {grid} = usePathfinding()

    return (
        <div
            className="flex items-center flex-col justify-center border-sky-300 p-4"
            style={{
                width: MAX_COLS * TILE_SIZE,
                minHeight: MAX_ROWS * TILE_SIZE,
            }}
        >
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((tile, tileIndex) => (
                        <div
                            key={tileIndex}
                            className={`border ${tile.isStart ? 'bg-green-500' : tile.isEnd ? 'bg-red-500' : tile.isWall ? 'bg-gray-800' : 'bg-white'}`}
                            style={{
                                width: TILE_SIZE - 1,
                                height: TILE_SIZE - 1,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
