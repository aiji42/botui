import React from 'react'
import { Preview } from './components'
import { render } from 'react-dom'

export class Botui {
  sessionId: string

  constructor(sessionId: string) {
    this.sessionId = sessionId
  }

  start() {
    const target = document.createElement('div')
    document.querySelector('body')?.appendChild(target)

    render(<Preview sessionId={this.sessionId} />, target)
  }
}
