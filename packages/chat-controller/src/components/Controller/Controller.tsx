import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals, Message } from '@botui/types'
import { effectToProposals, controlMessage } from './dependencies'
import deepEqual from 'fast-deep-equal'

export const Controller: FC<{
  targetWindow: Window
  initProposals: Proposals
  chatConfig: ChatConfig
}> = ({ targetWindow, initProposals, chatConfig }) => {
  const [config, setConfig] = useCorsState<ChatConfig | undefined>(
    'chat-config',
    { window: targetWindow, name: 'controller' },
    undefined
  )
  const [proposals, setProposals] = useState<Proposals>(initProposals)
  const setMessages = useCallback(
    (messages: Array<Message>) => {
      setConfig({ ...chatConfig, messages })
    },
    [setConfig, chatConfig]
  )
  const messages = useMemo(() => config?.messages || [], [config?.messages])

  useEffect(() => {
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const prevProposals = useRef<Proposals>()
  const prevChatConfig = useRef<ChatConfig>()
  useEffect(() => {
    // unMount で closer が再実行されることを防止する
    if (!deepEqual(prevProposals.current, proposals) || !deepEqual(prevChatConfig.current, chatConfig))
      setMessages(controlMessage(proposals, chatConfig))
    prevProposals.current = proposals
    prevChatConfig.current = chatConfig
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposals, chatConfig])

  return <></>
}
