import useAppContext from '../contexts/app-context'
import Button from './ui/button'

const Controls = () => {
	const {
		isUndoAvailable,
		isGameOver,
		handleUndo,
		playNext,
		reset,
	} = useAppContext()

	return (
		<div className='flex gap-x-4'>
			{isUndoAvailable && <Button onClick={handleUndo}>Undo</Button>}

			{isGameOver ? (
				<Button onClick={playNext}>Play Next</Button>
			) : (
				<Button onClick={reset}>Reset</Button>
			)}
		</div>
	)
}

export default Controls
