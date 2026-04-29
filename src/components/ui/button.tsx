type Props = {
	children: React.ReactNode
	onClick: () => void
}

const Button = ({children, onClick}: Props) => {
	return (
		<button
			className='text-xl block border-2 rounded-lg px-6 py-2 font-semibold cursor-pointer'
			onClick={onClick}
			type='button'
		>
			{children}
		</button>
	)
}

export default Button
