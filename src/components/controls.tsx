import useAppContext from '../contexts/app-context'
import Button from './ui/button'

const Controls = () => {
	const {history, isGameOver, handleUndo, resetGame, resetGameAndScore} =
		useAppContext()

	return (
		<div className='flex gap-x-4'>
			{history.length > 1 && !isGameOver && (
				<Button onClick={handleUndo}>Undo</Button>
			)}
			<Button onClick={isGameOver ? resetGame : resetGameAndScore}>
				{isGameOver ? 'Play Next Game' : 'Restart'}
			</Button>
		</div>
	)
}

export default Controls
