import { FC, createContext, useContext } from 'react'
import { ProposalMessage } from '../../@types/session'

interface MessageContextType {
  handleUpdate?: (arg: ProposalMessage) => void
  message: ProposalMessage
}

const noOp = () => {
  // do nothing.
}

const Context = createContext<MessageContextType>({
  handleUpdate: noOp,
  message: {
    id: '',
    type: 'message',
    human: true,
    content: { type: 'string', props: {} },
    completed: false,
    updated: false,
    before: '',
    after: ''
  }
})

export const useMessageContext = (): MessageContextType => useContext(Context)

const MessageContext: FC<MessageContextType> = ({
  message,
  handleUpdate = noOp,
  children
}) => {
  return (
    <Context.Provider value={{ message, handleUpdate }}>
      {children}
    </Context.Provider>
  )
}

export default MessageContext
