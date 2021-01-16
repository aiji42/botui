export * from './form'
export * from './message'
export * from './proposal'
export * from './skipper'
export * from './action'

export interface Theme {
  header?: {
    backgroundColor: string
  }
  footer?: {
    backgroundColor: string
  }
  agent?: {
    backgroundColor: string
    color: string
  }
  user?: {
    backgroundColor: string
    color: string
  }
  progressBar?: {
    backgroundColor: string
  }
}

type ImageConfig = {
  provider: string
  key: string
}

export interface Images {
  logo?: ImageConfig
  agent?: string
}

export interface Session<T = Proposals, U = Theme, V = Images> {
  id: string
  title: string
  owner: string
  active: boolean
  theme: U
  proposals: T
  images: V
  email?: string
}

export interface ChatConfig extends Omit<Session, 'proposals'> {
  messages: Array<Message>
  messagesCount: number
  onStart?: () => void
  onClose?: () => void
}
