import type { GridStore } from "./create-grid-store/index.type.ts";

import { createContext } from "react";

const GridContext = createContext<GridStore | null>(null);

export default GridContext;
