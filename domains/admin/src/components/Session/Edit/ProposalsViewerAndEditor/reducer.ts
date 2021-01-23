import { Reducer } from 'react'
import { Proposal, Proposals } from '@botui/types'

export enum ActionType {
  ACTION_EDIT = 'EDIT',
  ACTION_INSERT = 'INSERT',
  ACTION_DELETE = 'DELETE'
}

export interface EditingProposalAction {
  type: ActionType
  index: number
  newProposal: Proposal
}

const reducer: Reducer<Proposals, EditingProposalAction> = (
  proposals,
  action
): Proposals => {
  switch (action.type) {
    case ActionType.ACTION_EDIT:
      return proposals.map((proposal, index) =>
        index === action.index ? action.newProposal : proposal
      )
    case ActionType.ACTION_INSERT:
      return [
        ...proposals.slice(0, action.index),
        action.newProposal,
        ...proposals.slice(action.index)
      ]
    case ActionType.ACTION_DELETE:
      return proposals.filter((_, index) => index !== action.index)
    default:
      return proposals
  }
}

export default reducer
