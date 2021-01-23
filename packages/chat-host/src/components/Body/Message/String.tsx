import { FC, useEffect, useRef } from 'react'
import nl2br from 'react-nl2br'
import { useMessageContext } from '@botui/chat-hooks'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentString>()
  const props = message.content.props
  const { children, ...rest } = props
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current && handleUpdate && handleUpdate({ ...message, completed: true })
    return () => {
      mounted.current = false
    }
  }, [handleUpdate, message])

  return (
    <span {...rest}>
      {typeof children === 'string' ? nl2br(children) : children}
    </span>
  )
}
export default String
