import { FC, useState, useEffect } from 'react'
import Communicator from './Communicator'
import { Message as Proposal } from '@botui/types'
import { Images, Theme } from '../../../@types/session'
import { Storage } from 'aws-amplify'

const Preview: FC<{
  proposals: Array<Proposal>
  theme: Theme
  images: Images
}> = (props) => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  )
  const [initProposals, setInitProposals] = useState<Array<Proposal>>(
    props.proposals
  )
  const [images, setImages] = useState<Images | undefined>()

  useEffect(() => {
    Promise.all(
      Object.entries(props.images).map(async ([key, val]) => {
        const res = await Storage.get(val, {
          level: 'public'
        })
        return [key, typeof res === 'string' ? res : '']
      })
    ).then((res) => {
      setImages(Object.fromEntries(res))
    })
  }, [props.images])

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
      {!!iframeElement?.contentWindow && initProposals.length && !!images && (
        <Communicator
          targetWindow={iframeElement.contentWindow}
          initProposals={initProposals}
          theme={props.theme}
          images={images}
        />
      )}
    </>
  )
}

export default Preview
