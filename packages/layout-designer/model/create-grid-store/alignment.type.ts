/**
 * alignment on grid container
 */

enum AlignmentContainer {
  justifyContent = "justify-content",
  alignContent = "align-content",
}

type AlignmentContainerKey = keyof typeof AlignmentContainer;
type AlignmentContainerValue = `${AlignmentContainer}`;

/**
 * alignment on grid container for multi grid elements in area
 */

enum AlignmentArea {
  justifyItems = "justify-items",
  alignItems = "align-items",
}

type AlignmentAreaKey = keyof typeof AlignmentArea;
type AlignmentAreaValue = `${AlignmentArea}`;

/**
 * alignment on grid element in area
 */

enum AlignmentElement {
  justifySelf = "justify-self",
  alignSelf = "align-self",
}

type AlignmentElementKey = keyof typeof AlignmentElement;
type AlignmentElementValue = `${AlignmentElement}`;

/**
 * alignment values
 */

enum Alignment {
  Start = "start",
  End = "end",
  Center = "center",
  Stretch = "stretch",
  SpaceAround = "space-around",
  SpaceBetween = "space-between",
  SpaceEvenly = "space-evenly",
}

type AlignmentKey = keyof typeof Alignment;
type AlignmentValue = `${Alignment}`;

// ======= export split line =======

export type { AlignmentContainerKey, AlignmentContainerValue };
export { AlignmentContainer };

export type { AlignmentAreaKey, AlignmentAreaValue };
export { AlignmentArea };

export type { AlignmentElementKey, AlignmentElementValue };
export { AlignmentElement };

export type { AlignmentKey, AlignmentValue };
export { Alignment };
