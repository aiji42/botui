import { useState, useEffect } from 'react'
import Amplify, { API } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api'
import { getSession } from '../../src/graphql/queries'
import awsconfig from '../../src/aws-exports'
import { Session } from '../../@types/session'

Amplify.configure(awsconfig)

interface FetchedSession {
  loading: boolean
  session: Session | null
}

const fetchSession = async (id: string): Promise<FetchedSession['session']> => {
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

const useFetchSession = (id: string): FetchedSession => {
  const [session, setSession] = useState<FetchedSession['session']>(null)
  const [loading, setLoading] = useState<FetchedSession['loading']>(false)
  useEffect(() => {
    if (session) return
    setLoading(true)
    fetchSession(id)
      .then(setSession)
      .finally(() => setLoading(false))
  }, [id, setSession, setLoading])

  return { loading, session }
}

export default useFetchSession
