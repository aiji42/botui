import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals, Message } from '../../../../@types/session'
import { effectToProposals } from './effectToProposals'
import { makeMessage } from './makeMessage'

const Communicator: FC<{
  targetWindow: Window
  initProposals: Proposals
  chatConfig: ChatConfig
  onStart?: () => void
}> = ({ targetWindow, initProposals, chatConfig, onStart }) => {
  const [config, setConfig] = useCorsState<ChatConfig | undefined>(
    'chat-config',
    { window: targetWindow },
    undefined
  )
  const [proposals, setProposals] = useState<Proposals>(initProposals)
  const setMessages = useCallback(
    (messages: Array<Message>) => {
      setConfig({ ...chatConfig, messages })
    },
    [setConfig]
  )
  const messages = useMemo(() => config?.messages || [], [config?.messages])

  useEffect(() => {
    if (messages.length > 0 && onStart) onStart()
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
  }, [messages])

  useEffect(() => {
    setMessages(makeMessage(proposals))
  }, [proposals])

  return <></>
}

export default Communicator
