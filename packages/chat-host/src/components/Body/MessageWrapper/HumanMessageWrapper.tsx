/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { MessageBubble, MessageBubbleProps } from '@botui/chat-components'
import { css } from '@emotion/react'

const style = {
  wrapper: css({
    maxWidth: '80%',
    textAlign: 'right',
    margin: '8px 0px 8px auto'
  })
}

type Props = Pick<MessageBubbleProps, 'baseColor' | 'messageColor'>

export const HumanMessageWrapper: FC<Props> = (props) => (
  <div css={style.wrapper}>
    <MessageBubble human>{props.children}</MessageBubble>
  </div>
)