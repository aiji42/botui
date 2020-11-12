import { FC, useMemo } from 'react'
import { css } from '@emotion/react'
import { useMessageContext } from '../../../../hooks/use-message-context'
import { useChatConfigContext } from '../../../../hooks/use-chat-config-context'

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
  const {
    message: {
      human,
      content: { type }
    }
  } = useMessageContext()
  const {
    theme: { agent, user }
  } = useChatConfigContext()
  const styles = useMemo(() => {
    const s = [style.base, css(agent)]
    if (human) s.push(style.human, css(user))
    if (type === 'form') s.push(style.form)
    return s
  }, [human, type, agent, user])

  return <div css={styles} {...props} />
}

export default Bubble
