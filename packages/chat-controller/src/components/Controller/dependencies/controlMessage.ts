import {
  Proposals,
  Message,
  ChatConfig,
  Proposal,
  ContentString,
  ContentForm,
  CustomSelect
} from '@botui/types'
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

export const controlMessage = async (
  proposals: Proposals,
  chatConfig: ChatConfig
): Promise<[Array<MessageWithId>, ChatConfig['percentOfProgress']]> => {
  const values = getValues(proposals)
  const messages: Array<MessageWithId> = []
  let skipNumber = 0
  let edgeProposal: Proposal | undefined = undefined

  for await (const proposal of proposals) {
    edgeProposal = proposal
    if (skipNumber) {
      --skipNumber
      continue
    }
    if (proposal.type === 'skipper') {
      const { data: skipper } = proposal
      skipNumber = skipperEvaluate(skipper, values)
      continue
    }
    if (proposal.type === 'relayer') {
      !proposal.completed && await relayerEvaluate(proposal.data, values)
      continue
    }
    if (proposal.type === 'closer') {
      !proposal.completed && await closerEvaluate(proposal.data, values, chatConfig)
      if (chatConfig.onClose) chatConfig.onClose()
      break
    }
    if (proposal.type === 'message') {
      messages.push(prepareMessage(proposal.data, values))
      if (!proposal.completed) break
    }
  }

  if (messages.length === 1) {
    windowInitialize()
    chatConfig.onStart?.()
  }

  const percent = progressPercent(proposals, edgeProposal)

  return [messages, percent]
}

const isStringMessage = (message: Message): message is Message<ContentString> =>
  message.content.type === 'string'
const isFormMessage = (message: Message): message is Message<ContentForm> =>
  message.content.type === 'form'

const prepareMessage = (message: Message, values: Values): Message => {
  if (isStringMessage(message)) return messageReplace(message, values)
  if (isFormMessage(message)) return fillFormMessage(message)
  return message
}

interface Window {
  botui?: {
    customChoice?: Record<string, Array<{ value: string; label: string }>>
    customMessage?: Record<string, string>
  }
}
declare const window: Window

const windowInitialize = () => {
  window.botui = {
    customChoice: {},
    customMessage: {}
  }
}

const messageReplace = (
  message: Message<ContentString>,
  values: Values
): Message<ContentString> => {
  if (typeof message.content.props.children !== 'string') return message
  return {
    ...message,
    content: {
      ...message.content,
      props: {
        ...message.content.props,
        children: message.content.props.children.replace(
          /\{\{(.+?)\}\}/g,
          (_, key) => `${window.botui?.customMessage?.[key] ?? values[key] ?? ''}`
        )
      }
    }
  }
}

const fillFormMessage = (
  message: Message<ContentForm>
): Message<ContentForm> => {
  if (
    message.content.props.type === 'FormCustomCheckbox' ||
    message.content.props.type === 'FormCustomRadioGroup'
  ) {
    const choices = window.botui?.customChoice?.[message.content.props.name]
    if (!choices) return message
    return {
      ...message,
      content: {
        ...message.content,
        props: {
          ...message.content.props,
          inputs: choices.map(({ label, value }) => ({ value, title: label }))
        }
      }
    }
  }
  if (message.content.props.type === 'FormCustomSelect') {
    const selects = message.content.props.selects.map<CustomSelect>((select) => {
      const choices = window.botui?.customChoice?.[select.name]
      if (!choices) return select
      return { ...select, options: choices }
    })

    return {
      ...message,
      content: {
        ...message.content,
        props: {
          ...message.content.props,
          selects
        }
      }
    }
  }
  return message
}

const progressPercent = (
  proposals: Proposals,
  edge?: Proposal
) => {
  if (!edge) return 0
  const edgeIndex = proposals.findIndex(({ id }) => id === edge.id)
  return (edgeIndex + 1) / proposals.length
}