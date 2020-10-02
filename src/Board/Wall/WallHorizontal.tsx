import React from "react";
import { Pane } from "evergreen-ui";
import { PlayerColor } from "../../Utils";

interface Props {
  position: { x: number; y: number };
  color: PlayerColor;
  width: number;
  height: number;
  isClick: boolean;
  isHover: boolean;
  put: (position: { x: number; y: number }) => void;
  hoverOver: (position: { x: number; y: number }) => void;
  leave: () => void;
}

const WallHorizontal = ({
  position,
  color,
  width,
  height,
  isClick,
  isHover,
  put,
  hoverOver,
  leave,
}: Props) => {
  const { background, click, hover } = color;

  return (
    <Pane
      background={isClick ? click : isHover ? hover : background}
      width={width}
      height={height}
      onClick={() => {
        put(position);
      }}
      onMouseOver={() => {
        hoverOver(position);
      }}
      onMouseLeave={() => {
        leave();
      }}
    ></Pane>
  );
};

export default WallHorizontal;
