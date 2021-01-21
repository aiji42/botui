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
    setTimeout(() => mounted.current && setLoading(false), delay ?? 0)
    return () => {
      mounted.current = false
    }
  }, [delay])

  if (loading && type !== 'image') return <MessageLoading />
  if (type === 'form') return <Form />
  if (type === 'image') return <Image />
  if (type === 'string') return <String />
  return <></>
}
