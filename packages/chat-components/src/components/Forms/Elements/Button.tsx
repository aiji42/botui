/** @jsxImportSource @emotion/react */
import React, { FC, ButtonHTMLAttributes } from 'react'
import { css } from '@emotion/react'

const style = css`
  display: block;
  width: 70%;
  padding: 12px 0;
  margin: 10px auto 0px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  background-color: #ea4e53;
  font-size: 1.1em;
  font-weight: bold;
  border-bottom: solid 4px #a97171;
  &:disabled {
    opacity: 0.5;
  }
  &:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    border-bottom: none;
    margin-bottom: 4px;
  }
`

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button css={style} {...props} />
)

export default Button
