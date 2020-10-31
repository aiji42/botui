import { FC, useState } from 'react'
import Communicator from './Communicator'
import { Message as Proposal } from '@botui/types'
import { ChatConfig } from '../../../@types/session'

const Preview: FC<{
  proposals: Array<Proposal>
  chatConfig: ChatConfig
}> = (props) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals] = useState<Array<Proposal>>(props.proposals)

  return (
    <>
      <iframe
        ref={setIframeElement}
        src="http://localhost:8080/"
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
