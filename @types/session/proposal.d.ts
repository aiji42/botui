import { Message } from './message'
import { Skipper } from './skipper'

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
