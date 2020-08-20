import { FC } from 'react'
import Message from './Message'
import { FormCustomInput, FormName, FormAddress } from '../Forms/Formik/Forms'

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
    {
      content: <FormCustomInput inputs={[{ name: 'hoge', type: 'text' }]} onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormName onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormAddress onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    }
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