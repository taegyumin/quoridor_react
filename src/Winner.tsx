import React from "react";
import { Pane, Dialog } from "evergreen-ui";
import { History, Step } from "./Utils";
import { initialStep } from "./App";

interface Props {
  isWin: boolean;
  setWin: (isWin: boolean) => void;
  setHistory: (history: History) => void;
  setStep: (step: Step) => void;
}

const Winner = ({ isWin, setWin, setHistory, setStep }: Props) => {
  return (
    <Pane>
      <Dialog
        isShown={isWin}
        onCancel={() => setWin(false)}
        cancelLabel="Back to board"
        hasHeader={false}
        onConfirm={() => {
          setHistory([initialStep]);
          setStep(initialStep);
          setWin(false);
        }}
        confirmLabel="Restart"
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
