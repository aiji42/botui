import { Session, Proposal, Proposals } from '../../../@types/session'

export interface EditSessionData extends Omit<Session, 'proposals'> {
  type: 'editSession'
}

export interface DeleteProposalData {
  type: 'deleteProposal'
  targetIndex: number
}

export interface EditProposalData extends Proposal {
  type: 'editProposal'
  targetIndex: number
}

export interface InsertProposalData extends Proposal {
  type: 'insertProposalBefore' | 'insertProposalAfter'
  insertIndex: number
}

export type UpdateSessionData =
  | EditSessionData
  | DeleteProposalData
  | EditProposalData
  | InsertProposalData

export const sessionDataTransform = (
  record: Session | undefined,
  data: UpdateSessionData
) => {
  if (!record) return record
  if (data.type === 'editSession') {
    const { type, ...session } = data
    return { ...record, ...session }
  }
  if (data.type === 'deleteProposal')
    return {
      ...record,
      proposals: record.proposals.filter(
        (_, index) => index !== data.targetIndex
      )
    }
  if (data.type === 'editProposal') {
    const { type, targetIndex, ...newProposal } = data
    return {
      ...record,
      proposals: record.proposals.map((proposal, index) =>
        index === targetIndex ? newProposal : proposal
      )
    }
  }
  if (data.type === 'insertProposalBefore') {
    const { type, insertIndex, ...newProposal } = data
    return {
      ...record,
      proposals: record.proposals.length
        ? record.proposals.reduce(
            (res: Proposals, proposal, index) =>
              index === insertIndex
                ? [...res, newProposal, proposal]
                : [...res, proposal],
            []
          )
        : [newProposal]
    }
  }
  if (data.type === 'insertProposalAfter') {
    const { type, insertIndex, ...newProposal } = data
    return {
      ...record,
      proposals: record.proposals.length
        ? record.proposals.reduce(
            (res: Proposals, proposal, index) =>
              index === insertIndex
                ? [...res, proposal, newProposal]
                : [...res, proposal],
            []
          )
        : [newProposal]
    }
  }

  return record
}
