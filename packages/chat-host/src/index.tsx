import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/react'
import App from './Chat'

const global = css`
  body {
    margin: 0;
    font-family: "Noto Sans JP", sans-serif;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Global styles={global} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
