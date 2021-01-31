import React from 'react'
import { Preview } from './components'
import { render } from 'react-dom'
import { Launcher } from '@botui/types'

export class Botui {
  sessionId: string
  size: Launcher['size']
  defaultOpen: boolean

  constructor(
    sessionId: string,
    config: { size?: Launcher['size']; defaultOpen?: boolean } = {}
  ) {
    const { size = 'auto', defaultOpen = false } = config
    this.sessionId = sessionId
    this.size = size
    this.defaultOpen = defaultOpen
  }

  start() {
    const target = document.createElement('div')
    document.querySelector('body')?.appendChild(target)

    render(
      <Preview
        sessionId={this.sessionId}
        defaultOpen={this.defaultOpen}
        size={this.size}
      />,
      target
    )
  }
}
