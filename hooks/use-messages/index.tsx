import { useState, useRef, useEffect } from "react"
import { useCorsState } from 'use-cors-state'
import * as Forms from '../../components/Forms'
import Loading from '../../components/Chat/Message/Content/Loading'
const Components = { ...Forms, Loading }

interface MessageString {
  content: string
  human: boolean
  delay?: number
  completed: boolean
}

type ComponentKeys = 'FormAddress' | 'FormBirthDay' | 'FormEmail' | 'FormName' | 'FormTel' | 'FormCreditCard'
  | 'FormCustomRadioGroup' | 'FormCustomSelect' | 'FormCustomInput' | 'FormCustomTextarea' | 'FormConfirm' | 'Loading'

type ComponentDefinition = { component: ComponentKeys, props: any }

interface MessageComponentDefinition {
  content: ComponentDefinition
  human: boolean
  delay?: number
  completed: boolean
}

interface MessageComponent {
  content: JSX.Element
  human: boolean
  delay?: number
  completed: boolean
}

type MessageDefinition = MessageString | MessageComponentDefinition
type Message = MessageString | MessageComponent

const isMessageComponentDefinition = (arg: MessageDefinition): arg is MessageComponentDefinition => typeof arg.content !== 'string'

const convert = (messages: Array<MessageDefinition>) => {
  return messages.reduce<Array<MessageString | MessageComponent>>((res, message) => {
    if (isMessageComponentDefinition(message)) {
      const Component = Components[message.content.component]
      return [...res, { ...message, content: <Component {...message.content.props} /> }]
    }
    else return [...res, message]
  }, [])
}

const loadingContent: ComponentDefinition = { component: 'Loading', props: {} }

export const useMessages = (): [Array<Message>] => {
  const [messageDefinitions, setMessageDefinitions] = useCorsState<Array<MessageDefinition>>('chat-messages', { window: window.parent }, [])
  const [convertedMessage, setConvertedMessages] = useState<Array<Message>>(convert(messageDefinitions))
  const countor = useRef<number>(messageDefinitions.length)

  useEffect(() => {
    const last = messageDefinitions.slice(-1)[0]
    if (countor.current < messageDefinitions.length && last.delay) {
      setConvertedMessages(convert([...messageDefinitions.slice(0, -1), { ...last, content: loadingContent }]))
      setTimeout(() => {
        setConvertedMessages(convert(messageDefinitions))
        setMessageDefinitions([...messageDefinitions.slice(0, -1), { ...last, completed: true }])
      }, last.delay)
    } else setConvertedMessages(convert(messageDefinitions))
    countor.current = messageDefinitions.length
  }, [messageDefinitions])

  return [convertedMessage]
}