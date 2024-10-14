import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './style.sass'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
