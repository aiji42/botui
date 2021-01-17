import { FC, useEffect } from 'react'
import nl2br from 'react-nl2br'
import { useMessageContext } from '@botui/chat-hooks'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentString>()
  const props = message.content.props
  const { children, ...rest } = props
  useEffect(() => {
    handleUpdate && handleUpdate({ ...message, completed: true })
  }, [])

  return (
    <span {...rest}>
      {typeof children === 'string' ? nl2br(children) : children}
    </span>
  )
}
export default String
