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
  id: string | number
  skipNumber: number
  conditions: Array<SkipperCondition>
  logic: SkipperLogic
}

export interface Proposal extends Message {
  id: string | number
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
  messagesCount: number
}
