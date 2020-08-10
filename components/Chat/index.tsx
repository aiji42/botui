import { FC } from 'react'
import Message from './Message'

const Chat: FC = () => {
  const messages = [
    {
      content: 'テストです。',
      human: false,
    },
    {
      content: 'いい感じです',
      human: false,
    },
    {
      content: 'そうですね',
      human: true,
    },
  ]

  return (
    <div>
      {messages.map((msg, i) => (
        <Message {...msg} key={i} />
      ))}
    </div>
  )
}

export default Chat