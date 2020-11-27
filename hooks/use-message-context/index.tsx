import { FC, createContext, useContext } from 'react'
import { Proposal } from '../../@types/session'

interface MessageContextType {
  handleUpdate?: (arg: Proposal) => void
  message: Proposal
}

const noOp = () => {
  // do nothing.
}

const Context = createContext<MessageContextType>({
  handleUpdate: noOp,
  message: {
    id: '',
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
