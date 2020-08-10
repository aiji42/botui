import { FC } from 'react'
import { css } from '@emotion/core'

type Props = {
  human: boolean
}

const style = {
  base: css({
    lineHeight: 1.3,
    backgroundColor: '#0f84fe',
    color: '#ffffff',
    padding: 8,
    borderRadius: 12,
    width: 'auto',
    maxWidth: '75%',
    display: 'inline-block'
  }),
  human: css({
    color: '#000000',
    backgroundColor: '#eeeeee',
    width: '80%',
    maxWidth: '80%',
    float: 'right'
  })
}

const Bubble: FC<Props> = ({ human, ...props }) => {
  return (
    <div css={human ? [style.base, style.human] : style.base} {...props} />
  )
}

Bubble.defaultProps = {
  human: false
}

export default Bubble