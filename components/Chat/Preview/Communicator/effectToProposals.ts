import { Proposals, Message } from '../../../../@types/session'

interface Values extends Record<string, any> { }
interface Messages extends Array<Message> { }

const getValues = (messages: Messages): Values => {
  return messages.reduce<Values>((values, message) => {
    if (message.content.type !== 'form') return values
    return { ...values, ...message.content.props.values }
  }, {})
}

export const effectToProposals = (messages: Messages, proposals: Proposals): [Proposals, Values] => {
  const values = getValues(messages)
  if (!messages.some(({ completed }) => !completed)) return [proposals, values]
  const messageIds = messages.map(({ id }) => id)
  const effected = proposals.reduce<Proposals>((res, proposal) => [
    ...res,
    messageIds.includes(proposal.id) ? { ...proposal, completed: true } : { ...proposal, completed: false }
  ], [])
  return [effected, values]
}