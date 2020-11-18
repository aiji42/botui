import { FC, useEffect, CSSProperties } from 'react'
import { ImageType } from '@botui/types'
import { useMessageContext } from '../../../../hooks/use-message-context'
import { AmplifyS3Image } from '@aws-amplify/ui-react'

const imageStyle = ({ '--width': '100%' } as unknown) as CSSProperties

const Image: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as ImageType
  useEffect(() => {
    handleUpdate && handleUpdate({ ...message, completed: true })
  }, [])

  return <AmplifyS3Image {...props} style={imageStyle} />
}
export default Image
