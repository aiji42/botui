import messages from '@bicstone/ra-language-japanese'
import { Message } from '@botui/types'
import { Proposal, ProposalMessage, ProposalMessages, Proposals } from '../../../../@types/session'
import { skipperEvaluate } from './modules'

const getValues = (proposals: Proposals): Record<string, any> => {
  return proposals.reduce<Record<string, any>>((values, proposal) => {
    if (proposal.type !== 'message') return values
    return proposal.data.content.type === 'form' ? {...values, ...proposal.data.content.props.values} : values
  }, {})
}

const evalFunction = (functionString: string, values: any) => {
  const func = new Function('values', functionString)
  func(values)
}

const makeMessage = (proposals: Proposals) => {
  const values = getValues(proposals)
  const messages: Array<Message> = []
  let prevMessageProposal: ProposalMessage
  let skipNumber: number
  proposals.some((proposal) => {
    if (skipNumber) {
      --skipNumber
      return
    }
    if (proposal.type === 'skipper') {
      const { data: skipper } = proposal
      skipNumber = skipperEvaluate(skipper, values)
      return
    }
    if (proposal.type === 'message' && proposal.completed) {
      messages.push(proposal.data)
      prevMessageProposal = proposal
      return
    }
    if (proposal.type === 'message') {
      // TODO: 非同期を考慮
      prevMessageProposal?.after && evalFunction(prevMessageProposal.after, values)
      proposal.before && evalFunction(proposal.before, values)
      // messageの変更

      messages.push(proposal.data)
      return true
    }
  })
}
