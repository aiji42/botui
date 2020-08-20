import { FC } from 'react'
import { css } from '@emotion/core'

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

interface Props {
  display?: boolean
}

const OperatorIcon: FC<Props> = ({ display }) => {
  return (
    <div css={display ? style.display : style.hidden}>
      {display && <img css={style.image} src="/operator.jpg" />}
    </div>
  )
}

OperatorIcon.defaultProps = {
  display: true
}

export default OperatorIcon