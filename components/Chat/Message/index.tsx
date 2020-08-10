import { FC } from 'react'
import OperatorIcon from './OperatorIcon'
import Bubble from './Bubble'
import Content from './Content'
import { css } from '@emotion/core'

type Props = {
  human: boolean,
  iconDisplay?: boolean,
  content: string
}

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

const Message: FC<Props> = ({ human, iconDisplay, content }) => {
  return (
    <div css={style.base}>
      {!human && <OperatorIcon display={iconDisplay} />}
      <Bubble human={human}>
        <Content content={content} />
      </Bubble>
    </div>
  )
}

Message.defaultProps = {
  iconDisplay: true
}

export default Message