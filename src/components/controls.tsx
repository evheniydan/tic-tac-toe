import useAppContext from '../contexts/app-context'
import Button from './ui/button'

const Controls = () => {
	const {
		isUndoAvailable,
		isGameOver,
		handleUndo,
		goToNextGame,
		resetGameAndScore,
	} = useAppContext()

	return (
		<div className='flex gap-x-4'>
			{isUndoAvailable && <Button onClick={handleUndo}>Undo</Button>}

			{isGameOver ? (
				<Button onClick={goToNextGame}>Play Next</Button>
			) : (
				<Button onClick={resetGameAndScore}>Reset</Button>
			)}
		</div>
	)
}

export default Controls
