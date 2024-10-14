import type {Wins} from '../types'

type ButtonProps = {
	onClick: () => void
	label: string
}

const Button = ({onClick, label}: ButtonProps) => {
	return (
		<div className='buttons'>
			<button onClick={onClick} type='button'>
				{label}
			</button>
		</div>
	)
}

export default Button
