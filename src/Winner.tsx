import React from "react";
import { Pane, Dialog } from "evergreen-ui";

interface Props {
  isWin: boolean;
  setWin: (isWin: boolean) => void;
}

const Winner = ({ isWin, setWin }: Props) => {
  return (
    <Pane>
      <Dialog
        isShown={isWin}
        onCloseComplete={() => setWin(false)}
        hasHeader={false}
        onConfirm={() => setWin(false)}
      >
        <Pane
          height={100}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          !!! You Win !!!
        </Pane>
      </Dialog>
    </Pane>
  );
};

export default Winner;
