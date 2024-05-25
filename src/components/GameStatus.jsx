const GameStatus = ({winner, currentPlayer, isGameOver}) => (
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
        It&apos;s <span className='accent'>{currentPlayer}</span> turn!
      </>
    )}
  </h3>
)

export default GameStatus
