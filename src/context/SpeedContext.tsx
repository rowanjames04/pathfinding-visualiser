import type { SpeedType } from "../utils/types";
import type { ReactNode } from "react";

import { createContext, useState } from "react";

interface SpeedContextInterface {
    speed: SpeedType;
    setSpeed: (speed: SpeedType) => void
}

export const SpeedContext = createContext<SpeedContextInterface | undefined>(undefined);

export const SpeedProvider = ({children}: {children: ReactNode}) => {
    const [speed, setSpeed] = useState<SpeedType>(0.5);

    return (
        <SpeedContext.Provider 
            value={{
                speed, setSpeed
            }}>
            {children}
        </SpeedContext.Provider>
    )
}