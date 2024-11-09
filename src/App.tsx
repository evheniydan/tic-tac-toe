import {useState, useEffect} from 'react'

import GameStatus from './GameStatus'
import Board from './Board'
import Button from './Button'

import {checkBoardForWinner} from './utils'

export type Player = 'X' | 'O' | null
export type Score = {X: number; O: number}

const App = () => {
	const randomPlayer = Math.random() < 0.5 ? 'X' : 'O'
	const cleanBoard = Array(9).fill(null)

	const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(randomPlayer)
	const [board, setBoard] = useState<Player[]>(cleanBoard)
	const [winner, setWinner] = useState<Player>(null)
	const [score, setScore] = useState<Score>({X: 0, O: 0})

	const [history, setHistory] = useState([
		{turn: 1, currentPlayer, board: cleanBoard},
	])

	const boardIsFilled = board.every((cell) => cell !== null)
	const isGameOver = !!winner || boardIsFilled

	const playNextGame = () => {
		setWinner(null)
		setBoard(cleanBoard)
		setCurrentPlayer(randomPlayer)
		setHistory([{turn: 1, currentPlayer, board: cleanBoard}])
	}

	const restartAndResetScore = () => {
		if (confirm('Are you sure you want to Restart & Reset Score?')) {
			setScore({X: 0, O: 0})
			playNextGame()
		}
	}

	const handleCellClick = (i: number) => {
		setBoard((prev) => {
			const newBoard = [...prev]
			newBoard[i] = currentPlayer
			return newBoard
		})

		setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
	}

	const handleUndoClick = () => {
		const lastTurnIdx = history.length - 1
		const prevTurnIdx = lastTurnIdx - 1

		setBoard(history[prevTurnIdx].board)
		setCurrentPlayer(history[prevTurnIdx].currentPlayer)
		setHistory((prev) => prev.filter((historyEntry, i) => i !== lastTurnIdx))
	}

	// update history on every progress turns
	useEffect(() => {
		if (board.every((cell) => cell === null)) return

		const lastBoard = history[history.length - 1].board

		const isBoardProgressing =
			board.filter((cell) => cell !== null).length >=
			lastBoard.filter((cell) => cell !== null).length

		const isBoardDifferent = board.some((cell, i) => cell !== lastBoard[i])

		if (isBoardDifferent && isBoardProgressing) {
			setHistory((prev) => [
				...prev,
				{turn: prev.length + 1, currentPlayer, board},
			])
		}
	}, [board, currentPlayer, history])

	// check for winner on every turn
	useEffect(() => {
		const winner = checkBoardForWinner(board)

		if (winner) {
			setWinner(winner)
			setScore((prev) => ({...prev, [winner]: prev[winner] + 1}))
		} else {
			if (boardIsFilled) {
				setWinner(null)
				setScore((prev) => ({X: prev.X++, O: prev.O++}))
			}
		}
	}, [board, boardIsFilled])

	return (
		<>
			<GameStatus
				score={score}
				winner={winner}
				currentPlayer={currentPlayer}
				isGameOver={isGameOver}
			/>
			<Board
				onCellClick={handleCellClick}
				board={board}
				currentPlayer={currentPlayer}
				isGameOver={isGameOver}
			/>
			<div className='flex gap-x-4'>
				{history.length > 1 && !isGameOver && (
					<Button onClick={handleUndoClick}>Undo</Button>
				)}
				<Button onClick={isGameOver ? playNextGame : restartAndResetScore}>
					{isGameOver ? 'Play Next Game' : 'Restart'}
				</Button>
			</div>
		</>
	)
}

export default App
