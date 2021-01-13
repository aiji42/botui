import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals, Message } from '../../../../@types/session'
import { effectToProposals } from './effectToProposals'
import { controlMessage } from './controlMessage'
import deepEqual from 'deep-equal'

const Communicator: FC<{
  targetWindow: Window
  initProposals: Proposals
  chatConfig: ChatConfig
}> = ({ targetWindow, initProposals, chatConfig }) => {
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
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
  }, [messages])

  const prevProposals = useRef<Proposals>()
  useEffect(() => {
    // unMount で closer が再実行されることを防止する
    if (!deepEqual(prevProposals.current, proposals))
      setMessages(controlMessage(proposals, chatConfig))
    prevProposals.current = proposals
  }, [proposals, chatConfig])

  return <></>
}

export default Communicator
