import { FC, useCallback } from 'react'
import Message from './Message'
import { useCorsState } from 'use-cors-state'
import { MessageContextProvider } from '../../hooks/use-message-context'
import { ChatConfig, Message as MessageType } from '../../@types/session'
import ChatConfigContext from '../../hooks/use-chat-config-context'
import Header from './Header'
import Footer from './Footer'
import { css } from '@emotion/react'

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
  const [config, setConfig] = useCorsState<ChatConfig | undefined>(
    'chat-config',
    { window: window.parent },
    undefined
  )

  const updater = useCallback(
    (updatedMessage: MessageType) => {
      if (!config) return
      setConfig({
        ...config,
        messages: config.messages.reduce<ChatConfig['messages']>((res, message) => {
          // updated: true の場合、後続のメッセージは削除する
          if (updatedMessage.updated && res.find(({ id }) => id === updatedMessage.id)) return res
          return [
            ...res, (message.id === updatedMessage.id ? { ...updatedMessage, updated: false } : message)
          ]
        }, [])
      })
    },
    [config, setConfig]
  )

  if (!config) return <></>

  return (
    <ChatConfigContext {...config}>
      <div css={style.header}>
        <Header />
      </div>
      <div css={style.body}>
        {config.messages.map((message) => (
          <MessageContextProvider message={message} handleUpdate={updater} key={message.id}>
            <Message />
          </MessageContextProvider>
        ))}
      </div>
      <div css={style.footer}>
        <Footer />
      </div>
    </ChatConfigContext>
  )
}

export default Chat
