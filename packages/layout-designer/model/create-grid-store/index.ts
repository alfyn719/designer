import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { GridProps, GridState } from "./index.type.ts";

const DEFAULT_PROPS: GridProps = {};

const createGridStore = (initProps: Partial<GridProps>) =>
  createStore<GridState>()(
    devtools(
      immer(() => ({
        ...DEFAULT_PROPS,
        ...initProps,
      })),
    ),
  );

export default createGridStore;
