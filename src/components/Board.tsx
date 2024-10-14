import type {Player} from '../types'

type BoardProps = {
	board: Player[]
	currentTurn: Player
	isGameOver: boolean
	onCellClick: (cellIdx: number) => void
}

const Board = ({board, currentTurn, isGameOver, onCellClick}: BoardProps) => {
	return (
		<div className='board'>
			{board.map((value, i) => {
				return (
					<div
						style={{
							cursor: `${isGameOver ? 'auto' : value ? 'auto' : 'pointer'}`,
						}}
						className={`cell${!isGameOver && !value ? ` next-${currentTurn}` : ''}`}
						onClick={() => onCellClick(i)}
						key={i}
					>
						{value}
					</div>
				)
			})}
		</div>
	)
}

export default Board
