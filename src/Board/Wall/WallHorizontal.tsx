import React from "react";
import { Pane } from "evergreen-ui";
import { WallColor, Step } from "../../Utils";

interface Props {
  position: { x: number; y: number };
  color: WallColor;
  width: number;
  height: number;
  isHover: boolean[][];
  put: (position: { x: number; y: number }) => void;
  handleHoverOn: (position: { x: number; y: number }) => void;
  handleHoverOff: (position: { x: number; y: number }) => void;
  step: Step;
}

const WallHorizontal = ({
  position,
  color,
  width,
  height,
  isHover,
  put,
  handleHoverOn,
  handleHoverOff,
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
        handleHoverOn(position);
      }}
      onMouseLeave={() => {
        handleHoverOff(position);
      }}
    ></Pane>
  );
};

export default WallHorizontal;
