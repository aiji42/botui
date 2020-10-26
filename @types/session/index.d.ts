import { Message } from '@botui/types'

export type Proposal = Message

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

export interface Images {
  logo?: string
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

export type EditingSessionData = Session

export interface EditingProposalData extends Message {
  id: string
  proposalIndex: number
}
