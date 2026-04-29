import ReactDOM from 'react-dom/client'

import Board from './components/board'
import Controls from './components/controls'
import Status from './components/status'
import {AppContextProvider} from './contexts/app-context'
import './index.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(
	<AppContextProvider>
		<Status />
		<Board />
		<Controls />
	</AppContextProvider>,
)
