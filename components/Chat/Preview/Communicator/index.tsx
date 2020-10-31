import { FC, useCallback, useEffect, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { ChatConfig, Proposals } from '../../../../@types/session'

const values = (messages: Proposals): { [x: string]: any } =>
  messages.reduce((res, message) => {
    if (message.content.type !== 'form') return res
    return message.content.props.values
      ? { ...res, ...message.content.props.values }
      : res
  }, {})

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
    (messages: Proposals) => {
      setConfig({ ...chatConfig, messages })
    },
    [setConfig]
  )

  useEffect(() => {
    if (!config?.messages) {
      setConfig({ ...chatConfig, messages: [] })
      return
    }

    const updatedIndex = config.messages.findIndex(({ updated }) => updated)
    if (updatedIndex > 0) {
      setMessages([
        ...config.messages.slice(0, updatedIndex),
        { ...config.messages[updatedIndex], updated: false }
      ])
      return
    }
    setProposals([
      ...config.messages,
      ...proposals
        .slice(config.messages.length)
        .reduce<Proposals>(
          (res, original) => [...res, { ...original, completed: false }],
          []
        )
    ])
  }, [config?.messages])

  useEffect(() => {
    if (config?.messages?.some(({ completed }) => !completed)) return

    const unCompletedIndex = proposals.findIndex(({ completed }) => !completed)
    const tailMessage = proposals[unCompletedIndex - 1]
    if (tailMessage?.after) {
      /* eslint no-new-func: "off" */
      const afterFunction = new Function('values', 'message', tailMessage.after)
      afterFunction(values(proposals), tailMessage)
    }

    if (!proposals[unCompletedIndex]) return
    const nextMessage = { ...proposals[unCompletedIndex], completed: false }
    if (nextMessage.before) {
      /* eslint no-new-func: "off" */
      const beforeFunction = new Function(
        'values',
        'message',
        nextMessage.before
      )
      beforeFunction(values(proposals), nextMessage)
    }

    setMessages([...proposals.slice(0, unCompletedIndex), nextMessage])
  }, [proposals])

  return <></>
}

export default Communicator
