import { css } from '@emotion/core';
import ReactLoading from 'react-loading'

const style = css`
  height: 20px !important;
  position: relative;
  top: -15px;
`

const Loading = () => <ReactLoading type="bubbles" height={50} width={50} css={style} />

export default Loading
