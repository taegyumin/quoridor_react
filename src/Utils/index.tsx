import { initialStep } from "../App"
import {Board} from "../Board"

//import console = require("console");

export type Player = {
  id: number;
  numOfWallLeft: number;
  stepSize: number;
};

export enum Color {
  tint1 = "#F9F9FB",
  tint2 = "#F5F6F7",
  white = "#FFFFFF",
  N3 = "#EDF0F2",
  N5 = "#C7CED4",
  N8 = "#66788A",
  N9 = "#425A70",
  B6 = "#8FBCE6",
  B9 = "#1070CA",
  N10 = "#234361",
  NotionDark = "#2F3437",
  NotionWhite = "#ebebeb",
  RedBase = "#EC4C47",
  RedLight = "#FAE2E2",
  YellowBase = "#F7D154",
  YellowLight = "#FBE6A2",
  White = "#FFFFFF",
  Black = "#000000",
  Hex = "#2F3437",
  eb = "#ebebeb",
  b8 = "#6B8096",
}

export const lightTheme = {
  bgColor: Color.White,
  textColor: Color.Black,
  toggleBorder: Color.Black,
  gradient: "linear-gradient(#39598A, #79D7ED)",
  wallColor: {
    player1: {
      background: Color.NotionWhite,
      hover: Color.N5,
      click: Color.NotionDark,
    },
    player0: {
      background: Color.NotionWhite,
      hover: Color.N5,
      click: Color.NotionDark,
    },
  },
  cellColor: {
    player1: {
      background: Color.white,
      hover: Color.N5,
      click: Color.RedBase,
    },
    player0: {
      background: Color.white,
      hover: Color.N5,
      click: Color.YellowBase,
    },
  },
};

export const darkTheme = {
  bgColor: Color.Hex,
  textColor: Color.eb,
  toggleBorder: Color.b8,
  gradient: "linear-gradient(#091236, #1E215D)",
  wallColor: {
    player1: {
      background: Color.N9,
      hover: Color.N5,
      click: Color.Black,
    },
    player0: {
      background: Color.N9,
      hover: Color.N5,
      click: Color.Black,
    },
  },
  cellColor: {
    player1: {
      background: Color.NotionDark,
      hover: Color.N5,
      click: Color.RedBase,
    },
    player0: {
      background: Color.NotionDark,
      hover: Color.N5,
      click: Color.YellowBase,
    },
  },
};

export enum Theme {
  lightTheme,
  darkTheme,
}

export enum ThemeType {
  "light",
  "dark",
}

export type BoardColor = {
  wallColor: WallColor;
  cellColor: CellColor;
  bgColor: Color;
  textColor: Color;
  toggleBorder: Color;
  gradient: string;
};

export type PlayerColor = {
  background: Color;
  hover: Color;
  click: Color;
};

export type WallColor = {
  player1: PlayerColor;
  player0: PlayerColor;
};

export type CellColor = {
  player1: PlayerColor;
  player0: PlayerColor;
};

export type AppConfig = {
  gameId: string;
  boardColor: BoardColor;
  boardHeight: number;
  boardWidth: number;
  breadth: number;
  wallLonger: number;
  numberOfWalls: number;
  lengthOfWalls: number;
  numberOfPlayers?: number;
  player0Destination: { x: number; y: number }[];
  player1Destination: { x: number; y: number }[];
};

export type History = Step[];

export type Step = {
  walls: { x: number; y: number }[];
  player1: {
    x: number;
    y: number;
    remainingWalls: number;
  };
  player0: {
    x: number;
    y: number;
    remainingWalls: number;
  };
  stepNumber: number;
};

export const isEven = (number: number) => {
  if (number % 2 === 0) return true;
  return false;
};

interface Props {
  opponent: { x: number; y: number };
  me: { x: number; y: number };
  desiredPosition: { x: number; y: number };
  walls: { x: number; y: number }[];
}

export const canMove = ({
  opponent,
  me,
  desiredPosition,
  walls,
}: Props): boolean => {
  if (Math.abs(me.x - opponent.x) + Math.abs(me.y - opponent.y) === 2) {
    if (
      Math.abs(me.x - desiredPosition.x) +
        Math.abs(me.y - desiredPosition.y) ===
        4 &&
      me.x + desiredPosition.x === opponent.x * 2 &&
      me.y + desiredPosition.y === opponent.y * 2
    )
      return true;
  } else {
    if (
      walls.find(
        (wall) =>
          wall.x === (me.x + desiredPosition.x) / 2 &&
          wall.y === (me.y + desiredPosition.y) / 2
      )
        ? true
        : false
    ) {
      //TO-DO: Get positions where walls can block moving. Then verify that there is a wall at the position.
      return false;
    }
  }
  if (
    Math.abs(me.x - desiredPosition.x) + Math.abs(me.y - desiredPosition.y) !==
    2
  )
    //TO-DO: replace RHS 2 with each player's stepSize in appConfig.
    return false;

  return true;
};


export const canPut = ({
  desiredPosition,
  walls,
  player0Position,
  player1Position,
}: {
  desiredPosition: { x: number; y: number }[];
  walls: { x: number; y: number }[];
  player0Position: { x: number; y: number };
  player1Position: { x: number; y: number };
}): boolean => {
  if (!walls.length) return true;

  if (
    walls.reduce((acc, wall) => {
      return (
        acc ||
        desiredPosition.reduce((acc2, p) => {
          return acc2 || (p.x === wall.x && p.y === wall.y);
        }, false)
      );
    }, false)
  )
    return false;




  


  let exploredCells0 = new Set<{x: number; y: number}>();
  exploredCells0.clear();
  exploredCells0.add({x: player0Position.x, y: player0Position.y});

  let exploredCells1 = new Set<{x: number; y: number}>();
  exploredCells1.add({x: player1Position.x, y: player1Position.y});
  
  const finishLineCells0 : {x: number; y: number}[] = [];
  var num; 
  for (num = 0; num < 9; num+=2){
    finishLineCells0.push({x: num, y: 16});
  }
  
  const finishLineCells1 : {x: number; y: number}[] = [];
  var num2; 
  for (num2 = 0; num2 < 9; num2+=2){
    finishLineCells1.push({x: num2, y: 0});
  }
  
  let newPathsFound0: number = 1;
  const nextStepWalls: {x: number; y: number}[] = [...walls, ...desiredPosition];

  function exploreCells(value: { x: number; y: number; }, value2: { x: number; y: number; }, set: Set<{ x: number; y: number; }>)
  {
    console.log('explore')
    if (!set.has({x: value.x, y: value.y + 2})){
    if(value.y + 2 <= 16){
    if (canMove({
        opponent: player1Position,
        me: player0Position,
        desiredPosition: {x: value.x, y: (value.y + 2)},
        walls: nextStepWalls,
      })
      ){
        //if (exploredCells0.add({x: value.x, y: value.y + 2}) ? true : false){
          exploredCells0.add({x: value.x, y: value.y + 2});
          newPathsFound0 += 1;
        //}
      }
    }
  }
  if (!set.has({x: value.x, y: value.y - 2})){
      if(value.y - 2 >= 0){
      if (canMove({
        opponent: player1Position,
        me: player0Position,
        desiredPosition: {x: value.x, y: (value.y - 2)},
        walls: nextStepWalls,
      })
      ){
        //if (exploredCells0.add({x: value.x, y: value.y - 2}) ? true : false){
          exploredCells0.add({x: value.x, y: value.y - 2});
          newPathsFound0 += 1;
        //}
      }
    }
  }
  if (!set.has({x: value.x + 2, y: value.y})){
    if(value.x + 2 <= 16){
      if (canMove({
        opponent: player1Position,
        me: player0Position,
        desiredPosition: {x: value.x + 2, y: (value.y)},
        walls: nextStepWalls,
      })
      ){
        //if (exploredCells0.add({x: value.x + 2, y: value.y}) ? true : false){
          exploredCells0.add({x: value.x + 2, y: value.y});
          newPathsFound0 += 1;
        //}
      }
    }
  }
    if (!set.has({x: value.x - 2, y: value.y})){
      if(value.x - 2 >= 0){
      if (canMove({
        opponent: player1Position,
        me: player0Position,
        desiredPosition: {x: value.x - 2, y: (value.y)},
        walls: nextStepWalls,
      })
      ){
        //if (exploredCells0.add({x: value.x - 2, y: value.y}) ? true : false){
          exploredCells0.add({x: value.x - 2, y: value.y});
          newPathsFound0 += 1;
        //}
      }
    }
  }
    }

  function checkFinishLine(value: { x: number; y: number; }, value2: { x: number; y: number; }, set: Set<{ x: number; y: number; }>){
    let num:number;
    // for (num = 0; num < finishLineCells0.length; num++){
    //   if (value.x === finishLineCells0[num].x && value.y === finishLineCells0[num].y)
    //   return true;
    // }
    if (value.y == 16)
    return true;
  }

  while (newPathsFound0 > 0) {
    newPathsFound0 = 1;
    exploredCells0.forEach(exploreCells);
    exploredCells0.forEach(checkFinishLine);
    newPathsFound0 -= 1;
  }

  for (num = 0; num < finishLineCells0.length; num++){
    if (!exploredCells0.has({x: finishLineCells0[num].x, y: finishLineCells0[num].y}))
    return false;
  }
  
  console.log(exploredCells0);

  return true;
};  





//   // THIS IS HARD-CODED FOR THE HORIZONTAL VIEW, MAKE IT DYNAMIC
//   //Populating the finish line cells for both players
//   const finishLineCells0 : {x: number; y: number}[] = [];
//   var num; 
//   for (num = 0; num < 9; num+=2){
//     finishLineCells0.push({x: num, y: 16});
//   }

//   const finishLineCells1 : {x: number; y: number}[] = [];
//   var num2; 
//   for (num2 = 0; num2 < 9; num2+=2){
//     finishLineCells1.push({x: num2, y: 0});
//   }
  
//   //An array for the next step's set of walls
//   const nextStepWalls: {x: number; y: number}[] = [...walls, ...desiredPosition];
  
//   // const outsideWalls: {x: number; y: number}[] = []
//   // var num3; 
//   // for (num2 = 0; num2 < ; num2+=2){
//   //   finishLineCells1 .push({x: num2, y: 0});
//   // }

//   let exploredCells0: {x: number; y: number}[] = [];
//   // let yepeyp = new Set<{x: number; y: number}>();
//   //exploredCells0.add([player0Position.x, player0Position.y]);
//   exploredCells0[0] = player0Position;
//   let exploredCells1: {x: number; y: number}[] = [];
//   exploredCells1[0] = player1Position;

//   let pathBlocked0: boolean = true;
//   let pathBlocked1: boolean = true;
//   let newPathsFound0: number = 1;
//   let newPathsFound1: number = 1;

//   var counter: number = 0; //FOR REINFORCMENT LEARNING

//   // A loop that searches for a route to the finish line
//   // The loop does so by checking if unchecked cells could lead to the finish line
//   // Keep the loop going as long as new cells are being examined (= newPathsFound)
//   // Do the while loop TWICE for newPathsFound0 and newPathsFound1
//   var lastIteration: number = 0;
//   newPathsFound0 = 1;
//   while (newPathsFound0 > 0) {

//     var i: number;
//     console.log(lastIteration + 'last iteration num');
//     let iterationNumber: number = exploredCells0.length
//     for (i = lastIteration; i < iterationNumber; i++){
      
//       counter ++;

//       // Do this if statement for All four Directions
//       // EXPLORE RIGHT CELL
//       if (
//         canMove({
//           opponent: player1Position,
//           me: player0Position,
//           desiredPosition: {x: exploredCells0[i].x, y: (exploredCells0[i].y + 2)},
//           walls: nextStepWalls,
//       })
//       ){
//         // Checking if at least one newly-explored cell already exists in the exploredCells array.
//         // If it's not found, log the newly added explored cell
//         if (!exploredCells0.find(
//           element => element.x === (exploredCells0[i].x) && element.y === (exploredCells0[i].y + 2)
//           ))
//           {
//             exploredCells0.push({x: exploredCells0[i].x, y: exploredCells0[i].y + 2});
//             console.log('hi' + counter);
//             newPathsFound0 += 1; //this makes sure the forloop iterates its searching as long as the variable stays above zero
//         }
//       }
//       // EXPLORE LEFT CELL
//       if (
//         canMove({
//           opponent: player1Position,
//           me: player0Position,
//           desiredPosition: {x: exploredCells0[i].x, y: (exploredCells0[i].y - 2)},
//           walls: nextStepWalls,
//       })
//       ){
//         // Checking if at least one newly-explored cell already exists in the exploredCells array.
//         // If it's not found, log the newly added explored cell
//         if (!exploredCells0.find(
//           element => element.x === (exploredCells0[i].x) && element.y === (exploredCells0[i].y - 2)
//           ))
//           {
//             exploredCells0.push({x: exploredCells0[i].x, y: exploredCells0[i].y - 2});
            
//             newPathsFound0 += 1; //this makes sure the forloop iterates its searching as long as the variable stays above zero
//         }
//       }

//       // EXPLORE UPWARD CELL
//       if (
//         canMove({
//           opponent: player1Position,
//           me: player0Position,
//           desiredPosition: {x: exploredCells0[i].x - 2, y: (exploredCells0[i].y)},
//           walls: nextStepWalls,
//       })
//       ){
//         // Checking if at least one newly-explored cell already exists in the exploredCells array.
//         // If it's not found, log the newly added explored cell
//         if (!exploredCells0.find(
//           element => element.x === (exploredCells0[i].x - 2) && (element.y === exploredCells0[i].y)
//           ))
//           {
//             exploredCells0.push({x: exploredCells0[i].x - 2, y: exploredCells0[i].y})
            
//             newPathsFound0 += 1; //this makes sure the forloop iterates its searching as long as the variable stays above zero
//         }
//       }

//       // EXPLORE DOWNWARD CELL
//       if (
//         canMove({
//           opponent: player1Position,
//           me: player0Position,
//           desiredPosition: {x: exploredCells0[i].x + 2, y:exploredCells0[i].y},
//           walls: nextStepWalls,
//       })
//       ){
//         // Checking if at least one newly-explored cell already exists in the exploredCells array.
//         // If it's not found, log the newly added explored cell
//         if (!exploredCells0.find(
//           element => element.x === (exploredCells0[i].x + 2) && (element.y === exploredCells0[i].y)
//           ))
//           {
//             exploredCells0.push({x: exploredCells0[i].x + 2, y: exploredCells0[i].y});
            
//             newPathsFound0 += 1; //this makes sure the forloop iterates its searching as long as the variable stays above zero
//         }
//       }
      
//       // Checking to see if the exploredCells array contains any of the finish line cells
//       // if (
//       //   exploredCells0.map((v) => {
//       //     finishLineCells0.map((vv) =>
//       //     {console.log(v, vv); return v.x == vv.x && v.y == vv.y; }
//       //    );
//       //   }))
//       // {
//       //   pathBlocked0 = false;
//       //   console.log(exploredCells0);
//       //   console.log('heeey' + newPathsFound0);
//       //   console.log('what' + finishLineCells0);
//       //   return true;
        
//       // }
//       newPathsFound0 -= 1; //this makes sure the forloop iterates its searching as long as the variable stays above zero
//       lastIteration = i;
//       iterationNumber = exploredCells0.length
//       console.log(exploredCells0);
//       console.log('hey' + newPathsFound0);
      
//     }
    
//   }
// console.log('hii' + counter);
//   //DO ANOTHER WHILE LOOP HERE



//   if (pathBlocked0 == true) {
//     return false;
//   }
//   if (pathBlocked1 == true) {
//     return false;
//   }
  
  // 플레이어가 속한 폐구간이 생기지 않도록 거르기. 페구간 알고리즘 vs 최단거리 알고리즘


