import React from 'react'
import { Preview, SizeType, SIZE } from './components'
import { render } from 'react-dom'

export class Botui {
  sessionId: string
  mountTarget: string
  size: SizeType
  defaultOpen: boolean

  constructor(
    sessionId: string,
    mountTarget: string,
    config: { size?: SizeType; defaultOpen?: boolean } = {}
  ) {
    const { size = SIZE.Auto, defaultOpen = false } = config
    this.sessionId = sessionId
    this.mountTarget = mountTarget
    this.size = size
    this.defaultOpen = defaultOpen
  }

  start() {
    const target = document.querySelector(this.mountTarget)
    if (!target) return

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
