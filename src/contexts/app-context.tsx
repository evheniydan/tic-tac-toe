import {createContext, use, useEffect, useState} from 'react'
import type {Cell, Player, Score} from '../lib/types'
import {checkBoardForWinner, getRandomPlayer} from '../lib/utils'

type AppContextValue = {
	currentPlayer: Player
	score: Score
	winner: Player | null
	isGameOver: boolean
	board: (Player | null)[]
	handleCellClick: (i: number) => void
	goToNextGame: () => void
	handleUndo: () => void
	isUndoAvailable: boolean
	resetGameAndScore: () => void
} | null

const AppContext = createContext<AppContextValue>(null)

const CLEAN_BOARD = Array(9).fill(null)

type Props = {
	children: React.ReactNode
}

export const AppContextProvider = ({children}: Props) => {
	const [currentPlayer, setCurrentPlayer] = useState<Player>(getRandomPlayer())
	const [board, setBoard] = useState<Cell[]>(CLEAN_BOARD)
	const [winner, setWinner] = useState<Player | null>(null)
	const [score, setScore] = useState<Score>({X: 0, O: 0})

	const [history, setHistory] = useState([
		{turn: 1, currentPlayer, board: CLEAN_BOARD},
	])

	const isBoardFilled = board.every((c) => c)
	const isGameOver = !!winner || isBoardFilled
	const isUndoAvailable = history.length > 1 && !isGameOver

	const toggleCurrentPlayer = () => {
		setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'))
	}

	const goToNextGame = () => {
		setWinner(null)
		setBoard(CLEAN_BOARD)
		setCurrentPlayer(getRandomPlayer())
		setHistory([{turn: 1, currentPlayer, board: CLEAN_BOARD}])
	}

	const resetGameAndScore = () => {
		if (confirm('Are you sure you want to restart & reset score?')) {
			setScore({X: 0, O: 0})
			goToNextGame()
		}
	}

	const handleCellClick = (i: number) => {
		setBoard((p) => {
			const newBoard = [...p]
			newBoard[i] = currentPlayer
			return newBoard
		})
		toggleCurrentPlayer()
	}

	const handleUndo = () => {
		const lastTurnIdx = history.length - 1
		const prevTurnIdx = lastTurnIdx - 1

		setBoard(history[prevTurnIdx].board)
		setCurrentPlayer(history[prevTurnIdx].currentPlayer)
		setHistory((prev) => prev.filter((_, i) => i !== lastTurnIdx))
	}

	// Update history on every progress turns
	useEffect(() => {
		if (board.every((c) => !c)) return

		const lastBoard = history[history.length - 1].board

		const isBoardProgressing =
			board.filter((cell) => cell !== null).length >=
			lastBoard.filter((cell) => cell !== null).length

		const isBoardDifferent = board.some((cell, i) => cell !== lastBoard[i])

		if (isBoardDifferent && isBoardProgressing) {
			setHistory((p) => [...p, {turn: p.length + 1, currentPlayer, board}])
		}
	}, [board, currentPlayer, history])

	// Check for winner on every turn
	useEffect(() => {
		const winner = checkBoardForWinner(board)

		if (winner) {
			setWinner(winner)
			setScore((p) => ({...p, [winner]: p[winner] + 1}))
		} else {
			if (isBoardFilled) {
				setWinner(null)
				setScore((p) => ({X: p.X++, O: p.O++}))
			}
		}
	}, [board, isBoardFilled])

	return (
		<AppContext
			value={{
				currentPlayer,
				score,
				winner,
				isGameOver,
				board,
				handleCellClick,
				goToNextGame,
				handleUndo,
				isUndoAvailable,
				resetGameAndScore,
			}}
		>
			{children}
		</AppContext>
	)
}

const useAppContext = () => {
	const context = use(AppContext)

	if (!context) {
		throw new Error('useAppContext must be used within an AppContextProvider')
	}

	return context
}

export default useAppContext
