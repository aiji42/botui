import { ChatConfig, Closer } from '@botui/types'
import { evalFunction, webhook } from './relayerEvaluate'
import { notifyEntryByMail, addEntry } from '@botui/api'

type Values = Record<string, unknown>

const notify = (values: Values, chatConfig: ChatConfig): void => {
  const { id, title, email } = chatConfig
  if (!email) return
  notifyEntryByMail(values, { id, title, email })
}

export const closerEvaluate = (
  closer: Closer,
  values: Values,
  chatConfig: ChatConfig
): void => {
  if (closer.job === 'store') addEntry({ sessionId: chatConfig.id, owner: chatConfig.owner, inputs: values })
  if (closer.job === 'script') evalFunction(closer.script, values)
  if (closer.job === 'webhook') webhook(closer.endpoint, values)
  if (closer.notify && chatConfig.email) notify(values, chatConfig)
}
