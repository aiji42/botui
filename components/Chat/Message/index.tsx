import { FC, useEffect, useMemo } from 'react'
import OperatorIcon from './OperatorIcon'
import Bubble from './Bubble'
import Content, { ContentType } from './Content'
import { css, keyframes } from '@emotion/core'
import Scroll from 'react-scroll'
import nextId from 'react-id-generator'

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
  const name = useMemo(() => nextId(), [])
  useEffect(() => {
    setTimeout(() => Scroll.scroller.scrollTo(name, { smooth: true, duration: 700 }), 500)
  }, [])

  return (
    <Scroll.Element css={style.base} name={name}>
      <OperatorIcon />
      <Bubble>
        <Content />
      </Bubble>
    </Scroll.Element>
  )
}

export default Message