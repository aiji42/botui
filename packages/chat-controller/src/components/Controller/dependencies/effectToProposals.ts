import { Proposals, Message } from '@botui/types'
import deepEqual from 'deep-equal'

type Values = Record<string, unknown>
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
  const edgeIndex = proposals.findIndex(
    ({ id }) => id === messages.slice(-1)[0]?.id
  )
  const effected = proposals.reduce<Proposals>((res, proposal, index) => {
    if (proposal.type !== 'message')
      return [...res, { ...proposal, completed: edgeIndex > index }]

    const message = messages.find(({ id }) => id === proposal.id)
    if (message)
      return [
        ...res,
        { ...proposal, completed: message.completed, data: message }
      ]
    else
      return [
        ...res,
        {
          ...proposal,
          completed: false,
          data: { ...proposal.data, completed: false }
        }
      ]
  }, [])
  if (deepEqual(effected, proposals)) return [proposals, values]
  return [effected, values]
}
