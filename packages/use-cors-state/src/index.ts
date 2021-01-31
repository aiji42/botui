import { useState, useEffect, useRef, useCallback } from 'react'
import postRobot, { ServerOptionsType } from 'post-robot'

type ValueInRecord<T> = { value: T }

const isValueInRecord = <T>(data: unknown): data is ValueInRecord<T> => typeof data === 'object' && data !== null && 'value' in data

const postRobotSend = (targetWindow: Window | undefined, synchronizingKey: string, state: Record<string, unknown>, retriedCount = 0) => {
  postRobot
    .send(targetWindow || window, synchronizingKey, state)
    .catch((e) => {
      if (retriedCount > 2) {
        console.error(e)
        return
      }
      setTimeout(
        () => postRobotSend(targetWindow, synchronizingKey, state, retriedCount + 1),
        100 + Math.pow(10, retriedCount + 1)
      )
    })
}

export const useCorsState = <T>(
  synchronizingKey: string,
  options: ServerOptionsType,
  initialValue: T
): [T, (val: T) => void] => {
  const [state, setState] = useState<ValueInRecord<T>>({ value: initialValue })
  const setStateWrapper = useCallback((value: T) => {
    setState({ value })
  }, [setState])
  const sendable = useRef<boolean>(true)

  useEffect(() => {
    const listener = postRobot.on(synchronizingKey, options, ({ data }) => {
      if (!isValueInRecord<T>(data)) return
      sendable.current = false
      setState(data)
    })
    return () => listener.cancel()
  }, [synchronizingKey, options])

  useEffect(() => {
    sendable.current && postRobotSend(options?.window, synchronizingKey, state)
    sendable.current = true
  }, [state, synchronizingKey, options.window])

  return [state.value, setStateWrapper]
}
