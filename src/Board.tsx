import type {Player} from './App'
import {cn} from './utils'

type BoardProps = {
	board: Player[]
	currentTurn: Player
	isGameOver: boolean
	onCellClick: (i: number) => void
}

const Board = ({board, currentTurn, isGameOver, onCellClick}: BoardProps) => {
	return (
		<div className='grid grid-rows-[repeat(3,100px)] grid-cols-[repeat(3,100px)] justify-center items-center'>
			{board.map((value, i) => {
				return (
					<button
						type='button'
						disabled={isGameOver || value !== null}
						className={cn(
							'flex justify-center items-center w-full h-full text-6xl border-accent-o cursor-pointer cell disabled:cursor-auto',
							value === 'X' && 'accent-X',
							value === 'O' && 'accent-O',
							!isGameOver && !value && currentTurn === 'X' && 'X-turn',
							!isGameOver && !value && currentTurn === 'O' && 'O-turn',
						)}
						onClick={() => onCellClick(i)}
						key={i}
					>
						{value}
					</button>
				)
			})}
		</div>
	)
}

export default Board
