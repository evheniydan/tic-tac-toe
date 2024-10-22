import {cn} from './utils'
import type {Player, Score} from './App'

type GameStatusProps = {
	score: Score
	winner: Player
	currentPlayer: Player
	isGameOver: boolean
}

const GameStatus = ({
	score,
	winner,
	currentPlayer,
	isGameOver,
}: GameStatusProps) => (
	<div className='flex flex-col gap-y-2'>
		<h1 className='text-6xl text-center'>
			<span className='accent-X'>{score.X}</span>
			{' : '}
			<span className='accent-O'>{score.O}</span>
		</h1>
		<h2 className='text-5xl text-center'>
			{winner ? (
				<>
					<span className={cn(winner === 'X' ? 'accent-X' : 'accent-O')}>
						{winner}
					</span>{' '}
					is a winner
				</>
			) : isGameOver ? (
				<>It's a Draw</>
			) : (
				<>
					It's{' '}
					<span
						className={cn(
							currentPlayer === 'X' ? 'accent-X' : 'accent-O',
						)}
					>
						{currentPlayer}
					</span>{' '}
					turn
				</>
			)}
		</h2>
	</div>
)

export default GameStatus
