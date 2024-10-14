import type {Player, Wins} from '../types'

type ScoreProps = {
	winner: Player
	wins: Wins
}

const Score = ({winner, wins}: ScoreProps) => (
	<h1>
		{!winner ? (
			`${wins.X} : ${wins.O}`
		) : (
			<>
				<span className={winner === 'X' ? 'accent' : ''}>{wins.X}</span>
				{' : '}
				<span className={winner === 'O' ? 'accent' : ''}>{wins.O}</span>
			</>
		)}
	</h1>
)

export default Score
