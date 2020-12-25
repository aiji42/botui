import { Message } from '@botui/types'
import { ProposalMessages, Proposals } from '../../../../@types/session'

const makeMessage = (proposals: Proposals) => {
  const messageProposal: ProposalMessages = proposals.filter(
    (proposal) => proposal.type === 'message'
  )
  proposals.reduce<Array<Message>>((messages, proposal) => {
    if (proposal.type === 'message' && proposal.completed)
      return [...messages, proposal.data]
    return messages
  }, [])
}
