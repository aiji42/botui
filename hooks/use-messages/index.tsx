import { useState, useRef, useEffect, useReducer, useCallback } from "react"
import * as Forms from '../../components/Forms'
import Loading from '../../components/Loading'
const Components = { ...Forms, Loading }

interface MessageString {
  content: string
  human: boolean
  delay?: number
}

type ComponentKeys = 'FormAddress' | 'FormBirthDay' | 'FormEmail' | 'FormName' | 'FormTel' | 'FormCreditCard'
  | 'FormCustomRadioGroup' | 'FormCustomSelect' | 'FormCustomInput' | 'FormCustomTextarea' | 'FormConfirm' | 'Loading'

type ComponentDefinition = { component: ComponentKeys, props: any }

interface MessageComponentDefinition {
  content: ComponentDefinition
  human: boolean
  delay?: number
}

interface MessageComponent {
  content: JSX.Element
  human: boolean
  delay?: number
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

interface ActionAdd { type: 'add', message: Array<MessageDefinition> | MessageDefinition }
interface ActionRemove { type: 'remove' }

const reducer = (state: Array<MessageDefinition>, action: ActionAdd | ActionRemove): Array<MessageDefinition> => {
  const { type } = action
  switch (type) {
    case 'add':
      const { message } = action as ActionAdd
      return [...state, ...(Array.isArray(message) ? message : [message])]
    case 'remove':
      return state.slice(0, -1)
    default:
      return state
  }
}

export const useMessages = (initMessageDefinitions: Array<MessageDefinition>): [Array<Message>, {
  add: (message: any) => void
  remove: () => void
}] => {
  const [messageDefinitions, messageDefinitionsDispatch] = useReducer(reducer, initMessageDefinitions)
  const [convertedMessage, setConvertedMessages] = useState<Array<Message>>(convert(initMessageDefinitions))
  const countor = useRef<number>(messageDefinitions.length)

  const add = useCallback((message) => messageDefinitionsDispatch({ type: 'add', message }), [messageDefinitionsDispatch])
  const remove = useCallback(() => messageDefinitionsDispatch({ type: 'remove' }), [messageDefinitionsDispatch])

  useEffect(() => {
    const last = messageDefinitions.slice(-1)[0]
    if (countor.current < messageDefinitions.length && last.delay) {
      setConvertedMessages(convert([...messageDefinitions.slice(0, -1), { content: loadingContent, human: last.human }]))
      setTimeout(() => {
        setConvertedMessages(convert(messageDefinitions))
      }, last.delay)
    } else setConvertedMessages(convert(messageDefinitions))
    countor.current = messageDefinitions.length
  }, [messageDefinitions])

  return [convertedMessage, { add, remove }]
}