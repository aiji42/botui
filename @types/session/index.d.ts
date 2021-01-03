export * from './form'
export * from './message'
export * from './proposal'
export * from './skipper'

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
}

export interface ChatConfig extends Omit<Session, 'proposals'> {
  messages: Array<Message>
  messagesCount: number
}
