import { Message } from './message'
import { Skipper } from './skipper'
import { Closer, Relayer } from './action'

interface ProposalBase<T extends Record<string, unknown>, U extends string> {
  id: string | number
  type: U
  completed: boolean
  data: T
}

export type ProposalSkipper = ProposalBase<Skipper, 'skipper'>
export type ProposalMessage = ProposalBase<Message, 'message'>
export type ProposalRelayer = ProposalBase<Relayer, 'relayer'>
export type ProposalCloser = ProposalBase<Closer, 'closer'>

export type ProposalMessages = Array<ProposalMessage>

export type Proposal =
  | ProposalSkipper
  | ProposalMessage
  | ProposalRelayer
  | ProposalCloser

export type Proposals = Array<Proposal>
