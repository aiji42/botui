import React, { FC } from 'react'
import { css } from '@emotion/react'

const TransparentImage =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const style = (borderColor?: string) =>
  css({
    maxWidth: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `solid ${borderColor ?? '#0f84fe'}`,
    baseBorderColor: `solid ${borderColor ?? '#0f84fe'}`
  })

interface Props {
  color?: string
  src: string
}

export const ProfileIcon: FC<Props> = (props) => {
  return (
    <img
      css={style(props.color)}
      src={props.src}
      onError={(e) => {
        e.currentTarget.src = TransparentImage
      }}
    />
  )
}
