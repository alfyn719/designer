import type { FC, PropsWithChildren } from "react";
import type {
  GridProps,
  GridStore,
} from "../model/create-grid-store/index.type.ts";

import { useRef } from "react";

import GridContext from "../model/grid-context.ts";
import createGridStore from "../model/create-grid-store";

type GridProviderProps = PropsWithChildren<GridProps>;

const GridProvider: FC<GridProviderProps> = ({ children, ...props }) => {
  const gridStore = useRef<GridStore>();

  if (!gridStore.current) {
    gridStore.current = createGridStore(props);
  }

  return (
    <GridContext.Provider value={gridStore.current}>
      {children}
    </GridContext.Provider>
  );
};

export default GridProvider;
