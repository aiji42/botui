import { Proposals, Message } from '../../../../@types/session'
import deepEqual from 'deep-equal'

type Values = Record<string, any>
type Messages = Array<Message>

const getValues = (messages: Messages): Values => {
  return messages.reduce<Values>((values, message) => {
    if (message.content.type !== 'form') return values
    return { ...values, ...message.content.props.values }
  }, {})
}

export const effectToProposals = (
  messages: Messages,
  proposals: Proposals
): [Proposals, Values] => {
  const values = getValues(messages)
  if (messages.some(({ completed }) => !completed)) return [proposals, values]
  const effected = proposals.reduce<Proposals>((res, proposal) => {
    const message = messages.find(({ id }) => id === proposal.id)
    if (message && proposal.type === 'message')
      return [
        ...res,
        { ...proposal, completed: message.completed, data: message }
      ]
    else if (proposal.type === 'message')
      return [
        ...res,
        {
          ...proposal,
          completed: false,
          data: { ...proposal.data, completed: false }
        }
      ]
    return [...res, { ...proposal, completed: false }]
  }, [])
  if (deepEqual(effected, proposals)) return [proposals, values]
  return [effected, values]
}
