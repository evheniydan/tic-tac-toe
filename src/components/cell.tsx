import useAppContext from '../contexts/app-context'
import {PLAYER_CLASSNAMES} from '../lib/constants'
import type {Player} from '../lib/types'
import {cn} from '../lib/utils'

type Props = {
	value: Player | null
	i: number
}

const Cell = ({value, i}: Props) => {
	const {currentPlayer, isGameOver, handleCellClick} = useAppContext()
	const isDisabled = isGameOver || !!value

	return (
		<button
			type='button'
			disabled={isDisabled}
			className={cn(
				'flex justify-center items-center w-full h-full text-6xl cursor-pointer cell disabled:cursor-auto hover:after:opacity-25',
				value && PLAYER_CLASSNAMES[value],
				!isDisabled && currentPlayer === 'X' && "hover:after:content-['X']",
				!isDisabled && currentPlayer === 'O' && "hover:after:content-['O']",
			)}
			onClick={() => handleCellClick(i)}
		>
			{value}
		</button>
	)
}

export default Cell
