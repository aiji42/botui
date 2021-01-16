import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Entry } from '@botui/types'
import { createEntry } from '../graphql/mutations'

export type AddEntryInput = Pick<Entry<Record<string, unknown>>, 'sessionId' | 'owner' | 'inputs'>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addEntry = (input: AddEntryInput) =>
  API.graphql({
    query: createEntry,
    variables: {
      input: {
        owner: input.owner,
        sessionId: input.sessionId,
        inputs: JSON.stringify(input.sessionId)
      }
    },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })