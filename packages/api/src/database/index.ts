import API, { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api'
import { Entry, Session } from '@botui/types'
import { createEntry } from '../graphql/mutations'
import { getSession } from '../graphql/queries'

export type AddEntryInput = Pick<Entry<Record<string, unknown>>, 'sessionId' | 'owner' | 'inputs'>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addEntry = (input: AddEntryInput) =>
  API.graphql({
    query: createEntry,
    variables: {
      input: {
        owner: input.owner,
        sessionId: input.sessionId,
        inputs: JSON.stringify(input.inputs)
      }
    },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })

export const fetchSession = async (id: string): Promise<Session | null> => {
  const res = (await API.graphql({
    query: getSession,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })) as GraphQLResult<{ getSession: Session<string, string, string> }>

  if (!res.data) return null
  const {
    data: { getSession: session }
  } = res
  const {
    proposals: proposalsString,
    images: imageString,
    theme: themeString,
    ...restSession
  } = session
  const proposals = JSON.parse(proposalsString) as Session['proposals']
  const images = JSON.parse(imageString) as Session['images']
  const theme = JSON.parse(themeString) as Session['theme']

  return {
    ...restSession,
    proposals,
    images,
    theme
  }
}