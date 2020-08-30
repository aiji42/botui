import { FC, useContext, useMemo } from 'react'
import { css } from '@emotion/core'
import { MessageContext } from '../..'

const style = {
  base: css({
    lineHeight: 1.3,
    backgroundColor: '#0f84fe',
    color: '#ffffff',
    padding: 8,
    borderRadius: 12,
    width: 'auto',
    maxWidth: '75%',
    display: 'inline-block'
  }),
  human: css({
    color: '#000000',
    backgroundColor: '#eeeeee',
    width: 'auto',
    maxWidth: '80%',
    float: 'right'
  }),
  form: css({
    width: '80%'
  })
}

const Bubble: FC = (props) => {
  const { message: { human, content: { type } } } = useContext(MessageContext)
  const styles = useMemo(() => {
    const s = [style.base]
    if (human) s.push(style.human)
    if (type === 'form') s.push(style.form)
    return s
  }, [human, type])

  return (
    <div css={styles} {...props} />
  )
}

export default Bubble