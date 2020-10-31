import { FC, useCallback } from 'react'
import Message from './Message'
import { useCorsState } from 'use-cors-state'
import { Message as MessageType } from '@botui/types'
import MessageContext from '../../hooks/use-message-context'
import { ChatConfig } from '../../@types/session'
import ChatConfigContext from '../../hooks/use-chat-config-context'
import Header from './Header'
import Footer from './Footer'
import { css } from '@emotion/core'

const style = {
  header: css({
    position: 'sticky',
    top: 0,
    zIndex: 100
  }),
  body: css({
    padding: '5px 15px 100px 15px',
    overflow: 'scroll'
  }),
  footer: css({
    position: 'fixed',
    bottom: 0,
    width: '100%'
  })
}

const Chat: FC = () => {
  const [config, setConfig] = useCorsState<ChatConfig>(
    'chat-config',
    { window: window.parent },
    {
      id: '',
      owner: '',
      active: false,
      title: '',
      messages: [],
      theme: {},
      images: {}
    }
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
    <ChatConfigContext {...config}>
      <div css={style.header}>
        <Header />
      </div>
      <div css={style.body}>
        {config.messages.map((message, i) => (
          <MessageContext message={message} handleUpdate={updater(i)} key={i}>
            <Message />
          </MessageContext>
        ))}
      </div>
      <div css={style.footer}>
        <Footer />
      </div>
    </ChatConfigContext>
  )
}

export default Chat
