import { FC } from 'react'
import { useThemeContext } from '../../../hooks/use-theme-context'
import { css } from '@emotion/core'

const style = {
  footer: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '40px',
    position: 'fixed',
    bottom: 0
  })
}

const Footer: FC = () => {
  const {
    theme: { footer }
  } = useThemeContext()

  return <div css={[style.footer, css(footer)]}></div>
}

export default Footer
