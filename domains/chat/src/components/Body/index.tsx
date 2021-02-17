/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { useChatConfigContext, MessageContextProvider } from '@botui/chat-hooks'
import { css } from '@emotion/react'
import { MessageWrapper } from './MessageWrapper'
import { Message } from './Message'
import { Message as MessageType } from '@botui/types'

const style = {
  root: css({
    padding: '5px 15px 150px 15px',
    overflow: 'scroll'
  })
}

type Props = {
  onUpdated: (arg: MessageType) => void
}

export const Body: FC<Props> = (props) => {
  const { messages } = useChatConfigContext()

  return (
    <div css={style.root}>
      {messages.map((message) => (
        <MessageContextProvider
          key={message.id}
          message={message}
          handleUpdate={props.onUpdated}
        >
          <MessageWrapper>
            <Message />
          </MessageWrapper>
        </MessageContextProvider>
      ))}
    </div>
  )
}
