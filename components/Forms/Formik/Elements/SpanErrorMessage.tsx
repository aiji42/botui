import { FC } from 'react'
import { css } from '@emotion/core'

const error = css({
  color: '#ea4031',
  marginTop: 3,
  display: 'block'
})

const SpanErrorMessage: FC = (props) => <span css={error} {...props}></span>

export default SpanErrorMessage
