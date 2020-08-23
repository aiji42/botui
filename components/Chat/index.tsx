import { FC } from 'react'
import Message from './Message'
import { useMessages } from '../../hooks/use-messages'

const Chat: FC = () => {
  const [messages, action] = useMessages([{
    content: 'テストです。',
    human: false,
  }])

  return (
    <>
      {messages.map((msg, i) => (
        <Message {...msg} key={i} />
      ))}
      <button onClick={() => {
        action.add({
          content: 'テストです。',
          human: false,
          delay: 1000
        })
      }}>追加</button>
      <button onClick={action.remove}>削除</button>
    </>
  )
}

export default Chat
