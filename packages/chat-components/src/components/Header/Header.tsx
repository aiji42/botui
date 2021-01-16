/** @jsxImportSource @emotion/react */
import React, { FC, ReactNode } from 'react'
import { css } from '@emotion/react'

const style = {
  heder: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '60px',
    position: 'relative'
  }),
  logo: css({
    maxHeight: '80%',
    maxWidth: '60%',
    margin: 'auto',
    display: 'block',
    color: 'white',
    fontSize: 'x-large',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  })
}

interface Props {
  baseColor?: string
  logo?: ReactNode
}

export const Header: FC<Props> = (props) => {
  return (
    <div css={props.baseColor ? [style.heder, css({ backgroundColor: props.baseColor })] : style.heder}>
      <span css={style.logo}>{props.logo ?? <></>}</span>
    </div>
  )
}
