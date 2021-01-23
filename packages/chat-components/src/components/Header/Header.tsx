/** @jsxImportSource @emotion/react */
import React, { FC, ReactNode } from 'react'
import { css } from '@emotion/react'

const style = {
  heder: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '100%',
    minHeight: 50,
  }),
  logo: css({
    height: '100%',
    width: '100%',
    color: 'white',
    fontSize: 'x-large',
    textAlign: 'center',
  })
}

interface Props {
  baseColor?: string
  logo?: ReactNode
}

export const Header: FC<Props> = (props) => {
  return (
    <div css={props.baseColor ? [style.heder, css({ backgroundColor: props.baseColor })] : style.heder}>
      <div css={style.logo}>{props.logo ?? <></>}</div>
    </div>
  )
}
