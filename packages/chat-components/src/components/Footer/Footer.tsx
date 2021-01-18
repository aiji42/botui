import React, { FC } from 'react'
import { css } from '@emotion/react'

const style = {
  footer: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '100%',
    minHeight: 40,
    position: 'relative'
  }),
  progressBarBase: css({
    backgroundColor: 'white',
    position: 'absolute',
    width: '90%',
    height: 8,
    borderRadius: 4,
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)'
  }),
  progressBar: (percent: number) =>
    css({
      height: 8,
      width: `${percent}%`,
      backgroundColor: '#20224a',
      borderRadius: 4
    })
}

interface Props {
  percent: number
  baseColor?: string
  barColor?: string
}

export const Footer: FC<Props> = (props) => {
  return (
    <div
      css={
        props.baseColor
          ? [style.footer, css({ backgroundColor: props.baseColor })]
          : style.footer
      }
    >
      <div css={style.progressBarBase}>
        <div
          css={
            props.baseColor
              ? [
                  style.progressBar(props.percent),
                  css({ backgroundColor: props.barColor })
                ]
              : style.progressBar(props.percent)
          }
        />
      </div>
    </div>
  )
}
