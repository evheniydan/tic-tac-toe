import {PLAYER_O, PLAYER_X} from '../constants'

const Score = ({winner, winStreak}) => (
  <h1>
    {!winner ? (
      winStreak[0] + ' : ' + winStreak[1]
    ) : (
      <>
        <span className={winner === PLAYER_X ? 'accent' : null}>{winStreak[0]}</span>
        {' : '}
        <span className={winner === PLAYER_O ? 'accent' : null}>{winStreak[1]}</span>
      </>
    )}
  </h1>
)

export default Score
