/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { css } from '@emotion/react'

const style = (human: boolean, msgColor?: string, bkgColor?: string) =>
  css({
    lineHeight: 1.3,
    backgroundColor: bkgColor ?? human ? '#eeeeee' : '#0f84fe',
    color: msgColor ?? human ? '#000000' : '#ffffff',
    padding: 12,
    borderRadius: 12,
    width: 'auto',
    display: 'inline-block',
    textAlign: 'left'
  })

interface Props {
  human?: boolean
  baseColor?: string
  messageColor?: string
}

export const MessageBubble: FC<Props> = (props) => {
  const { children, human = false, baseColor, messageColor } = props
  return (
    <div css={style(human, messageColor, baseColor)}>
      {children}
    </div>
  )
}
