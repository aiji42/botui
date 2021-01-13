import { useEffect, useState } from 'react'
import { Session } from '../../@types/session'
import useDataProvider from '../use-react-admin-data-provider'

const useSessions = (): Array<Session> => {
  const [sessions, setSessions] = useState<Array<Session>>([])
  const { getList } = useDataProvider()
  useEffect(() => {
    getList<Session>('sessions', {
      pagination: { page: 1, perPage: 100 },
      sort: { field: '', order: '' },
      filter: ''
    }).then(({ data }) => setSessions(data))
  }, [])

  return sessions
}

export default useSessions
