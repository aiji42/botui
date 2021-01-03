import { Form as FormType } from '@botui/types'
import { HTMLAttributes } from 'react'

export interface ContentForm {
  type: 'form'
  props: FormType
  delay?: number
}

export type StringType = HTMLAttributes<HTMLSpanElement>

export interface ImageType {
  imgKey: string
}

export interface ContentString {
  type: 'string'
  props: StringType
  delay?: number
}

export interface ContentImage {
  type: 'image'
  props: ImageType
  delay?: number
}

export type Content = ContentForm | ContentImage | ContentString

export interface Message<T = Content> {
  id: string | number
  human: boolean
  iconDisplay?: boolean
  content: T
  completed: boolean
  updated: boolean
}

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
  | 'include'
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
  type: U
  completed: boolean
  data: T
}

export type ProposalSkipper = ProposalBase<Skipper, 'skipper'>

export interface ProposalMessage extends ProposalBase<Message, 'message'> {
  before: string
  after: string
}

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
  messages: Array<Message>
  messagesCount: number
}
