import { useState } from "react"
import confetti from "canvas-confetti"

import {Square} from "./components/Square.jsx"
import{TURNS, } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
 
function App() {
  
  // estoy declarando un estado que va a tener los valores de un array de 9 elementos con el valor null
  const [board, setBoard] = useState(() => {
   
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  
  
  })
  // declare un estado en el cual se determina que el turno por defecto siempre va a ser el de X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage || TURNS.X
    
  })
  // declaro un estado en el cual digo que no hay ganador al principio
  const[winner, setWinner]= useState(null)


  // esta variable se encarga de verificar  que los 3 valores sean iguales a alguna de las posibles formas de vencer en el array
 


  // esta funcion se encarga de reiniciar los atributos a como estaban antes de empezar el juego
  const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
  } 
   // esta funcion se encarga de reiniciar los atributos a como estaban antes de empezar el juego
  
  
  const updateBoard= (index) => {
    if (board[index] || winner) return
    const newBoard = [... board]
    newBoard[index]= turn;
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O :TURNS.X; 
    setTurn(newTurn)

     window.localStorage.setItem('board',  JSON.stringify(newBoard)) 
     window.localStorage.setItem('turn', newTurn)


    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  return ( 
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game" >
       
        {
        board.map((square,index) => {
        return(
             <Square 
             key={index} 
             index={index}
             updateBoard={updateBoard}
             >
              {square}
             </Square>
            )
          })
        }
      </section>
      <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}>

      </WinnerModal>
    </main>
  )
}

export default App
