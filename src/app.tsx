import ReactDOM from 'react-dom/client'

import Board from './components/board'
import Controls from './components/controls'
import Score from './components/score'
import Status from './components/status'
import {AppContextProvider} from './contexts/app-context'
import './index.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(
	<AppContextProvider>
		<div className='flex flex-col gap-y-2'>
			<Score />
			<Status />
		</div>
		<Board />
		<Controls />
	</AppContextProvider>,
)
