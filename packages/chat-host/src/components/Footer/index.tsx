/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { useChatConfigContext } from '@botui/chat-hooks'
import { Footer as ChatFooter } from '@botui/chat-components'
import { css } from '@emotion/react'

const style = {
  root: css({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 40
  })
}

export const Footer: FC = () => {
  const { theme: { footer, progressBar }, percentOfProgress } = useChatConfigContext()

  return (
    <div css={style.root}>
      <ChatFooter
        percent={percentOfProgress * 100}
        baseColor={footer?.backgroundColor}
        barColor={progressBar?.backgroundColor}
      />
    </div>
  )
}