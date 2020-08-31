import { FC, useEffect } from 'react'
import { StringType } from '../../../../../@types/message'
import { useMessageContext } from '../../../../../hooks/use-message-context'

const String: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as StringType
  useEffect(() => {
    handleUpdate({ ...message, completed: true })
  }, [])

  return <span {...props} />
}
export default String