/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { useChatConfigContext, useImageUrl } from "@botui/chat-hooks";
import { Header as ChatHeader } from '@botui/chat-components'
import { css } from '@emotion/react'

const style = {
  root: css({
    position: 'sticky',
    top: 0,
    height: 60,
    zIndex: 100
  }),
  logoImage: {
    maxHeight: 55
  }
}

export const Header: FC = () => {
  const { theme: { header }, images, title } = useChatConfigContext()
  const imageURL = useImageUrl(images.logo?.key)

  return (
    <div css={style.root}>
      <ChatHeader
        baseColor={header?.backgroundColor}
        logo={
          imageURL ? (
            <img src={imageURL} alt="logo" css={style.logoImage} />
          ) : (
            title
          )
        }
      />
    </div>
  )
}