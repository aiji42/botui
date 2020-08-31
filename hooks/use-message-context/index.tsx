import { FC, createContext, useContext, ReactNode } from 'react'
import { Message } from '../../@types/message'

interface MessageContextType {
  handleUpdate: (arg: Message) => void
  message: Message
}

const Context = createContext<MessageContextType>({
  handleUpdate: () => { },
  message: {
    human: true,
    content: { type: 'string', props: {} },
    completed: false
  }
})

export const useMessageContext = () => useContext(Context)

const MessageContext: FC<MessageContextType & {children: ReactNode}> = ({ message, handleUpdate, children }) => {
  return (
    <Context.Provider value={{ message, handleUpdate }}>
      {children}
    </Context.Provider>
  )
}

export default MessageContext