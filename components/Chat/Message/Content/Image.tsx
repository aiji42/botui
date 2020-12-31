import { FC, useEffect, CSSProperties, useCallback, useState } from 'react'
import { ImageType } from '@botui/types'
import { useMessageContext } from '../../../../hooks/use-message-context'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import Loading from './Loading'
import { css } from '@emotion/react'
import { ContentImage } from '../../../../@types/session'

const style = {
  hidden: css({
    display: 'none'
  })
}

const imageStyle = ({ '--width': '100%' } as unknown) as CSSProperties

const Image: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentImage>()
  const [loading, setLoading] = useState(true)
  const props = message.content.props
  useEffect(() => {
    loading && handleUpdate && handleUpdate({ ...message, completed: true })
  }, [loading])
  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <>
      {loading && <Loading />}
      <AmplifyS3Image
        {...props}
        style={imageStyle}
        css={loading ? style.hidden : null}
        handleOnLoad={handleLoad}
        handleOnError={handleLoad}
      />
    </>
  )
}
export default Image
