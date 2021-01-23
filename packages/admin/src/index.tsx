import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Admin from './Admin'
import { setPreviewConfig } from '@botui/chat-controller'

setPreviewConfig({ chatHost: process.env.REACT_APP_BOTUI_HOST ?? 'http://localhost:3000/' })

ReactDOM.render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>,
  document.getElementById('root')
)
