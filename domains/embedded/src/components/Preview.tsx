import React, { FC, useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { Spinner } from './Spinner'
import { Wrapper } from './Wrapper'
import { Preview as BotuiPreview } from '@botui/chat-controller'
import { Fab } from './Fab'
import { useFetchSession } from '@botui/chat-hooks'
import { Session } from '@botui/types'

interface Props {
  sessionId: string
}

export const Preview: FC<Props> = ({ sessionId }) => {
  const session = useFetchSession(sessionId)
  const [open, setOpen] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {
    !open && setLoaded(false)
  }, [open])
  const handleStart = useCallback(() => setLoaded(true), [setLoaded])
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])
  const narrow = useRef(window.innerWidth < 600)
  const isFull = useMemo(
    () =>
      session?.launcher.size === 'full' ||
      (narrow.current && session?.launcher.size === 'auto'),
    [session]
  )
  const isSessionLoaded = useRef(false)
  useEffect(() => {
    if (session && !isSessionLoaded.current) {
      session.launcher.defaultOpen && setOpen(true)
      isSessionLoaded.current = true
    }
  }, [session])

  return session?.active ? (
    <>
      <Wrapper isFull={isFull} isOpen={open}>
        {!loaded && <Spinner />}
        <BotuiPreview
          proposals={session.proposals}
          chatConfig={{
            ...omitProposal(session),
            percentOfProgress: 0,
            messages: [],
            onStart: handleStart,
            onClose: handleClose
          }}
        />
      </Wrapper>
      <Fab onClick={toggleOpen} isOpen={open} />
    </>
  ) : (
    <></>
  )
}

const omitProposal = (session: Session): Omit<Session, 'proposals'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { proposals, ...res } = session
  return res
}