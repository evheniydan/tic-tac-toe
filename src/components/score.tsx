import useAppContext from '../contexts/app-context'
import {PLAYER_CLASSNAMES} from '../lib/constants'

const Score = () => {
	const {score} = useAppContext()

	return (
		<h1 className='flex gap-x-2 justify-center text-6xl'>
			<span className={PLAYER_CLASSNAMES.X}>{score.X}</span>
			<span>:</span>
			<span className={PLAYER_CLASSNAMES.O}>{score.O}</span>
		</h1>
	)
}

export default Score
