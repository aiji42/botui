import { FC, useState } from 'react'
import Communicator from './Communicator'
import { Message as Proposal } from '@botui/types'
import { Theme } from '../../../@types/session'

const Preview: FC<{ proposals: Array<Proposal>; theme: Theme }> = (props) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals, setInitProposals] = useState<Array<Proposal>>(
    props.proposals
  )

  return (
    <>
      {/* <iframe ref={ref} src={process.env.BOTUI_CHILD_ENDPOINT} height="100%" width="100%" frameBorder="no" /> */}
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
          theme={props.theme}
        />
      )}
    </>
  )
}

export default Preview
