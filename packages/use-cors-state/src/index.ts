import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
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

export const useCorsState = <T extends Record<string, unknown>>(
  synchronizingKey: string,
  options: ServerOptionsType,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue)
  const sendable = useRef<boolean>(true)

  useEffect(() => {
    const listener = postRobot.on(synchronizingKey, options, (...[ , , data]) => {
      sendable.current = false
      setState(data as T)
    })
    return () => listener.cancel()
  }, [synchronizingKey, options])

  useEffect(() => {
    sendable.current &&
      postRobot.send(options?.window || window, synchronizingKey, state)
    sendable.current = true
  }, [state, synchronizingKey, options.window])

  return [state, setState]
}
