import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { setPreviewConfig } from '@botui/chat-controller'

setPreviewConfig({ chatHost: '/' })

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
