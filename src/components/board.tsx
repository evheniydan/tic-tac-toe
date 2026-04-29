import useAppContext from '../contexts/app-context'
import Cell from './cell'

const Board = () => {
	const {board} = useAppContext()

	return (
		<div className='grid grid-rows-[repeat(3,100px)] grid-cols-[repeat(3,100px)] justify-center items-center'>
			{board.map((value, i) => (
				<Cell value={value} i={i} key={i} />
			))}
		</div>
	)
}

export default Board
