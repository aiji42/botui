import { FC, useEffect, useState } from 'react'
import { useCorsState } from 'use-cors-state'
import { Message as Proposal } from '@botui/types'
import { Theme } from '../../../../@types/session'

export type Proposals = Array<Proposal>

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
  theme: Theme
}> = ({ targetWindow, initProposals, theme }) => {
  const [messages, setMessages] = useCorsState<Proposals>(
    'chat-messages',
    { window: targetWindow },
    []
  )
  useCorsState<Theme>('chat-theme', { window: targetWindow }, theme)
  const [proposals, setProposals] = useState<Proposals>(initProposals)

  useEffect(() => {
    const updatedIndex = messages.findIndex(({ updated }) => updated)
    if (updatedIndex > 0) {
      setMessages([
        ...messages.slice(0, updatedIndex),
        { ...messages[updatedIndex], updated: false }
      ])
      return
    }
    setProposals([
      ...messages,
      ...proposals
        .slice(messages.length)
        .reduce<Proposals>(
          (res, original) => [...res, { ...original, completed: false }],
          []
        )
    ])
  }, [messages])

  useEffect(() => {
    if (messages.some(({ completed }) => !completed)) return

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
      const beforeFuction = new Function(
        'values',
        'message',
        nextMessage.before
      )
      beforeFuction(values(proposals), nextMessage)
    }

    setMessages([...proposals.slice(0, unCompletedIndex), nextMessage])
  }, [proposals])

  return <></>
}

export default Communicator
