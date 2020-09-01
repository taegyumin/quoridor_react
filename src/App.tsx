import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import Board from "./Board";
import WallLeftIndicator from "./Player/WallLeftIndicator";

interface Props {
  height: number;
  width: number;
  numOfPlayers: number;
  numOfBricks: number;
  stepSize: number;
  lengthOfBricks: number;
}

const mainContent = ({ height, width, numOfPlayers, numOfBricks }: Props) => {
  const option = {
    numOfWallLeft: 10,
    playerNumber: 1,
  };
  const option2 = {
    numOfWallLeft: 10,
    playerNumber: 2,
  };
  return (
    <div>
      <div className="game-info">{WallLeftIndicator(option)}</div>
      <div> {Board({ height, width })}</div>
      <div className="game-info">{WallLeftIndicator(option2)}</div>
    </div>
  );
};

function App() {
  const defaultOption: Props = {
    height: 9,
    width: 9,
    numOfPlayers: 2,
    stepSize: 1,
    numOfBricks: 10,
    lengthOfBricks: 2,
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>1</td>
            <table>
              <tbody>
                <tr>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
    // <div>
    //   <Helmet>
    //     <title>Quoridor</title>
    //     <meta name="viewport" content="width=600" />
    //   </Helmet>
    //   <div className="game">{mainContent(defaultOption)}</div>
    // </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
