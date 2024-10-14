import type {Player} from '../types'

type GameStatusProps = {
	winner: Player
	currentTurn: Player
	isGameOver: boolean
}

const GameStatus = ({winner, currentTurn, isGameOver}: GameStatusProps) => (
	<h3>
		{winner ? (
			<>
				Good game! <span className='accent'>{winner}</span> is a winner!
			</>
		) : isGameOver ? (
			<>
				Good game! It&apos;s a <span className='accent'>Draw</span>
			</>
		) : (
			<>
				It&apos;s <span className='accent'>{currentTurn}</span> turn!
			</>
		)}
	</h3>
)

export default GameStatus
