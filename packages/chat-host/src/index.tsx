import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/react'
import App from './Chat'

const global = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Global styles={global} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
