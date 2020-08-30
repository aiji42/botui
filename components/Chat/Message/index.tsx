import { FC, useContext } from 'react'
import OperatorIcon from './OperatorIcon'
import Bubble from './Bubble'
import Content, { ContentType } from './Content'
import { css, keyframes } from '@emotion/core'
import { MessageContext } from '..'

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
      clear: 'both',
    }
  })
}

export interface MessageType {
  human: boolean
  iconDisplay?: boolean
  content: ContentType
  completed: boolean
  updated?: boolean
}

const Message: FC = () => {
  return (
    <div css={style.base}>
      <OperatorIcon />
      <Bubble>
        <Content />
      </Bubble>
    </div>
  )
}

export default Message