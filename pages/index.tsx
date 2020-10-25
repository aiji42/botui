import Head from 'next/head'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Global, css } from '@emotion/core'

const Chat = dynamic(() => import('../components/Chat'), { ssr: false })

const style = css`
  body {
    margin: 0;
  }
`

const Home: FC = () => {
  return (
    <>
      <Global styles={[style]} />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat />
    </>
  )
}

export default Home
