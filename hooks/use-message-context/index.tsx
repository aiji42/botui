import { FC, createContext, useContext } from 'react'
import { Content, Message } from '../../@types/session'

interface MessageContextType<T = Content> {
  handleUpdate?: (arg: Message) => void
  message: Message<T>
}

const noOp = () => {
  // do nothing.
}

const Context = <T extends unknown = Content>() =>
  createContext<MessageContextType<T>>({
    handleUpdate: noOp,
    message: {} as Message<T>
  })

export const useMessageContext = <T extends unknown = Content>() =>
  useContext<MessageContextType<T>>(Context<T>())

export const MessageContextProvider: FC<MessageContextType> = ({
  message,
  handleUpdate = noOp,
  children
}) => {
  const Provider = Context().Provider
  return <Provider value={{ message, handleUpdate }}>{children}</Provider>
}
