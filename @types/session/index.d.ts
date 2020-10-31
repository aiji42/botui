import { Message } from '@botui/types'

export interface Proposal extends Message {
  before: string
  after: string
}

export type Proposals = Array<Proposal>

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
  messages: Array<Proposal>
}

export type EditingSessionData = Session

export interface EditingProposalData extends Proposal {
  id: string
  proposalIndex: number
}
