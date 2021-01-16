import React, { FC, createContext, useContext } from 'react'
import { ChatConfig } from '@botui/types'

const initialValue: ChatConfig = {
  id: '',
  title: '',
  owner: '',
  active: false,
  theme: {},
  images: {},
  messages: [],
  messagesCount: 0
}

const Context = createContext<ChatConfig>(initialValue)

export const useChatConfigContext = (): ChatConfig => useContext(Context)

export const ChatConfigContextProvider: FC<ChatConfig> = ({
  children,
  ...chatConfig
}) => {
  return (
    <Context.Provider value={{ ...initialValue, ...chatConfig }}>
      {children}
    </Context.Provider>
  )
}
