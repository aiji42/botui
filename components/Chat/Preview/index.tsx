import { FC, useState } from 'react'
import Communicator from './Communicator'
import { ChatConfig, Proposals } from '../../../@types/session'

const Preview: FC<{
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
        <Communicator
          targetWindow={iframeElement.contentWindow}
          initProposals={initProposals}
          chatConfig={props.chatConfig}
        />
      )}
    </>
  )
}

export default Preview
