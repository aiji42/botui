import { useState, useEffect, useRef, useCallback } from 'react'
import postRobot from 'post-robot'

type CrossDomainWindowType = Window | null;
type DomainMatcher = string | RegExp | string[];
type HandlerType = (
  source: CrossDomainWindowType,
  origin: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object
) => void | Promise<unknown>
type ErrorHandlerType = (err: unknown) => void;

interface ServerOptionsType {
  handler?: HandlerType
  errorHandler?: ErrorHandlerType
  window?: CrossDomainWindowType
  name?: string
  domain?: DomainMatcher
  once?: boolean
  errorOnClose?: boolean
}

type ValueInRecord<T> = { value: T }

const isValueInRecord = <T>(data: unknown): data is ValueInRecord<T> => typeof data === 'object' && data !== null && 'value' in data

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
    const listener = postRobot.on(synchronizingKey, options, (...[ , , data]) => {
      if (!isValueInRecord<T>(data)) return
      sendable.current = false
      setState(data)
    })
    return () => listener.cancel()
  }, [synchronizingKey, options])

  useEffect(() => {
    sendable.current &&
      postRobot.send(options?.window || window, synchronizingKey, state)
    sendable.current = true
  }, [state, synchronizingKey, options.window])

  return [state.value, setStateWrapper]
}
