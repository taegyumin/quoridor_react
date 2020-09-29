import React from "react";
import { Pane, Text } from "evergreen-ui";
import { AppConfig, Step } from "../Utils";

interface Props {
  appConfig: AppConfig;
  step: Step;
  id: number;
}

const WallLeftIndicator = ({ appConfig, step, id }: Props) => {
  const { stepNumber } = step;
  const { boardColor, wallLonger, breadth } = appConfig;
  const { cellColor } = boardColor;
  const { player0Color, player1Color } = cellColor;


  const { remainingWalls } =
    id === 0
      ? history[history.length - 1].player0
      : history[history.length - 1].player1;

  return (
    <Pane
      width={700}
      height={100}
      marginTop={20}
      marginBottom={20}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {new Array(remainingWalls).fill(1).map((_, idx) => {
        return (
          <Pane
            key={idx}
            background={id === 0 ? player0Color.click : player1Color.click}
            float="left"
            width={breadth}
            height={wallLonger}
            margin={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Pane>
        );
      })}
      {stepNumber % 2 === id ? <Text>{"YOUR TURN"}</Text> : null}
    </Pane>
  );
};

export default WallLeftIndicator;
