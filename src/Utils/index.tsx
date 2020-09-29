export type Player = {
  id: number;
  numOfWallLeft: number;
  stepSize: number;
};

export enum Color {
  tint1 = "#F9F9FB",
  tint2 = "#F5F6F7",
  white = "#FFFFFF",
  N3 = "#EDF0F2",
  N5 = "#C7CED4",
  B6 = "#8FBCE6",
  B9 = "#1070CA",
  N10 = "#234361",
  NotionDark = "#2F3437",
  NotionWhite = "#ebebeb",
  RedBase = "#EC4C47",
  RedLight = "#FAE2E2",
  YellowBase = "#F7D154",
  YellowLight = "#FBE6A2",
}

export type BoardColor = {
  wallColor: WallColor;
  cellColor: CellColor;
};

export type WallColor = {
  defaultColor: Color;
  hover: Color;
  click: Color;
};

export type CellColor = {
  defaultColor: Color;
  player1Color: {
    hover: Color;
    click: Color;
  };
  player0Color: {
    hover: Color;
    click: Color;
  };
};

export type AppConfig = {
  boardColor: BoardColor;
  boardHeight: number;
  boardWidth: number;
  breadth: number;
  wallLonger: number;
  numberOfPlayers: number;
  numberOfWalls: number;
  lengthOfWalls: number;
};

export type History = Step[];

export type Step = {
  walls: { x: number; y: number }[];
  player1: {
    x: number;
    y: number;
    remainingWalls: number;
  };
  player0: {
    x: number;
    y: number;
    remainingWalls: number;
  };
  stepNumber: number;
};

export const isEven = (number: number) => {
  if (number % 2 === 0) return true;
  return false;
};
