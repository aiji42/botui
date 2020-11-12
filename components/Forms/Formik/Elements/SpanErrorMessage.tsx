import { FC } from 'react'
import { css } from '@emotion/react'

const error = css({
  color: '#ea4031',
  marginTop: 3,
  display: 'block'
})

const SpanErrorMessage: FC = (props) => <span css={error} {...props}></span>

export default SpanErrorMessage
