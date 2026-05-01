import {createContext, use, useState} from 'react'
import type {Cell, Player, Score} from '../lib/types'
import {calculateBoardWinner, getRandomPlayer} from '../lib/utils'

type AppContextValue = {
	turn: Player
	score: Score
	winner: Player | null
	isGameOver: boolean
	board: (Player | null)[]
	handleCellClick: (i: number) => void
	playNext: () => void
	handleUndo: () => void
	isUndoAvailable: boolean
	reset: () => void
} | null

const AppContext = createContext<AppContextValue>(null)

const CLEAN_BOARD = Array(9).fill(null)
const INITIAL_SCORE = {X: 0, O: 0}

type Props = {
	children: React.ReactNode
}

export const AppContextProvider = ({children}: Props) => {
	const [turn, setTurn] = useState<Player>(getRandomPlayer())
	const [board, setBoard] = useState<Cell[]>(CLEAN_BOARD)
	const [winner, setWinner] = useState<Player | null>(null)
	const [score, setScore] = useState<Score>(INITIAL_SCORE)

	const [history, setHistory] = useState([
		{turnNum: 1, turn, board: CLEAN_BOARD},
	])

	const isBoardFilled = board.every((c) => c)
	const isGameOver = !!winner || isBoardFilled
	const isUndoAvailable = history.length > 1 && !isGameOver

	const toggleCurrentPlayer = () => {
		setTurn((t) => (t === 'X' ? 'O' : 'X'))
	}

	const playNext = () => {
		setWinner(null)
		setBoard(CLEAN_BOARD)
		setTurn(getRandomPlayer())
		setHistory([{turnNum: 1, turn, board: CLEAN_BOARD}])
	}

	const reset = () => {
		if (confirm('Are you sure you want to restart & reset score?')) {
			setScore(INITIAL_SCORE)
			playNext()
		}
	}

	const handleCellClick = (i: number) => {
		setBoard((p) => {
			const newBoard = [...p]
			newBoard[i] = turn

			if (history.length >= 5) {
				const winner = calculateBoardWinner(newBoard)
				if (winner) {
					setWinner(winner)
					setScore((p) => ({...p, [winner]: p[winner] + 1}))
				}
			}

			setHistory((p) => [...p, {turnNum: p.length + 1, turn, board: newBoard}])

			return newBoard
		})

		toggleCurrentPlayer()
	}

	const handleUndo = () => {
		const lastTurnIdx = history.length - 1
		const prevTurnIdx = history.length - 2

		setBoard(history[prevTurnIdx].board)
		setTurn(history[prevTurnIdx].turn)
		setHistory((p) => p.filter((_, i) => i !== lastTurnIdx))
	}

	return (
		<AppContext
			value={{
				turn,
				score,
				winner,
				isGameOver,
				board,
				handleCellClick,
				playNext,
				handleUndo,
				isUndoAvailable,
				reset,
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
