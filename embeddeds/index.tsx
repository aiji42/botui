import ReactDOM from 'react-dom'
import Preview, { SizeType, SIZE } from './Preview'

class ChaChat {
  sessionId: string
  mountTarget: string
  size: SizeType
  initialOpen: boolean

  constructor(
    sessionId: string,
    mountTarget: string,
    config: { size?: SizeType; initialOpen?: boolean } = {}
  ) {
    const { size = SIZE.Auto, initialOpen = false } = config
    this.sessionId = sessionId
    this.mountTarget = mountTarget
    this.size = size
    this.initialOpen = initialOpen
  }

  start() {
    const target = document.getElementById(this.mountTarget)
    if (!target) return

    ReactDOM.render(
      <Preview
        sessionId={this.sessionId}
        initialOpen={this.initialOpen}
        size={this.size}
      />,
      target
    )
  }
}

declare global {
  interface Window {
    ChaChat: any
  }
}

window.ChaChat = ChaChat
