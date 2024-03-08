import {WINNER_COMBOS  } from "../constants";

// esta variable se encarga de verificar  que los 3 valores sean iguales a alguna de las posibles formas de vencer en el array
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a,b,c ]= combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]  
        ){
        return boardToCheck[a]}
    }
     return null
    }

   export const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square!== null)
       }