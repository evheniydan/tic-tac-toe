import useAppContext from '../contexts/app-context'
import { cn } from '../lib/utils'
import Cell from './cell'

const Board = () => {
	const {board, winner} = useAppContext()

	return (
		<div className={cn('grid grid-rows-[repeat(3,100px)] grid-cols-[repeat(3,100px)] justify-center items-center', winner && 'opacity-50')}>
			{board.map((value, i) => (
				<Cell value={value} i={i} key={i} />
			))}
		</div>
	)
}

export default Board
