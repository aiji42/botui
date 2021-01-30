import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Admin, { initAmplifyConfig } from './Admin'
import { setPreviewConfig } from '@botui/chat-controller'
import awsconfig from './aws-exports'

initAmplifyConfig(awsconfig)

setPreviewConfig({ chatHost: process.env.REACT_APP_BOTUI_HOST ?? 'http://localhost:3000/' })

ReactDOM.render(<Admin />, document.getElementById('root'))
