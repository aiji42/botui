import { Message } from '@botui/types'

export type SkipperConditionOperator =
  | 'eq'
  | 'gt'
  | 'gteq'
  | 'lt'
  | 'lteq'
  | 'start'
  | 'end'
  | 'cont'
  | 'match'
  | 'regex'
  | 'true'
  | 'false'
  | 'null'

export interface SkipperCondition {
  key: string
  operator: SkipperConditionOperator
  pattern?: number | string | boolean
  negative: boolean
}

type SkipperLogic = 'and' | 'or'

export interface Skipper {
  skipNumber: number
  conditions: Array<SkipperCondition>
  logic: SkipperLogic
}

interface ProposalBase<T extends Record<string, unknown>, U extends string> {
  id: string | number
  before: string
  after: string
  type: U
  completed: boolean
  data: T
}

export type ProposalSkipper = ProposalBase<Skipper, 'skipper'>

export type ProposalMessage = ProposalBase<Skipper, 'message'>

export type ProposalMessages = Array<ProposalMessage>

export type Proposal = ProposalSkipper | ProposalMessage

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
  messages: ProposalMessages
  messagesCount: number
}
