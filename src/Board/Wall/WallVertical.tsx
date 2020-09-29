import React from "react";
import { Pane } from "evergreen-ui";
import { WallColor, Step, isEven } from "../../Utils";

interface Props {
  position: { x: number; y: number };
  color: WallColor;
  width: number;
  height: number;
  put: (position: { x: number; y: number }) => void;
  isHover: boolean[][];
  hoverOver: (position: { x: number; y: number }) => void;
  leave: (position: { x: number; y: number }) => void;
  step: Step;
}

const WallVertical = ({
  position,
  color,
  width,
  height,
  isHover,
  put,
  hoverOver,
  leave,
  step,
}: Props) => {
  const { defaultColor, click, hover } = color;

  const { x, y } = position;
  const hoverState = isHover[x][y];

  const { walls } = step;

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
      onClick={() => {
        put(position);
      }}
      onMouseOver={() => {
        hoverOver(position);
      }}
      onMouseLeave={() => {
        leave(position);
      }}
    ></Pane>
  );
};

export default WallVertical;
