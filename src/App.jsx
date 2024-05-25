import {useEffect, useState} from 'react'

import {PLAYER_X, PLAYER_O, WINNING_COMBOS} from './constants'

import Score from './components/Score'
import GameStatus from './components/GameStatus'
import Board from './components/Board'
import Buttons from './components/Buttons'

const generateRandomPlayer = () => (Math.random() < 0.5 ? PLAYER_X : PLAYER_O)
const cleanBoard = Array(9).fill()

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState(generateRandomPlayer())
  const [board, setBoard] = useState(cleanBoard)
  const [winner, setWinner] = useState()
  const [isGameOver, setIsGameOver] = useState(false)
  const [winStreak, setWinStreak] = useState([0, 0])

  const playNextGame = () => {
    setWinner()
    setIsGameOver(false)
    setBoard(cleanBoard)
    setCurrentPlayer(generateRandomPlayer())
  }

  useEffect(() => {
    const checkEqualEl = ([winCellIdx1, winCellIdx2, winCellIdx3]) => {
      const winningCellsAreNotEmpty =
        board[winCellIdx1] && board[winCellIdx2] && board[winCellIdx3]
      const winningCellsAreEqual =
        board[winCellIdx1] === board[winCellIdx2] &&
        board[winCellIdx2] === board[winCellIdx3]
      return winningCellsAreNotEmpty && winningCellsAreEqual
    }

    WINNING_COMBOS.forEach((combo) => {
      if (checkEqualEl(combo)) {
        setWinner(board[combo[0]])
        setIsGameOver(true)
      }
    })

    board.every((cell) => cell) && setIsGameOver(true)
  }, [board])

  useEffect(() => {
    winner &&
      setWinStreak((oldWins) => {
        const newWins = [...oldWins]
        winner === PLAYER_X ? newWins[0]++ : newWins[1]++
        return newWins
      })
  }, [winner])

  return (
    <>
      <header>
        <Score winner={winner} winStreak={winStreak} />
        <GameStatus
          winner={winner}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
        />
      </header>
      <main>
        <Board
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          isGameOver={isGameOver}
        />
        <Buttons
          setWinStreak={setWinStreak}
          playNextGame={playNextGame}
          isGameOver={isGameOver}
        />
      </main>
    </>
  )
}

export default App
