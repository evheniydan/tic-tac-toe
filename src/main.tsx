import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

root.render(<App />)
