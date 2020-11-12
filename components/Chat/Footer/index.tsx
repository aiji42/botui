import { FC, useMemo } from 'react'
import { useChatConfigContext } from '../../../hooks/use-chat-config-context'
import { css } from '@emotion/react'

const style = {
  footer: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '40px',
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
  progressBar: {
    height: 8,
    width: 0,
    backgroundColor: '#20224a',
    borderRadius: 4
  }
}

const Footer: FC = () => {
  const {
    theme: { footer, progressBar },
    messages,
    messagesCount
  } = useChatConfigContext()
  const progress = useMemo(() => {
    if (!messages.length || messagesCount < 1) return '0%'
    const num = (messages.length / messagesCount) * 100
    return `${num}%`
  }, [messages])

  return (
    <div css={[style.footer, css(footer)]}>
      <div css={style.progressBarBase}>
        <div
          css={[style.progressBar, css(progressBar), css({ width: progress })]}
        />
      </div>
    </div>
  )
}

export default Footer
