import React, { useState } from "react";
import { Pane } from "evergreen-ui";
import { GlobalStyle } from "./global-styles";
// import { lightTheme, darkTheme } from "./theme";
import styled, { ThemeProvider } from "styled-components";
import Board from "./Board";
import Winner from "./Winner";
import { v4 as uuid } from "uuid";
import HistoryBar from "./HistoryBar";
import ThemeController from "./ThemeController";
import WallLeftIndicator from "./Player/WallLeftIndicator";
import {
  AppConfig,
  History,
  Step,
  isEven,
  lightTheme,
  darkTheme,
  ThemeType,
  canMove,
  canPut,
} from "./Utils";

const Layout = styled(Pane)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Section = styled(Pane)`
  flex: 1;
  width: 100%;
  flex-shrink: 0;
  padding: 24px;
`;

const appConfig: AppConfig = {
  gameId: uuid(),
  boardHeight: 17,
  boardWidth: 17,
  wallLonger: 60,
  breadth: 12,
  numberOfWalls: 10,
  lengthOfWalls: 2,
  boardColor: lightTheme,
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
  const [isWin, setWin] = useState<boolean>(false);
  const [history, setHistory] = useState<History>([initialStep]);
  const [step, setStep] = useState<Step>(initialStep);
  const move = (position: { x: number; y: number }) => {
    const { stepNumber, player0, player1 } = step;
    const [...walls] = step.walls;

    const nextStep = {
      walls: walls,
      player1: {
        x: step.player1.x,
        y: step.player1.y,
        remainingWalls: step.player1.remainingWalls,
      },
      player0: {
        x: step.player0.x,
        y: step.player0.y,
        remainingWalls: step.player0.remainingWalls,
      },
      stepNumber: step.stepNumber + 1,
    };

    if (isEven(stepNumber)) {
      if (
        !canMove({
          desiredPosition: position,
          opponent: player1,
          me: player0,
          walls,
        })
      )
        return;
      nextStep.player0.x = position.x;
      nextStep.player0.y = position.y;
    } else {
      if (
        !canMove({
          desiredPosition: position,
          opponent: player0,
          me: player1,
          walls,
        })
      )
        return;
      nextStep.player1.x = position.x;
      nextStep.player1.y = position.y;
    }
    setStep(nextStep);
    const newHistory = [
      ...history.filter((step) => step.stepNumber < nextStep.stepNumber),
      nextStep,
    ];
    setHistory(newHistory);
  };
  const put = (position: { x: number; y: number }) => {
    const { stepNumber, player0, player1 } = step;
    const [...walls] = step.walls;
    const { x, y } = position;

    const nextStep = {
      walls,
      player0: {
        x: step.player0.x,
        y: step.player0.y,
        remainingWalls: step.player0.remainingWalls,
      },
      player1: {
        x: step.player1.x,
        y: step.player1.y,
        remainingWalls: step.player1.remainingWalls,
      },
      stepNumber: step.stepNumber + 1,
    };

    const desiredPosition = [];

    if (!isEven(x) && isEven(y)) {
      //wallHorizontal
      if (y === appConfig.boardHeight - 1) {
        desiredPosition.push({ x, y }, { x, y: y - 1 }, { x, y: y - 2 });
      } else {
        desiredPosition.push({ x, y }, { x, y: y + 1 }, { x, y: y + 2 });
      }
    } else if (isEven(x) && !isEven(y)) {
      //wallVertical
      if (x === appConfig.boardWidth - 1) {
        desiredPosition.push({ x, y }, { x: x - 1, y }, { x: x - 2, y });
      } else {
        desiredPosition.push({ x, y }, { x: x + 1, y }, { x: x + 2, y });
      }
    }

    if (
      !canPut({
        desiredPosition,
        walls,
        player0Position: { x: player0.x, y: player0.y },
        player1Position: { x: player1.x, y: player1.y },
      })
    )
      return;

    if (isEven(stepNumber)) {
      if (step.player0.remainingWalls === 0) return;
      nextStep.player0.remainingWalls -= 1;
    } else {
      if (step.player1.remainingWalls === 0) return;
      nextStep.player1.remainingWalls -= 1;
    }
    nextStep.walls = [...walls, ...desiredPosition];
    setStep(nextStep);
    const newHistory = [
      ...history.filter((step) => step.stepNumber < nextStep.stepNumber),
      nextStep,
    ];
    setHistory(newHistory);
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

    const { x, y } = position;
    if (isEven(x) && isEven(y)) {
      //Cell
      temp[x][y] = true;
    } else if (!isEven(x) && isEven(y)) {
      //wallHorizontal
      if (y === appConfig.boardHeight - 1) {
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
      if (x === appConfig.boardWidth - 1) {
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
  const leave = () => {
    const temp = new Array(appConfig.boardHeight).fill(false).map((_) => {
      return new Array(appConfig.boardWidth).fill(false);
    });
    setHover(temp);
  };

  const backward = (): void => {
    if (step.stepNumber === 0) return;
    setStep(history[step.stepNumber - 1]);
  };

  const forward = (): void => {
    if (history.length <= step.stepNumber + 1) return;
    setStep(history[step.stepNumber + 1]);
  };

  const [isCheck, setCheck] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeType>(ThemeType.light);
  const toggleTheme = () => {
    if (theme === ThemeType.light) {
      setTheme(ThemeType.dark);
      appConfig.boardColor = darkTheme;
    } else {
      setTheme(ThemeType.light);
      appConfig.boardColor = lightTheme;
    }
    setCheck(!isCheck);
  };

  return (
    <ThemeProvider theme={theme === ThemeType.light ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout>
        {isWin ? <Winner isWin={isWin} setWin={setWin}></Winner> : null}
        <Section>
          <Pane display="flex" alignItems="center" justifyContent="center">
            <WallLeftIndicator appConfig={appConfig} step={step} id={0} />
            <Board
              appConfig={appConfig}
              step={step}
              move={move}
              put={put}
              isHover={isHover}
              hoverOver={hoverOver}
              leave={leave}
            />
            <WallLeftIndicator appConfig={appConfig} step={step} id={1} />
          </Pane>
          <HistoryBar backward={backward} forward={forward}></HistoryBar>
          <ThemeController
            isCheck={isCheck}
            toggleTheme={toggleTheme}
          ></ThemeController>
        </Section>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
