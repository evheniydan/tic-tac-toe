import useAppContext from '../contexts/app-context'
import {PLAYER_CLASSNAMES} from '../lib/constants'

const Status = () => {
	const {winner, isGameOver, currentPlayer} = useAppContext()

	if (winner) {
		return (
			<h2 className='text-5xl'>
				<span className={PLAYER_CLASSNAMES[winner]}>{winner}</span> is a
				winner
			</h2>
		)
	}

	if (isGameOver) {
		return <h2 className='text-5xl'>It's a Draw</h2>
	}

	return (
		<h2 className='text-5xl'>
			Turn:{' '}
			<span className={PLAYER_CLASSNAMES[currentPlayer]}>
				{currentPlayer}
			</span>
		</h2>
	)
}

export default Status
