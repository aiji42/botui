import { FC } from 'react'
import { AppProps } from 'next/app'
import { css, Global } from '@emotion/core'

const style = css`
  body {
    input, button, textarea, select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
    }
    font-family: 'Noto Sans JP', sans-serif;
    padding: 0px 15px 100px 15px;
    margin: 0;
  }
`

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global styles={[style]} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
