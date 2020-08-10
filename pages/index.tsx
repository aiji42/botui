import Head from 'next/head'
import { FC } from 'react'
import Chat from '../components/Chat'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat />
    </>
  )
}

export default Home
