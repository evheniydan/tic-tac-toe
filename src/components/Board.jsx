import {PLAYER_X, PLAYER_O} from '../constants'

const Board = ({board, currentPlayer, setBoard, setCurrentPlayer, isGameOver}) => {
  const handleCellClick = (cellIdx) => {
    if (!isGameOver && !board[cellIdx]) {
      setBoard((oldBoard) => {
        const newBoard = [...oldBoard]
        newBoard[cellIdx] = currentPlayer
        return newBoard
      })
      setCurrentPlayer((oldPlayer) => (oldPlayer === PLAYER_X ? PLAYER_O : PLAYER_X))
    }
  }

  return (
    <div className='board'>
      {board.map((cellValue, cellIdx) => {
        return (
          <div
            style={{
              cursor: `${isGameOver ? 'auto' : cellValue ? 'auto' : 'pointer'}`,
            }}
            key={cellIdx}
            className={
              'cell' +
              (!isGameOver && !cellValue
                ? currentPlayer === PLAYER_X
                  ? ' next-x'
                  : ' next-o'
                : '')
            }
            onClick={() => handleCellClick(cellIdx)}
          >
            {cellValue}
          </div>
        )
      })}
    </div>
  )
}

export default Board
