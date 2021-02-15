import React, { FC, useCallback, useState } from 'react'
import { Controller } from '../Controller'
import { ChatConfig, Proposals } from '@botui/types'
import ScriptTag from 'react-script-tag'

let host: string = process.env.REACT_APP_BOTUI_HOST ?? 'http://localhost:3000/'
type PreviewConfig = { chatHost: string }
export const setPreviewConfig = ({ chatHost }: PreviewConfig): void => {
  host = chatHost
}

export const Preview: FC<{
  proposals: Proposals
  chatConfig: ChatConfig
  editing?: boolean
}> = ({ proposals, chatConfig, editing }) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals] = useState<Proposals>(proposals)
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => setLoaded(true), [setLoaded])

  return (
    <>
      {!editing &&
        chatConfig.launcher.loadScripts?.map((url) => (
          <ScriptTag key={url} isHydrating={true} src={url} />
        ))
      }
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
          chatConfig={chatConfig}
          editing={editing}
        />
      )}
    </>
  )
}
