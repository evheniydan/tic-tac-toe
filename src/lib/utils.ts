import {clsx} from 'clsx'
import type {ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {WIN_COMBINATIONS} from './constants'
import type {Cell} from './types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const calculateBoardWinner = (board: Cell[]) => {
	for (const [a, b, c] of WIN_COMBINATIONS) {
		const areCellsFilled = !!(board[a] && board[b] && board[c])
		const areCellsEqual = board[a] === board[b] && board[b] === board[c]

		if (areCellsFilled && areCellsEqual) {
			return board[a]
		}
	}

	return null
}

export const getRandomPlayer = () => (Math.random() < 0.5 ? 'X' : 'O')
