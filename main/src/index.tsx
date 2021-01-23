import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/react'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

const global = css`
  body {
    margin: 0;
    font-family: 'Noto Sans JP', sans-serif;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  input,
  button,
  select,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    font: inherit;
    outline: none;
  }

  textarea {
    resize: vertical;
  }

  input[type='checkbox'],
  input[type='radio'] {
    display: none;
  }

  input[type='submit'],
  input[type='button'],
  label,
  button,
  select {
    cursor: pointer;
  }

  select::-ms-expand {
    display: none;
  }
`

ReactDOM.render(
  <>
    <Global styles={global} />
  </>,
  document.getElementById('root')
)
