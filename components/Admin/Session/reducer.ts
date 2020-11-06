import { Reducer } from 'react'
import { Session, Proposal, Proposals } from '../../../@types/session'

export interface ActionEditSession {
  type: 'editSession'
  session: Omit<Session, 'proposals'>
}

export interface ActionDeleteProposal {
  type: 'deleteProposal'
  targetIndex: number
}

export interface ActionEditProposal {
  type: 'editProposal'
  targetIndex: number
  proposal: Proposal
}

export interface ActionInsertProposal {
  type: 'insertProposalBefore' | 'insertProposalAfter'
  insertIndex: number
  proposal: Proposal
}

export type EditAction =
  | ActionEditSession
  | ActionDeleteProposal
  | ActionEditProposal
  | ActionInsertProposal

export type EditReducer = Reducer<Session | undefined, EditAction>

export const editReducer: EditReducer = (state, action) => {
  if (!state) return state
  if (action.type === 'editSession') return { ...state, ...action.session }
  if (action.type === 'deleteProposal')
    return {
      ...state,
      proposals: state.proposals.filter(
        (_, index) => index !== action.targetIndex
      )
    }
  if (action.type === 'editProposal')
    return {
      ...state,
      proposals: state.proposals.map((proposal, index) =>
        index === action.targetIndex ? action.proposal : proposal
      )
    }
  if (action.type === 'insertProposalBefore')
    return {
      ...state,
      proposals: state.proposals.reduce(
        (res: Proposals, proposal, index) =>
          index === action.insertIndex
            ? [...res, action.proposal, proposal]
            : [...res, proposal],
        []
      )
    }
  if (action.type === 'insertProposalAfter')
    return {
      ...state,
      proposals: state.proposals.reduce(
        (res: Proposals, proposal, index) =>
          index === action.insertIndex
            ? [...res, proposal, action.proposal]
            : [...res, proposal],
        []
      )
    }
  return state
}
