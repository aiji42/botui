import { FC, useCallback } from 'react'
import Message from './Message'
import { useCorsState } from 'use-cors-state'
import { Message as MessageType } from '@botui/types'
import MessageContext from '../../hooks/use-message-context'
import { Theme } from '../../@types/session'
import ThemeContext from '../../hooks/use-theme-context'

const Chat: FC = () => {
  const [messages, setMessages] = useCorsState<Array<MessageType>>(
    'chat-messages',
    { window: window.parent },
    []
  )
  const [theme] = useCorsState<Theme>(
    'chat-theme',
    { window: window.parent },
    {}
  )

  const updater = useCallback(
    (index: number) => (updatedMessage: MessageType) => {
      setMessages(
        Object.entries(messages).map(([i, message]) =>
          Number(i) === index ? updatedMessage : message
        )
      )
    },
    [messages]
  )

  return (
    <ThemeContext theme={theme}>
      {messages.map((message, i) => (
        <MessageContext message={message} handleUpdate={updater(i)} key={i}>
          <Message />
        </MessageContext>
      ))}
    </ThemeContext>
  )
}

export default Chat
