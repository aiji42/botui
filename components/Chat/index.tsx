import { FC, useCallback } from 'react'
import Message from './Message'
import { useCorsState } from 'use-cors-state'
import { Message as MessageType } from '@botui/types'
import MessageContext from '../../hooks/use-message-context'
import { Theme, Images } from '../../@types/session'
import ThemeContext from '../../hooks/use-theme-context'
import Header from './Header'
import Footer from './Footer'
import { css } from '@emotion/core'

const style = {
  base: css({
    padding: '60px 15px 100px 15px',
    overflow: 'scroll'
  })
}

interface ChatConfig {
  messages: Array<MessageType>
  theme: Theme
  images: Images
}

const Chat: FC = () => {
  const [config, setConfig] = useCorsState<ChatConfig>(
    'chat-config',
    { window: window.parent },
    { messages: [], theme: {}, images: {} }
  )

  const updater = useCallback(
    (index: number) => (updatedMessage: MessageType) => {
      setConfig((prevConf) => ({
        ...prevConf,
        messages: Object.entries(config.messages).map(([i, message]) =>
          Number(i) === index ? updatedMessage : message
        )
      }))
    },
    [config.messages]
  )

  return (
    <ThemeContext theme={config.theme} images={config.images}>
      <Header />
      <div css={style.base}>
        {config.messages.map((message, i) => (
          <MessageContext message={message} handleUpdate={updater(i)} key={i}>
            <Message />
          </MessageContext>
        ))}
      </div>
      <Footer />
    </ThemeContext>
  )
}

export default Chat
