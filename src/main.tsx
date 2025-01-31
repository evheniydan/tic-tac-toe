import ReactDOM from 'react-dom/client'
import App from './app'

import './index.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(<App />)
