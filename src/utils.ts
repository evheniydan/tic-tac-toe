import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

import type {Player} from './app'
import type {ClassValue} from 'clsx'

const WINNING_BOARDS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const checkBoardForWinner = (board: Player[]) => {
	for (const [a, b, c] of WINNING_BOARDS) {
		const cellsAreFilled =
			board[a] !== null && board[b] !== null && board[c] !== null
		const cellsAreEqual = board[a] === board[b] && board[b] === board[c]

		if (cellsAreFilled && cellsAreEqual) return board[a]
	}
}
