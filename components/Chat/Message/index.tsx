import { FC, useContext } from 'react'
import OperatorIcon from './OperatorIcon'
import Bubble from './Bubble'
import Content, { ContentType } from './Content'
import { css } from '@emotion/core'
import { MessageContext } from '..'

const style = {
  base: css({
    margin: '10px 0',
    ':after': {
      display: 'block',
      content: '""',
      clear: 'both'
    }
  })
}

export interface MessageType {
  human: boolean
  iconDisplay?: boolean
  content: ContentType
  completed: boolean
}

const Message: FC = () => {
  const { message: { human, iconDisplay } } = useContext(MessageContext)

  return (
    <div css={style.base}>
      {!human && <OperatorIcon display={iconDisplay} />}
      <Bubble human={human}>
        <Content />
      </Bubble>
    </div>
  )
}

export default Message