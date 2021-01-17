/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { MessageBubble, MessageBubbleProps, ProfileIcon } from '@botui/chat-components'
import { css } from '@emotion/react'

const style = {
  wrapper: css({
    maxWidth: '75%',
    margin: '4px 0',
    display: 'flex'
  }),
  icon: css({
    minWidth: 40,
    width: 40,
    height: 40,
    marginRight: 16
  })
}

type Props = Pick<MessageBubbleProps, 'baseColor' | 'messageColor'> & {
  iconSrc: string
}

export const AgentMessageWrapper: FC<Props> = (props) => (
  <div css={style.wrapper}>
    <div css={style.icon}>
      <ProfileIcon src={props.iconSrc} />
    </div>
    <MessageBubble>{props.children}</MessageBubble>
  </div>
)
