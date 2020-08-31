import { FC } from 'react'
import { css } from '@emotion/core'
import { useMessageContext } from '../../../../hooks/use-message-context'

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
    border: '2px solid #0f84fe'
  })
}

const OperatorIcon: FC = () => {
  const { message: { human, iconDisplay } } = useMessageContext()
  const display = iconDisplay === undefined ? true : iconDisplay

  if (human) return <></>
  return (
    <div css={display ? style.display : style.hidden}>
      {display && <img css={style.image} src="/operator.jpg" />}
    </div>
  )
}

export default OperatorIcon