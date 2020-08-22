import { FC, useState, useEffect } from 'react'
import Message from './Message'
import * as Forms from '../Forms/Formik/Forms'

interface MessageString {
  content: string
  human: boolean
}

type ComponentKeys = 'FormAddress' | 'FormBirthDay' | 'FormEmail' | 'FormName' | 'FormTel' | 'FormCreditCard'
  | 'FormCustomRadioGroup' | 'FormCustomSelect' | 'FormCustomInput' | 'FormCustomTextarea' | 'FormConfirm'

interface MessageComponentDefinition {
  content: { component: ComponentKeys, props: any }
  human: boolean
}
const isMessageComponentDefinition = (arg: MessageString | MessageComponentDefinition): arg is MessageComponentDefinition => typeof arg.content !== 'string'

interface MessageComponent {
  content: JSX.Element
  human: boolean
}

const useMessages = (messages: Array<MessageString | MessageComponentDefinition>): Array<MessageString | MessageComponent> => {
  return messages.reduce<Array<MessageString | MessageComponent>>((res, message) => {
    if (isMessageComponentDefinition(message)) {
      const Component = Forms[message.content.component]
      return [...res, { ...message, content: <Component {...message.content.props} /> }]
    }
    else return [...res, message]
  }, [])
}

const Chat: FC = () => {
  const [messages, setMessages] = useState([{
    content: 'テストです。',
    human: false,
  }])
  useEffect(() => {
    
  }, [messages])

  return (
    <div>
      {useMessages(messages).map((msg, i) => (
        <Message {...msg} key={i} />
      ))}
      <button onClick={() => {
        setMessages([...messages, {
          content: 'テストです。',
          human: false,
        }])
      }}>追加</button>
    </div>
  )
}

export default Chat