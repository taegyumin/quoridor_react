import React from "react";
import { Pane } from "evergreen-ui";
import { WallColor, History } from "../../Utils";

interface Props {
  position: { x: number; y: number };
  color: WallColor;
  width: number;
  height: number;
  isHover: boolean[][];
  history: History;
}

const WallIntersect = ({
  position,
  color,
  width,
  height,
  isHover,
  history,
}: Props) => {
  const { defaultColor, click, hover } = color;

  const { x, y } = position;
  const hoverState = isHover[x][y];

  const currentStep = history[history.length - 1];
  const { walls } = currentStep;
  const onState =
    walls.find((wall) => wall.x === x && wall.y === y) === undefined
      ? false
      : true;

  return (
    <Pane
      key={onState ? click : hoverState ? hover : defaultColor}
      background={onState ? click : hoverState ? hover : defaultColor}
      float="left"
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
    ></Pane>
  );
};

export default WallIntersect;
