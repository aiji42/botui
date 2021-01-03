import { FC } from 'react'
import { ProposalMessage, Session } from '../../../../@types/session'
import { css } from '@emotion/react'
import { MessageContextProvider } from '../../../../hooks/use-message-context'
import ChatConfigContext from '../../../../hooks/use-chat-config-context'
import Header from '../../../Chat/Header'
import Footer from '../../../Chat/Footer'
import Message from '../../../Chat/Message'
import { stringMessageTemplate } from '../Create/proposalTemplates'

const sampleMessages = [
  stringMessageTemplate(
    'こんにちは！こちらではチャットのデザインをお好みに合わせて変更できます。',
    0
  ).data,
  stringMessageTemplate('左側のメッセージが「オペレーターメッセージ」です。', 0)
    .data,
  stringMessageTemplate(
    'そして、こちら右側が「ユーザメッセージ」です。',
    0,
    true
  ).data
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
          {sampleMessages.map((message) => (
            <MessageContextProvider message={message} key={message.id}>
              <Message preview />
            </MessageContextProvider>
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
