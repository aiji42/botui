import { FC, createContext, useContext, ReactNode } from 'react'
import { Message } from '@botui/types'

interface MessageContextType {
  handleUpdate: (arg: Message) => void
  message: Message
}

const Context = createContext<MessageContextType>({
  handleUpdate: () => { },
  message: {
    human: true,
    content: { type: 'string', props: {} },
    completed: false,
    updated: false,
    before: '',
    after: ''
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