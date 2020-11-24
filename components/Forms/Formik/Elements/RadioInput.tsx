import { FC, ReactNode, InputHTMLAttributes, useMemo } from 'react'
import { css } from '@emotion/react'
import { useField, FieldInputProps } from 'formik'
import { okColor, baseBorderColor } from '../../shared/baseStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const style = {
  base: css`
    font-size: 1.1em;
    border-radius: 3px;
    background-color: #ffffff;
    display: table;
    width: 100%;
    box-sizing: border-box;
    span {
      vertical-align: middle;
      display: inline-block;
      width: 75%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `,
  input: css`
    display: none;
  `,
  icon: css`
    vertical-align: middle;
    display: inline-block;
    margin: 13px;
  `,
  unCheckedIcon: css`
    color: gray;
  `,
  checkedIcon: css`
    color: ${okColor};
  `,
  unCheckedStyle: css`
    border: solid 2px ${baseBorderColor};
    background-color: #ffffff;
  `,
  checkedStyle: css`
    border: solid 3px ${okColor};
    background-color: #fffdcf;
  `
}

type Props = {
  title: string | ReactNode
  value: any
} & FieldInputProps<any> &
  InputHTMLAttributes<HTMLInputElement>

const RadioInput: FC<Props> = ({ value, title, ...props }) => {
  const [, { value: formValue }] = useField(props)
  const checked = useMemo(() => formValue === value, [formValue, value])

  return (
    <label
      css={[style.base, checked ? style.checkedStyle : style.unCheckedStyle]}
    >
      <div
        css={[style.icon, checked ? style.checkedIcon : style.unCheckedIcon]}
      >
        {checked ? (
          <FontAwesomeIcon icon={faDotCircle} />
        ) : (
          <FontAwesomeIcon icon={faCircle} />
        )}
      </div>
      <span>{title}</span>
      <input
        {...props}
        value={value}
        type="radio"
        css={style.input}
        checked={checked}
      />
    </label>
  )
}

export default RadioInput
