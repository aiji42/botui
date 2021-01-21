import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals } from '@botui/types'
import { effectToProposals, controlMessage } from './dependencies'

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
  const messages = useMemo(() => config?.messages || [], [config?.messages])

  useEffect(() => {
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const prevProposals = useRef<Proposals>()
  useEffect(() => {
    const [messages, percentOfProgress] = controlMessage(proposals, chatConfig)
    setConfig({ ...chatConfig, percentOfProgress, messages })
    prevProposals.current = proposals
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposals])

  return <></>
}
