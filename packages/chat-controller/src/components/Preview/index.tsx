import React, { FC, useCallback, useState } from 'react'
import { Controller } from '../Controller'
import { ChatConfig, Proposals } from '@botui/types'

let host: string = process.env.REACT_APP_BOTUI_HOST ?? 'http://localhost:3000/'
type PreviewConfig = { chatHost: string }
export const setPreviewConfig = ({ chatHost }: PreviewConfig): void => {
  host = chatHost
}

export const Preview: FC<{
  proposals: Proposals
  chatConfig: ChatConfig
  editing?: boolean
}> = (props) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals] = useState<Proposals>(props.proposals)
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => setLoaded(true), [setLoaded])

  return (
    <>
      <iframe
        ref={setIframeElement}
        src={host}
        height="100%"
        width="100%"
        frameBorder="no"
        onLoad={handleLoaded}
        style={{ minHeight: '-webkit-fill-available' }}
      />
      {!!iframeElement?.contentWindow && initProposals.length && loaded && (
        <Controller
          targetWindow={iframeElement.contentWindow}
          initProposals={initProposals}
          chatConfig={props.chatConfig}
          editing={props.editing}
        />
      )}
    </>
  )
}
