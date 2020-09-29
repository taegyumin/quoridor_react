import React, { useState } from "react";
import { Pane, Heading, Checkbox, Text, Switch } from "evergreen-ui";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyle } from "./global-styles";
import WallLeftIndicator from "./Player/WallLeftIndicator";
import Board from "./Board";
import { AppConfig, Color, History, isEven } from "./Utils";
import { v4 as uuid } from "uuid";

const Layout = styled(Pane)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionTab = styled(Pane)`
  flex: 1;
  width: 20%;
  flex-shrink: 0;
  padding: 24px;
`;

const Section = styled(Pane)`
  flex: 1;
  width: 100%;
  flex-shrink: 0;
  padding: 24px;
`;

const Header = styled(Pane)`
  display: flex;
  padding: 10px 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const gameId = uuid();

// export const history: History = [];
const appConfig: AppConfig = {
  boardHeight: 17,
  boardWidth: 17,
  // boardColor: {
  //   wallColor: {
  //     defaultColor: Color.N3,
  //     hover: Color.N5,
  //     click: Color.N10,
  //   },
  //   cellColor: {
  //     defaultColor: Color.white,
  //     player1Color: {
  //       hover: Color.N5,
  //       click: Color.N10,
  //     },
  //     player0Color: {
  //       hover: Color.B6,
  //       click: Color.B9,
  //     },
  //   },
  // },
  boardColor: {
    wallColor: {
      defaultColor: Color.NotionWhite,
      hover: Color.N5,
      click: Color.NotionDark,
    },
    cellColor: {
      defaultColor: Color.white,
      player1Color: {
        hover: Color.RedLight,
        click: Color.RedBase,
      },
      player0Color: {
        hover: Color.YellowLight,
        click: Color.YellowBase,
      },
    },
  },
  wallLonger: 60,
  breadth: 12,
  numberOfPlayers: 2,
  numberOfWalls: 10,
  lengthOfWalls: 2,
};
const initialStep = {
  player0: {
    x: (appConfig.boardWidth - 1) / 2,
    y: 0,
    remainingWalls: appConfig.numberOfWalls,
  },
  player1: {
    x: (appConfig.boardWidth - 1) / 2,
    y: appConfig.boardHeight - 1,
    remainingWalls: appConfig.numberOfWalls,
  },
  walls: [],
  stepNumber: 0,
};

function App() {
  const [isSideTabShown, setSideTabShown] = useState<boolean>(true);
  const [history, setHistory] = useState<History>([initialStep]);

  const move = (position: { x: number; y: number }) => {
    const currentStep = history[history.length - 1];
    const { stepNumber } = currentStep;

    if (isEven(stepNumber)) {
      if (
        Math.abs(currentStep.player1.x - position.x) +
          Math.abs(currentStep.player1.y - position.y) ===
          2 &&
        Math.abs(currentStep.player0.x - position.x) +
          Math.abs(currentStep.player0.y - position.y) !==
          0
      ) {
        currentStep.player1.x = position.x;
        currentStep.player1.y = position.y;
        currentStep.stepNumber += 1;
        const temp = [...history, currentStep];
        setHistory(temp);
      }
    } else {
      if (
        Math.abs(currentStep.player0.x - position.x) +
          Math.abs(currentStep.player0.y - position.y) ===
          2 &&
        Math.abs(currentStep.player1.x - position.x) +
          Math.abs(currentStep.player1.y - position.y) !==
          0
      ) {
        currentStep.player0.x = position.x;
        currentStep.player0.y = position.y;
        currentStep.stepNumber += 1;
        const temp = [...history, currentStep];
        setHistory(temp);
      }
    }
  };

  const put = (position: { x: number; y: number }) => {
    const currentStep = history[history.length - 1];
    const { stepNumber } = currentStep;

    if (stepNumber % 2 !== 0) {
      currentStep.player1.remainingWalls -= 1;
    } else {
      currentStep.player0.remainingWalls -= 1;
    }

    const { x, y } = position;
      currentStep.walls.push(position);
      currentStep.walls.push({ x: x, y: y + 1 });
      currentStep.walls.push({ x: x, y: y + 2 });
    if (!isEven(x) && isEven(y)) {
      currentStep.stepNumber += 1;
      const temp = [...history, currentStep];
      setHistory(temp);
      currentStep.walls.push(position);
      currentStep.walls.push({ x: x + 1, y: y });
      currentStep.walls.push({ x: x + 2, y: y });
    } else if (isEven(x) && !isEven(y)) {
      currentStep.stepNumber += 1;
      const temp = [...history, currentStep];
      setHistory(temp);
    }
  };

  const [isHover, setHover] = useState<boolean[][]>(
    new Array(appConfig.boardHeight).fill(false).map((_) => {
      return new Array(appConfig.boardWidth).fill(false);
    })
  );

  const hoverOver = (position: { x: number; y: number }) => {
    const temp = new Array(appConfig.boardHeight).fill(false).map((_) => {
      return new Array(appConfig.boardWidth).fill(false);
    });
    const currentStep = history[history.length - 1];
    const { stepNumber } = currentStep;

    const { x, y } = position;
    console.log(x, y);
    if (isEven(x) && isEven(y)) {
      //Cell
      temp[x][y] = true;
    } else if (!isEven(x) && isEven(y)) {
      //wallHorizontal
      if (y === 16) {
        temp[x][y] = true;
        temp[x][y - 1] = true;
        temp[x][y - 2] = true;
      } else {
        temp[x][y] = true;
        temp[x][y + 1] = true;
        temp[x][y + 2] = true;
      }
    } else if (isEven(x) && !isEven(y)) {
      //wallVertical
      if (x === 16) {
        temp[x][y] = true;
        temp[x - 1][y] = true;
        temp[x - 2][y] = true;
      } else {
        temp[x][y] = true;
        temp[x + 1][y] = true;
        temp[x + 2][y] = true;
      }
    }
    // else: wallIntersect
    setHover(temp);
  };

  const leave = (position: { x: number; y: number }) => {
    const temp = new Array(appConfig.boardHeight).fill(false).map((_) => {
      return new Array(appConfig.boardWidth).fill(false);
    });
    setHover(temp);
  };

  const [isChecked, setChecked] = useState<boolean>(false);

  const [theme, setTheme] = useState("light");

  const isLight = theme === "light";

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout alignItems="center" justifyContent="center">
        {/* <Header background="blueTint" alignItems="center" borderBottom>
          <Heading color="default" size={600}>
            Quoridor React
          </Heading>
          <Checkbox
            marginLeft="auto"
            size={60}
            checked={isSideTabShown}
            onChange={() => setSideTabShown((isShown) => !isShown)}
            label="Show Side Tab"
          />
        </Header> */}
        <Board
          appConfig={appConfig}
          step={history[history.length - 1]}
          move={move}
          put={put}
          isHover={isHover}
          hoverOver={hoverOver}
          leave={leave}
        />
        <button
          onClick={() => {
            toggleTheme();
          }}
        >
          Dark Mode
        </button>
        {/* {isSideTabShown && (
            <WallLeftIndicator
              appConfig={appConfig}
              step={history[history.length - 1]}
              id={0}
            />
            <WallLeftIndicator
              appConfig={appConfig}
              step={history[history.length - 1]}
              id={1}
            />
          <SectionTab borderLeft>
            <Switch
              checked={isChecked}
              onClick={() => {
                setChecked(!isChecked);
                toggleTheme();
              }}
            >
              Dark Mode
            </Switch>
            <Text> Dark Mode </Text>
          </SectionTab>
        )} */}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
