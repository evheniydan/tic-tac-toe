import useAppContext from '../contexts/app-context'
import type {Player} from '../lib/types'
import {cn} from '../lib/utils'

type Props = {
	value: Player | null
	i: number
}

const Cell = ({value, i}: Props) => {
	const {currentPlayer, isGameOver, handleCellClick} = useAppContext()

	return (
		<button
			type='button'
			disabled={isGameOver || !!value}
			className={cn(
				'flex justify-center items-center w-full h-full text-6xl cursor-pointer cell disabled:cursor-auto',
				value === 'X' && 'accent-X',
				value === 'O' && 'accent-O',
				!isGameOver && !value && currentPlayer === 'X' && 'X-turn',
				!isGameOver && !value && currentPlayer === 'O' && 'O-turn',
			)}
			onClick={() => handleCellClick(i)}
		>
			{value}
		</button>
	)
}

export default Cell
