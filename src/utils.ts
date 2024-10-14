import type {Player} from './types'

const WINNING_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

export const checkBoardForWinner = (board: Player[]) => {
	for (const combo of WINNING_COMBOS) {
		const [a, b, c] = combo

		const cellsAreFilled =
			board[a] !== null && board[b] !== null && board[c] !== null
		const cellsAreEqual = board[a] === board[b] && board[b] === board[c]

		if (cellsAreFilled && cellsAreEqual) return board[a]
	}

	return false
}
