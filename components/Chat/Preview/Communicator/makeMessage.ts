import { ProposalMessage, Proposals, Message } from '../../../../@types/session'
import { skipperEvaluate } from './skipperEvaluate'

const getValues = (proposals: Proposals): Record<string, any> => {
  return proposals.reduce<Record<string, any>>((values, proposal) => {
    if (proposal.type !== 'message') return values
    return proposal.data.content.type === 'form' ? {...values, ...proposal.data.content.props.values} : values
  }, {})
}

const evalFunction = (functionString: string, values: any) => {
  /* eslint no-new-func: "off" */
  const func = new Function('values', functionString)
  func(values)
}

export interface MessageWithId extends Message {
  id: number | string
}

export const makeMessage = (proposals: Proposals): Array<MessageWithId> => {
  const values = getValues(proposals)
  const messages: Array<MessageWithId> = []
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
      messages.push({ ...proposal.data, id: proposal.id })
      prevMessageProposal = proposal
      return
    }
    if (proposal.type === 'message') {
      // TODO: 非同期を考慮
      prevMessageProposal?.after && evalFunction(prevMessageProposal.after, values)
      proposal.before && evalFunction(proposal.before, values)

      messages.push({ ...messageReplace(proposal.data, values), id: proposal.id })
      return true
    }
  })

  return messages
}

const messageReplace = (message: Message, values: Record<string, any>): Message => {
  if (message.content.type !== 'string') return message
  if (typeof message.content.props.children !== 'string') return message
  return {
    ...message,
    content: {
      ...message.content,
      props: {
        ...message.content.props,
        children: message.content.props.children.replace(
          /\{\{(.+?)\}\}/g,
          (_, key) => values[key]
        )
      }
    }
  }
}