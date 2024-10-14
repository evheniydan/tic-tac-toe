import {useCallback, useEffect, useState} from 'react'

import Score from './components/Score'
import GameStatus from './components/GameStatus'
import Board from './components/Board'
import Button from './components/Button'

import {checkBoardForWinner} from './utils'

import type {Player, Wins} from './types'

const App = () => {
	const randomPlayer = Math.random() < 0.5 ? 'X' : 'O'
	const cleanBoard = Array(9).fill(null)

	const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>(randomPlayer)
	const [board, setBoard] = useState<Player[]>(cleanBoard)
	const [winner, setWinner] = useState<Player>(null)
	const [wins, setWins] = useState<Wins>({X: 0, O: 0})

	const boardIsFilled = board.every((cell) => cell !== null)
	const isGameOver = !!winner || boardIsFilled

	const playNextGame = useCallback(() => {
		setWinner(null)
		setBoard(cleanBoard)
		setCurrentTurn(randomPlayer)
	}, [randomPlayer, cleanBoard])

	const restartAndResetScore = useCallback(() => {
		if (confirm('Are you sure you want to Restart & Reset Score?')) {
			setWins({X: 0, O: 0})
			playNextGame()
		}
	}, [playNextGame])

	const handleCellClick = (cellIdx: number) => {
		if (!isGameOver && !board[cellIdx]) {
			setBoard((prev) => {
				const newBoard = [...prev]
				newBoard[cellIdx] = currentTurn
				return newBoard
			})
			setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'))
		}
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
		winner && setWins((prev) => ({...prev, [winner]: prev[winner] + 1}))
	}, [winner])

	return (
		<>
			<header>
				<Score winner={winner} wins={wins} />
				<GameStatus
					winner={winner}
					currentTurn={currentTurn}
					isGameOver={isGameOver}
				/>
			</header>
			<main>
				<Board
					onCellClick={handleCellClick}
					board={board}
					currentTurn={currentTurn}
					isGameOver={isGameOver}
				/>
				<Button
					onClick={isGameOver ? playNextGame : restartAndResetScore}
					label={isGameOver ? 'Play Next Game' : 'Restart & Reset Score'}
				/>
			</main>
		</>
	)
}

export default App
