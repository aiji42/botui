/** @jsxImportSource @emotion/react */
import React, { useState, FC, useCallback, FocusEvent } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import { colors } from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize, {
  TextareaAutosizeProps
} from 'react-textarea-autosize'
import { FieldMetaProps, useField, FieldInputProps } from 'formik'

const style = {
  base: css`
    padding: 8px 25px 8px 8px;
    border-radius: 3px;
    background-color: #ffffff;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    font-size: 1.05em;
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
    color: ${colors.okColor};
    height: 0px;
  `
}

const styles = ({
  error,
  touched,
  initialValue
}: FieldMetaProps<string>): SerializedStyles | SerializedStyles[] => {
  if (!error) return [style.base, style.isOk]
  if (!touched && error && initialValue?.length === 0)
    return [style.base, style.noTouched]
  if (error) return [style.base, style.withError]
  return style.base
}

type Props = {
  title?: string | Element
} & FieldInputProps<string> &
  TextareaAutosizeProps

const TextareaWithIcon: FC<Props> = ({ title, ...props }) => {
  const [minRows, setMinRows] = useState<number>(0)
  const [field, meta] = useField(props)
  const { error } = meta
  const { onBlur } = field
  const handleFocus = useCallback(() => setMinRows(2), [setMinRows])
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      onBlur(e)
      setMinRows(0)
    },
    [setMinRows, onBlur]
  )

  return (
    <>
      <div css={style.title}>{title}</div>
      <TextareaAutosize
        {...props}
        minRows={minRows}
        css={styles(meta)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!error && (
        <div css={style.okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      )}
    </>
  )
}

TextareaWithIcon.defaultProps = {
  autoFocus: false
}

export default TextareaWithIcon
