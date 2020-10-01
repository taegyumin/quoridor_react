import React from "react";
import { Pane } from "evergreen-ui";
import { PlayerColor } from "../../Utils";

interface Props {
  color: PlayerColor;
  width: number;
  height: number;
  isClick: boolean;
  isHover: boolean;
}

const WallIntersect = ({ color, width, height, isClick, isHover }: Props) => {
  const { background, click, hover } = color;
  return (
    <Pane
      background={isClick ? click : isHover ? hover : background}
      width={width}
      height={height}
    ></Pane>
  );
};

export default WallIntersect;
