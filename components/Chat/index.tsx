import { FC, useState, useEffect, useRef } from 'react'
import Message from './Message'
import * as Forms from '../Forms'
import Loading from '../Loading'

const Components = { ...Forms, Loading }

interface MessageString {
  content: string
  human: boolean
  delay?: number
}

type ComponentKeys = 'FormAddress' | 'FormBirthDay' | 'FormEmail' | 'FormName' | 'FormTel' | 'FormCreditCard'
  | 'FormCustomRadioGroup' | 'FormCustomSelect' | 'FormCustomInput' | 'FormCustomTextarea' | 'FormConfirm' | 'Loading'

interface MessageComponentDefinition {
  content: { component: ComponentKeys, props: any }
  human: boolean
  delay?: number
}
const isMessageComponentDefinition = (arg: MessageString | MessageComponentDefinition): arg is MessageComponentDefinition => typeof arg.content !== 'string'

interface MessageComponent {
  content: JSX.Element
  human: boolean
  delay?: number
}

const useMessages = (messages: Array<MessageString | MessageComponentDefinition>): Array<MessageString | MessageComponent> => {
  return messages.reduce<Array<MessageString | MessageComponent>>((res, message) => {
    if (isMessageComponentDefinition(message)) {
      const Component = Components[message.content.component]
      return [...res, { ...message, content: <Component {...message.content.props} /> }]
    }
    else return [...res, message]
  }, [])
}

const Chat: FC = () => {
  const [messages, setMessages] = useState<Array<MessageString | MessageComponentDefinition>>([{
    content: 'テストです。',
    human: false,
  }])
  const [convertedMessages, setConvertedMessages] = useState<Array< MessageString | MessageComponent>>([])
  const countor = useRef<number>(messages.length)
  useEffect(() => {
    if (countor.current < messages.length && messages.slice(-1)[0].delay) {
      setConvertedMessages(useMessages([...messages.slice(0, -1), { content: { component: 'Loading', props: {} }, human: messages.slice(-1)[0].human }]))
      setTimeout(() => {
        setConvertedMessages(useMessages(messages))
      }, messages.slice(-1)[0].delay)
    } else setConvertedMessages(useMessages(messages))
    countor.current = messages.length
  }, [messages])

  return (
    <div>
      {convertedMessages.map((msg, i) => (
        <Message {...msg} key={i} />
      ))}
      <button onClick={() => {
        setMessages([...messages, {
          content: 'テストです。',
          human: false,
          delay: 1000
        }])
      }}>追加</button>
      <button onClick={() => {
        setMessages(messages.slice(0, -1))
      }}>削除</button>
    </div>
  )
}

export default Chat
