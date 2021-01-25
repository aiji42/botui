import React, { FC, useEffect, useMemo, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals } from '@botui/types'
import { effectToProposals, controlMessage } from './dependencies'

export const Controller: FC<{
  targetWindow: Window
  initProposals: Proposals
  chatConfig: ChatConfig
  editing?: boolean
}> = ({ targetWindow, initProposals, chatConfig, editing = false }) => {
  const [config, setConfig] = useCorsState<ChatConfig | undefined>(
    'chat-config',
    { window: targetWindow, name: 'controller' },
    undefined
  )
  const [proposals, setProposals] = useState<Proposals>(initProposals)
  const messages = useMemo(() => config?.messages || [], [config?.messages])

  useEffect(() => {
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    const [messages, percentOfProgress] = controlMessage(proposals, chatConfig)
    setConfig({ ...chatConfig, percentOfProgress, messages })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposals])

  useEffect(() => {
    editing && setConfig(chatConfig)
  }, [chatConfig, editing, setConfig])

  return <></>
}
