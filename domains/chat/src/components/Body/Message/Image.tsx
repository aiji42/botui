/** @jsxImportSource @emotion/react */
import { FC, useEffect, useCallback, useState, useRef } from 'react'
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
  const [imageLoaded, setImageLoaded] = useState(false)
  const mounted = useRef(true)
  useEffect(() => {
    setTimeout(() => mounted.current && setLoading(false), message.content.delay ?? 0)
    return () => {
      mounted.current = false
    }
  }, [message.content.delay])
  const completed = useRef(false)
  useEffect(() => {
    if (completed.current || !imageLoaded || loading) return
    handleUpdate && handleUpdate({ ...message, completed: true })
    completed.current = true
  }, [loading, imageLoaded, handleUpdate, message])
  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true)
  }, [setImageLoaded])


  return (
    <>
      {loading && <MessageLoading />}
      <img
        src={url}
        onLoad={handleImageLoaded}
        onError={handleImageLoaded}
        css={style(loading)}
        alt="illustration"
      />
    </>
  )
}

export default Image
