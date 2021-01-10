import { ChatConfig } from '../../../../@types/session'
import { Closer } from '../../../../@types/session/action'
import { evalFunction, webhook } from './relayerEvaluate'
import { API } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { createEntry } from '../../../../src/graphql/mutations'

type Values = Record<string, unknown>

const store = (values: Values, chatConfig: ChatConfig): void => {
  API.graphql({
    query: createEntry,
    variables: {
      input: {
        owner: chatConfig.owner,
        sessionId: chatConfig.id,
        inputs: JSON.stringify(values)
      }
    },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })
}

const notify = (values: Values, chatConfig: ChatConfig): void => {
  console.log(values, chatConfig)
  // TODO
}

export const closerEvaluate = (
  closer: Closer,
  values: Values,
  chatConfig: ChatConfig
) => {
  if (closer.job === 'store') store(values, chatConfig)
  if (closer.job === 'script') evalFunction(closer.script, values)
  if (closer.job === 'webhook') webhook(closer.endpoint, values)
  if (closer.notify) notify(values, chatConfig)
}
