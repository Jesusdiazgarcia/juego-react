import { useState } from "react"
import confetti from "canvas-confetti"

import {Square} from "./components/Square.jsx"

import{TURNS, WINNER_COMBOS} from "./constants.js"


 
function App() {
  // estoy declarando un estado que va a tener los valores de un array de 9 elementos con el valor null
  const [board, setBoard] = useState(
    Array(9).fill(null)
    )
  // declare un estado en el cual se determina que el turno por defecto siempre va a ser el de X
  const [turn, setTurn] = useState(TURNS.X)
  // declaro un estado en el cual digo que no hay ganador al principio
  const[winner, setWinner]= useState(null)


  // esta variable se encarga de verificar  que los 3 valores sean iguales a alguna de las posibles formas de vencer en el array
  const checkWinner = (boardToCheck) => {
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


  // esta funcion se encarga de reiniciar los atributos a como estaban antes de empezar el juego
  const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  } 
   // esta funcion se encarga de reiniciar los atributos a como estaban antes de empezar el juego
  
  const checkEndGame = (newBoard) => {
   return newBoard.every((square) => square!== null)
  }
  const updateBoard= (index) => {
    if (board[index] || winner) return
    const newBoard = [... board]
    newBoard[index]= turn;
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O :TURNS.X; 
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
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
      {
       winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {
              winner === false ? 'Empate' : 'Gano ' + winner
              }
            </h2>
             <header className="win">
              {winner && <Square>{winner}</Square>} 

             </header>
             <footer>
               <button onClick={resetGame}>Empezar de nuevo</button>
             </footer>
          </div>
        </section>
        )
      }
    </main>
  )
}

export default App
