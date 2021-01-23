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
    width: '100%',
    zIndex: 100
  }),
  logoImage: css({
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  }),
  title: css({
    padding: 15
  })
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
              <p css={style.title}>{title}</p>
          )
        }
      />
    </div>
  )
}