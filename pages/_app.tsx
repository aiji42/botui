import { FC } from 'react'
import { AppProps } from 'next/app'
import { css, Global } from '@emotion/react'
import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import vocabularies from '../i18n/amplify/vocabularies'
Amplify.configure(awsconfig)
Amplify.I18n.putVocabularies(vocabularies)
Amplify.I18n.setLanguage('ja')

const style = css`
  body {
    input,
    button,
    textarea,
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
    }
    font-family: 'Noto Sans JP', sans-serif;
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
