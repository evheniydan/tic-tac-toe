import {useState, useEffect, useCallback} from 'react'

import GameStatus from './GameStatus'
import Board from './Board'

import {checkBoardForWinner} from './utils'

export type Player = 'X' | 'O' | null
export type Score = {X: number; O: number}

const App = () => {
	const randomPlayer = Math.random() < 0.5 ? 'X' : 'O'
	const cleanBoard = Array(9).fill(null)

	const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>(randomPlayer)
	const [board, setBoard] = useState<Player[]>(cleanBoard)
	const [winner, setWinner] = useState<Player>(null)
	const [score, setScore] = useState<Score>({X: 0, O: 0})

	const boardIsFilled = board.every((cell) => cell !== null)
	const isGameOver = !!winner || boardIsFilled

	const playNextGame = useCallback(() => {
		setWinner(null)
		setBoard(cleanBoard)
		setCurrentTurn(randomPlayer)
	}, [randomPlayer, cleanBoard])

	const restartAndResetScore = useCallback(() => {
		if (confirm('Are you sure you want to Restart & Reset Score?')) {
			setScore({X: 0, O: 0})
			playNextGame()
		}
	}, [playNextGame])

	const handleCellClick = (i: number) => {
		setBoard((prev) => {
			const newBoard = [...prev]
			newBoard[i] = currentTurn
			return newBoard
		})
		setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'))
	}

	useEffect(() => {
		if (boardIsFilled) {
			setWinner(null)
			return
		}

		const winner = checkBoardForWinner(board)
		winner && setWinner(winner)
	}, [board, boardIsFilled])

	useEffect(() => {
		winner && setScore((prev) => ({...prev, [winner]: prev[winner] + 1}))
	}, [winner])

	return (
		<>
			<GameStatus
				score={score}
				winner={winner}
				currentTurn={currentTurn}
				isGameOver={isGameOver}
			/>
			<Board
				onCellClick={handleCellClick}
				board={board}
				currentTurn={currentTurn}
				isGameOver={isGameOver}
			/>
			<button
				className='text-xl block border-2 rounded-lg px-8 py-4 font-semibold'
				onClick={isGameOver ? playNextGame : restartAndResetScore}
				type='button'
			>
				{isGameOver ? 'Play Next Game' : 'Restart & Reset Score'}
			</button>
		</>
	)
}

export default App
