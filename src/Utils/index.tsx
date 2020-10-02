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
  N8 = "#66788A",
  N9 = "#425A70",
  B6 = "#8FBCE6",
  B9 = "#1070CA",
  N10 = "#234361",
  NotionDark = "#2F3437",
  NotionWhite = "#ebebeb",
  RedBase = "#EC4C47",
  RedLight = "#FAE2E2",
  YellowBase = "#F7D154",
  YellowLight = "#FBE6A2",
  White = "#FFFFFF",
  Black = "#000000",
  Hex = "#2F3437",
  eb = "#ebebeb",
  b8 = "#6B8096",
}

export const lightTheme = {
  bgColor: Color.White,
  textColor: Color.Black,
  toggleBorder: Color.Black,
  gradient: "linear-gradient(#39598A, #79D7ED)",
  wallColor: {
    player1: {
      background: Color.NotionWhite,
      hover: Color.N5,
      click: Color.NotionDark,
    },
    player0: {
      background: Color.NotionWhite,
      hover: Color.N5,
      click: Color.NotionDark,
    },
  },
  cellColor: {
    player1: {
      background: Color.white,
      hover: Color.N5,
      click: Color.RedBase,
    },
    player0: {
      background: Color.white,
      hover: Color.N5,
      click: Color.YellowBase,
    },
  },
};

export const darkTheme = {
  bgColor: Color.Hex,
  textColor: Color.eb,
  toggleBorder: Color.b8,
  gradient: "linear-gradient(#091236, #1E215D)",
  wallColor: {
    player1: {
      background: Color.N9,
      hover: Color.N5,
      click: Color.Black,
    },
    player0: {
      background: Color.N9,
      hover: Color.N5,
      click: Color.Black,
    },
  },
  cellColor: {
    player1: {
      background: Color.NotionDark,
      hover: Color.N5,
      click: Color.RedBase,
    },
    player0: {
      background: Color.NotionDark,
      hover: Color.N5,
      click: Color.YellowBase,
    },
  },
};

export enum Theme {
  lightTheme,
  darkTheme,
}

export enum ThemeType {
  "light",
  "dark",
}

export type BoardColor = {
  wallColor: WallColor;
  cellColor: CellColor;
  bgColor: Color;
  textColor: Color;
  toggleBorder: Color;
  gradient: string;
};

export type PlayerColor = {
  background: Color;
  hover: Color;
  click: Color;
};

export type WallColor = {
  player1: PlayerColor;
  player0: PlayerColor;
};

export type CellColor = {
  player1: PlayerColor;
  player0: PlayerColor;
};

export type AppConfig = {
  gameId: string;
  boardColor: BoardColor;
  boardHeight: number;
  boardWidth: number;
  breadth: number;
  wallLonger: number;
  numberOfWalls: number;
  lengthOfWalls: number;
  numberOfPlayers?: number;
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

interface Props {
  opponent: { x: number; y: number };
  me: { x: number; y: number };
  desiredPosition: { x: number; y: number };
  walls: { x: number; y: number }[];
}

export const canMove = ({
  opponent,
  me,
  desiredPosition,
  walls,
}: Props): boolean => {
  if (
    Math.abs(me.x - desiredPosition.x) + Math.abs(me.y - desiredPosition.y) !==
    2
  )
    //TO-DO: replace RHS 2 with each player's stepSize in appConfig.
    return false;

  if (
    Math.abs(opponent.x - desiredPosition.x) +
      Math.abs(opponent.y - desiredPosition.y) ===
    0
  )
    return false;

  if (
    walls.find(
      (wall) =>
        wall.x === (me.x + desiredPosition.x) / 2 &&
        wall.y === (me.y + desiredPosition.y) / 2
    )
      ? true
      : false
  ) {
    //TO-DO: Get positions where walls can block moving. Then verify that there is a wall at the position.
    return false;
  }

  return true;
};

export const canPut = ({
  desiredPosition,
  walls,
  player0Position,
  player1Position,
}: {
  desiredPosition: { x: number; y: number }[];
  walls: { x: number; y: number }[];
  player0Position: { x: number; y: number };
  player1Position: { x: number; y: number };
}): boolean => {
  // TO-DO: 안 되는 케이스 거르기. 페구간 알고리즘 vs 최단거리 알고리즘
  return true;
};
