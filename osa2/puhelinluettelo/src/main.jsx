import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import axios from 'axios'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// const promise = axios.get('http://localhost:3001/api/persons')
const promise = axios.get('/api/persons')

console.log(promise)
