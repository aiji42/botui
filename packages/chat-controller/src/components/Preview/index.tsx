import React, { FC, useState } from 'react'
import { Controller } from '../Controller'
import { ChatConfig, Proposals } from '@botui/types'

export const Preview: FC<{
  proposals: Proposals
  chatConfig: ChatConfig
}> = (props) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals] = useState<Proposals>(props.proposals)

  return (
    <>
      <iframe
        ref={setIframeElement}
        src="/"
        height="100%"
        width="100%"
        frameBorder="no"
      />
      {!!iframeElement?.contentWindow && initProposals.length && (
        <Controller
          targetWindow={iframeElement.contentWindow}
          initProposals={initProposals}
          chatConfig={props.chatConfig}
        />
      )}
    </>
  )
}
