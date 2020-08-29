import { FC, useCallback, createContext } from 'react'
import Message, { MessageType } from './Message'
import { useCorsState } from 'use-cors-state'

interface MessageContextType {
  handleUpdate: (arg: MessageType) => void
  message: MessageType
}

export const MessageContext = createContext<MessageContextType>({
  handleUpdate: () => { },
  message: {
    human: true,
    content: { type: 'string', props: {} },
    completed: false
  }
})

const Chat: FC = () => {
  const [messages, setMessages] = useCorsState<Array<MessageType>>('chat-messages', { window: window.parent }, [])

  const updater = useCallback((index: number) => (updatedMessage: MessageType) => {
    setMessages(Object.entries(messages).map(([i, message]) => Number(i) === index ? updatedMessage : message))
  }, [messages])

  return (
    <>
      {messages.map((message, i) => (
        <MessageContext.Provider value={{ message, handleUpdate: updater(i) }} key={i}>
          <Message />
        </MessageContext.Provider>
      ))}
    </>
  )
}

export default Chat
