import Head from 'next/head'
import dynamic from 'next/dynamic'
import { FC } from 'react'

const Chat = dynamic(() => import("../components/Chat"), { ssr: false });

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
