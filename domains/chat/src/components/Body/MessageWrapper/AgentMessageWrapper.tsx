/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { MessageBubble, MessageBubbleProps, ProfileIcon } from '@botui/chat-components'
import { css } from '@emotion/react'

const style = {
  wrapper: css({
    width: '100%',
    margin: '4px 0',
    display: 'flex'
  }),
  icon: css({
    minWidth: 40,
    width: 40,
    height: 40,
    marginRight: 8
  }),
  bubble: css({
    width: '75%'
  })
}

type Props = Pick<MessageBubbleProps, 'baseColor' | 'messageColor'> & {
  iconSrc: string
}

export const AgentMessageWrapper: FC<Props> = (props) => {
  const { iconSrc, ...rest } = props
  return (
    <div css={style.wrapper}>
      <div css={style.icon}>
        <ProfileIcon src={iconSrc} color={rest.baseColor} />
      </div>
      <div css={style.bubble}>
        <MessageBubble {...rest} />
      </div>
    </div>
  )
}
