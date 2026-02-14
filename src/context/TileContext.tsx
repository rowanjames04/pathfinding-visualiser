import type { TileType } from "../utils/types";
import type { ReactNode } from "react";


import { createContext } from "react";

interface TileContextInterface {
    startTile: TileType;
    setStartTile: (startTile: TileType) => void;
    endTile: TileType;
    setEndTile: (endTile: TileType) => void;
}

export const TileContext = createContext<TileContextInterface | undefined>(
    undefined
);

export const TileProvider = ({children}: {children: ReactNode}) => {
    
}