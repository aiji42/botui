import { FC, HTMLAttributes, useEffect, useContext } from 'react'
import { MessageContext } from '../../..'

export interface StringType extends HTMLAttributes<HTMLSpanElement> { }

const String: FC = () => {
  const { message, handleUpdate } = useContext(MessageContext)
  const props = message.content.props as StringType
  useEffect(() => {
    handleUpdate({ ...message, completed: true })
  }, [])

  return <span {...props} />
}
export default String