import { FC, CSSProperties } from 'react'
import { useChatConfigContext } from '../../../hooks/use-chat-config-context'
import { css } from '@emotion/core'
import { AmplifyS3Image } from '@aws-amplify/ui-react'

const style = {
  heder: css({
    backgroundColor: '#20224a',
    width: '100%',
    height: '60px',
    position: 'relative'
  }),
  image: css({
    maxHeight: '80%',
    maxWidth: '60%',
    margin: 'auto',
    display: 'block',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }),
  title: css({
    color: 'white',
    fontSize: 'x-large',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  })
}

const imageStyle = ({ '--height': '100%' } as unknown) as CSSProperties

const Header: FC = () => {
  const {
    theme: { header },
    images: { logo },
    title
  } = useChatConfigContext()

  return (
    <div css={[style.heder, css(header)]}>
      {!logo ? (
        <span css={style.title}>{title}</span>
      ) : (
        <AmplifyS3Image
          imgKey={logo.key}
          style={imageStyle}
          css={style.image}
        />
      )}
    </div>
  )
}

export default Header
