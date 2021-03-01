import { ChatConfig, Closer } from '@botui/types'
import { evalFunction, webhook, formPush } from './relayerEvaluate'
import { notifyEntryByMail, addEntry } from '@botui/api'

type Values = Record<string, unknown>

const notify = async (
  values: Values,
  chatConfig: ChatConfig
): Promise<void> => {
  const { id, title, email } = chatConfig
  if (!email) return
  await notifyEntryByMail(values, { id, title, email })
}

export const closerEvaluate = async (
  closer: Closer,
  values: Values,
  chatConfig: ChatConfig
): Promise<void> => {
  if (closer.job === 'store') await addEntry({ sessionId: chatConfig.id, owner: chatConfig.owner, inputs: values })
  if (closer.job === 'script') await evalFunction(closer.script, values)
  if (closer.job === 'webhook') await webhook(closer.endpoint, values)
  if (closer.notify && chatConfig.email) await notify(values, chatConfig)
  if (closer.job === 'formPush') await formPush(closer, values)
}
