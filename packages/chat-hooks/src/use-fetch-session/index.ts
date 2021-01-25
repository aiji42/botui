import { fetchSession } from '@botui/api'
import { useState, useEffect } from 'react'
import { Session } from '@botui/types'

export const useFetchSession = (id: string): Session | null => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    fetchSession(id).then(setSession)
  }, [id, setSession])

  return session
}
