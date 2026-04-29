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
				'flex justify-center items-center w-full h-full text-6xl cursor-pointer cell disabled:cursor-auto hover:after:opacity-25 border-light-shades border-0 not-nth-[3n]:border-r-2 nth-[-n+6]:border-b-2',
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
