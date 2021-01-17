/** @jsxImportSource @emotion/react */
import { FC, useEffect, useCallback, useState } from 'react'
import { useMessageContext, useImageUrl } from '@botui/chat-hooks'
import { MessageLoading } from '@botui/chat-components'
import { css } from '@emotion/react'
import { ContentImage } from '@botui/types'

const style = (loading: boolean) => loading ? css({
    display: 'none'
  }) : css({
    width: '100%'
  })

const Image: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentImage>()
  const url = useImageUrl(message.content.props.imgKey)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    loading && handleUpdate && handleUpdate({ ...message, completed: true })
  }, [loading])
  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <>
      {loading && <MessageLoading />}
      <img src={url} onLoad={handleLoad} css={style(loading)} />
    </>
  )
}

export default Image
