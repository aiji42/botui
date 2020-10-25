import { FC } from 'react'
import { useThemeContext } from '../../../hooks/use-theme-context'
import { css } from '@emotion/core'

const style = {
  heder: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '60px',
    position: 'fixed',
    zIndex: 100
  }),
  image: css({
    maxHeight: '80%',
    maxWidth: '60%',
    margin: 'auto',
    display: 'block'
  })
}

const Header: FC = () => {
  const {
    theme: { header },
    images: { logo }
  } = useThemeContext()

  return (
    <div css={[style.heder, css(header)]}>
      {logo && <img src={logo} css={style.image} />}
    </div>
  )
}

export default Header
