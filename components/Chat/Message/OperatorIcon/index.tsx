import { FC } from 'react'
import { css } from '@emotion/core'
import { useMessageContext } from '../../../../hooks/use-message-context'
import { useChatConfigContext } from '../../../../hooks/use-chat-config-context'

const style = {
  display: css({
    position: 'relative',
    float: 'left',
    marginRight: 5
  }),
  hidden: css({
    position: 'relative',
    float: 'left',
    marginRight: 5,
    width: 44,
    height: 44
  }),
  image: css({
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    objectFit: 'cover'
  }),
  imageBase: css({
    backgroundColor: '#0f84fe',
    width: 43,
    height: 43,
    borderRadius: '50%',
    position: 'relative'
  })
}

const OperatorIcon: FC = () => {
  const {
    message: { human, iconDisplay }
  } = useMessageContext()
  const {
    theme: { agent },
    images: { agent: agentIcon }
  } = useChatConfigContext()
  const display = iconDisplay === undefined ? true : iconDisplay
  if (human) return <></>
  return (
    <div css={display ? style.display : style.hidden}>
      {display && (
        <div css={[style.imageBase, css(agent)]}>
          <img css={style.image} src={agentIcon || '/operator_female1.jpg'} />
        </div>
      )}
    </div>
  )
}

export default OperatorIcon
