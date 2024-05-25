const Buttons = ({setWinStreak, playNextGame, isGameOver}) => {
  const resetAll = () => {
    setWinStreak([0, 0])
    playNextGame()
  }

  return (
    <div className='buttons'>
      <button onClick={resetAll}>Reset All</button>
      {isGameOver && <button onClick={playNextGame}>Play Next Game</button>}
    </div>
  )
}

export default Buttons
