import { Message } from '@botui/types'

export type Proposal = Message

export type Proposals = Array<Proposal>

export interface Session<T = Proposals> {
  id: string
  accountId: string
  title: string
  active: boolean
  proposals: T
}

export type EditingSessionData = Session

export interface EditingProposalData extends Message {
  id: string
  proposalIndex: number
}
