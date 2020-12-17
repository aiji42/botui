import { FC } from 'react'
import { ProposalMessage, Session } from '../../../../@types/session'
import { css } from '@emotion/react'
import MessageContext from '../../../../hooks/use-message-context'
import ChatConfigContext from '../../../../hooks/use-chat-config-context'
import Header from '../../../Chat/Header'
import Footer from '../../../Chat/Footer'
import Message from '../../../Chat/Message'

const sampleMessages: Array<ProposalMessage> = [
  {
    id: 1,
    type: 'message',
    human: false,
    content: {
      type: 'string',
      props: {
        children:
          'こんにちは！こちらではチャットのデザインをお好みに合わせて変更できます。'
      }
    },
    completed: true,
    updated: false,
    before: '',
    after: ''
  },
  {
    id: 2,
    type: 'message',
    human: false,
    content: {
      type: 'string',
      props: { children: '左側のメッセージが「オペレーターメッセージ」です。' }
    },
    completed: true,
    updated: false,
    before: '',
    after: ''
  },
  {
    id: 3,
    type: 'message',
    human: true,
    content: {
      type: 'string',
      props: { children: 'そして、こちら右側が「ユーザメッセージ」です。' }
    },
    completed: false,
    updated: false,
    before: '',
    after: ''
  }
]

const style = {
  base: css({
    backgroundColor: 'white',
    maxWidth: 360,
    width: '100%'
  }),
  body: css({
    padding: 5,
    height: 420
  }),
  footer: css({})
}

const SimplePreview: FC<Session> = (props) => {
  const { proposals, ...chatConfig } = props
  return (
    <div css={style.base}>
      <ChatConfigContext
        {...chatConfig}
        messagesCount={5}
        messages={sampleMessages}
      >
        <div>
          <Header />
        </div>
        <div css={style.body}>
          {sampleMessages.map((message, i) => (
            <MessageContext message={message} key={i}>
              <Message preview />
            </MessageContext>
          ))}
        </div>
        <div css={style.footer}>
          <Footer />
        </div>
      </ChatConfigContext>
    </div>
  )
}

export default SimplePreview
