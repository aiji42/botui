import {
  ProposalMessage,
  Proposals,
  Message,
  ChatConfig
} from '../../../../@types/session'
import { relayerEvaluate } from './relayerEvaluate'
import { closerEvaluate } from './closerEvaluate'
import { skipperEvaluate, ValueType } from './skipperEvaluate'

type Values = Record<string, ValueType | undefined>

const getValues = (proposals: Proposals): Values => {
  return proposals.reduce<Values>((values, proposal) => {
    if (proposal.type !== 'message') return values
    return proposal.data.content.type === 'form'
      ? { ...values, ...proposal.data.content.props.values }
      : values
  }, {})
}

export interface MessageWithId extends Message {
  id: number | string
}

export const makeMessage = (
  proposals: Proposals,
  chatConfig: ChatConfig
): Array<MessageWithId> => {
  const values = getValues(proposals)
  const messages: Array<MessageWithId> = []
  let prevMessageProposal: ProposalMessage
  let skipNumber: number
  proposals.some((proposal) => {
    if (skipNumber) {
      --skipNumber
      return false
    }
    if (proposal.type === 'skipper') {
      const { data: skipper } = proposal
      skipNumber = skipperEvaluate(skipper, values)
      return false
    }
    if (proposal.type === 'relayer') {
      !proposal.completed && relayerEvaluate(proposal.data, values)
      return false
    }
    if (proposal.type === 'closer') {
      !proposal.completed && closerEvaluate(proposal.data, values, chatConfig)
      return true
    }
    if (proposal.type === 'message') {
      messages.push(messageReplace(proposal.data, values))
      prevMessageProposal = proposal
      return !proposal.completed
    }
    return false
  })

  return messages
}

const messageReplace = (message: Message, values: Values): Message => {
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
          (_, key) => `${values[key] ?? ''}`
        )
      }
    }
  }
}
