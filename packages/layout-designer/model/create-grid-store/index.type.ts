import createGridStore from "./index.ts";

import type { ExplicitUnitValue } from "./unit.type.ts";

type GridStore = ReturnType<typeof createGridStore>;

/**
 *
 */
type GridRowStart = number;
type GridColumnStart = number;
type GridRowEnd = number;
type GridColumnEnd = number;

type GridArea = [GridRowStart, GridColumnStart, GridRowEnd, GridColumnEnd];

type GridAreaName = string;

type GridLayout = Record<GridAreaName, GridArea>;

interface GridProps {
  // gutter
  rowUnit: ExplicitUnitValue;
  columnUnit: ExplicitUnitValue;
  rowGap: string;
  columnGap: string;

  // split
  gridTemplateRows: string[];
  gridTemplateColumns: string[];

  // layout
  gridLayout: GridLayout;

  // alignment
}

interface GridState extends GridProps {}

export type { GridProps, GridState, GridStore };
