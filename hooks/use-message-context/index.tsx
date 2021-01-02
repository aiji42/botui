import { FC, createContext, useContext } from 'react'
import { Content, Message } from '../../@types/session'
import { FunctionField } from 'react-admin'

interface MessageContextType<T = Content> {
  handleUpdate?: (arg: Message) => void
  message: Message<T>
}

const noOp = () => {
  // do nothing.
}

const Context = createContext<MessageContextType>({
  handleUpdate: noOp,
  message: {} as Message
})

export const useMessageContext = <T extends Content = Content>() => {
  const context = useContext(Context) as MessageContextType<T>
  return context
}

export const MessageContextProvider: FC<MessageContextType> = ({
  message,
  handleUpdate = noOp,
  children
}) => {
  return (
    <Context.Provider value={{ message, handleUpdate }}>
      {children}
    </Context.Provider>
  )
}
