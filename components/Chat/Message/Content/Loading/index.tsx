import { css } from '@emotion/react'
import ReactLoading from 'react-loading'
import { FC } from 'react'

const style = css`
  height: 20px !important;
  position: relative;
  top: -15px;
`

const Loading: FC = () => (
  <ReactLoading type="bubbles" height={50} width={50} css={style} />
)

export default Loading
