/** @jsxImportSource @emotion/react */
import React, { FC, useEffect } from 'react'
import { useChatConfigContext, useMessageContext } from '@botui/chat-hooks'
import { css, keyframes } from '@emotion/react'
import Scroll from 'react-scroll'
import { HumanMessageWrapper } from './HumanMessageWrapper'
import { AgentMessageWrapper } from './AgentMessageWrapper'

const keyFrames = {
  slideIn: keyframes({
    '0%': {
      marginTop: 50,
      opacity: 0
    },
    '100%': {
      marginTop: 0,
      opacity: 1
    }
  })
}

const style = {
  base: css({
    margin: '10px 0',
    animation: `${keyFrames.slideIn} .5s ease-out`,
    ':after': {
      display: 'block',
      content: '""',
      clear: 'both'
    }
  })
}

export const MessageWrapper: FC = (props) => {
  const { message } = useMessageContext()
  const {
    images: { agent }, theme
  } = useChatConfigContext()
  useEffect(() => {
    setTimeout(
      () =>
        Scroll.scroller.scrollTo(`${message.id}`, {
          smooth: true,
          duration: 700
        }),
      500
    )
  }, [message.id])
  return (
    <Scroll.Element css={style.base} name={`${message.id}`}>
      {message.human ? (
        <HumanMessageWrapper {...props} baseColor={theme.user?.backgroundColor} messageColor={theme.user?.color} />
      ) : (
        <AgentMessageWrapper {...props} iconSrc={agent ?? ''} baseColor={theme.agent?.backgroundColor} messageColor={theme.agent?.color} />
      )}
    </Scroll.Element>
  )
}