import ReactDOM from 'react-dom/client'

import Board from './components/board'
import GameControls from './components/game-controls'
import GameStatus from './components/game-status'
import {AppContextProvider} from './contexts/app-context'

import './index.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(
	<AppContextProvider>
		<GameStatus />
		<Board />
		<GameControls />
	</AppContextProvider>,
)
