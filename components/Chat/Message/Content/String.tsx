import { FC, useEffect } from 'react'
import { StringType } from '@botui/types'
import nl2br from 'react-nl2br'
import { useMessageContext } from '../../../../hooks/use-message-context'

const String: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as StringType
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
