/** @jsxImportSource @emotion/react */
import React, { FC, SelectHTMLAttributes } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import { FieldMetaProps, useField, FieldInputProps } from 'formik'
import { colors } from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const style = {
  base: css`
    padding: 8px 25px 8px 8px;
    border-radius: 3px;
    background-color: #ffffff;
    width: 100%;
    height: 42px;
    font-weight: normal;
    color: #000;
    margin-bottom: 0px;
    box-sizing: border-box;
    &:focus {
      border-left-width 5px;
      transition: all 300ms 0s ease;
    }
  `,
  title: css`
    font-size: 0.9em;
    line-height: 1;
    padding-top: 6px;
    padding-bottom: 4px;
  `,
  noValue: css`
    color: rgb(0, 0, 0, 0.5);
  `,
  isOk: css`
    border: solid 2px ${colors.okColor};
  `,
  noTouched: css`
    border: solid 2px ${colors.baseBorderColor};
  `,
  withError: css`
    border: solid 2px ${colors.errorColor};
  `,
  okIcon: css`
    float: right;
    position: relative;
    right: 5px;
    top: -31px;
    height: 0px;
    color: ${colors.okColor};
  `,
  arrowIcon: css`
    float: right;
    position: relative;
    right: 10px;
    top: -31px;
    height: 0px;
  `
}

const styles = ({
  value,
  error,
  touched,
  initialValue
}: FieldMetaProps<string>): SerializedStyles | SerializedStyles[] => {
  if (!error) return [style.base, style.isOk]
  if (!touched && error && initialValue?.length === 0)
    return [style.base, style.noTouched, ...(!value ? [style.noValue] : [])]
  if (error)
    return [style.base, style.withError, ...(!value ? [style.noValue] : [])]
  return style.base
}

export type SelectWithIconProps = {
  title?: string | Element
} & FieldInputProps<string> &
  SelectHTMLAttributes<HTMLSelectElement>

const SelectWithIcon: FC<SelectWithIconProps> = ({ title, ...props }) => {
  const [, meta] = useField(props)
  const { error } = meta
  return (
    <>
      {title && <div css={style.title}>{title}</div>}
      <select {...props} css={styles(meta)} />
      {!error ? (
        <div css={style.okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      ) : (
        <div css={style.arrowIcon}>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      )}
    </>
  )
}

export default SelectWithIcon
