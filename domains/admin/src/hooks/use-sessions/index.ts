import { useEffect, useState } from 'react'
import { Session } from '@botui/types'
import { useDataProvider } from '../use-data-provider'

export const useSessions = (): Array<Session> => {
  const [sessions, setSessions] = useState<Array<Session>>([])
  const { getList } = useDataProvider()
  useEffect(() => {
    getList<Session>('sessions', {
      pagination: { page: 1, perPage: 100 },
      sort: { field: '', order: '' },
      filter: ''
    }).then(({ data }) => setSessions(data))
  }, [getList])

  return sessions
}
