import React, { FC, useEffect, useRef, useState } from 'react'
import String from './String'
import Image from './Image'
import Form from './Form'
import { MessageLoading } from '@botui/chat-components'
import { useMessageContext } from '@botui/chat-hooks'

export const Message: FC = () => {
  const {
    message: {
      content: { delay, type }
    }
  } = useMessageContext()
  const [loading, setLoading] = useState<boolean>(true)
  const mounted = useRef(true)
  useEffect(() => {
    if (!delay) {
      setLoading(false)
      return
    }
    setTimeout(() => mounted.current && setLoading(false), delay)
    return () => {
      mounted.current = false
    }
  }, [])

  if (loading) return <MessageLoading />
  if (type === 'form') return <Form />
  if (type === 'image') return <Image />
  if (type === 'string') return <String />
  return <></>
}
