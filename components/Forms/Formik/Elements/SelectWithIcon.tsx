import { FC, ReactNode, InputHTMLAttributes } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { FieldMetaProps, useField } from 'formik'
import { okColor, errorColor, baseBorderColor } from '../../shared/baseStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const style = {
  base: css`
    padding: 8px 25px 8px 8px;
    border-radius: 3px;
    background-color: #ffffff;
    width: 100%;
    height: 42px;
    font-size: 1.1em;
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
    color: rgb(0,0,0,0.5);
  `,
  isOk: css`
    border: solid 2px ${okColor};
  `,
  noTouched: css`
    border: solid 2px ${baseBorderColor};
  `,
  withError: css`
    border: solid 2px ${errorColor};
  `,
  okIcon: css`
  float: right;
  position: relative;
  right: 5px;
  top: -31px;
  height: 0px;
  color: ${okColor};
`
}

const styles = ({ value, error, touched, initialValue }: FieldMetaProps<any>): SerializedStyles | SerializedStyles[] => {
  if (!error) return [style.base, style.isOk];
  if (!touched && error && initialValue.length === 0) return [style.base, style.noTouched, ...(!value ? [style.noValue] : [])];
  if (error) return [style.base, style.withError, ...(!value ? [style.noValue] : [])];
  return style.base
};

export type SelectWithIconProps = {
  name: string
  title: string | ReactNode
} & InputHTMLAttributes<Element>

const SelectWithIcon: FC<SelectWithIconProps> = ({ title, ...props }) => {
  const [field, meta] = useField(props)
  const { error } = meta
  return (
    <>
      <div css={style.title}>{title}</div>
      <select {...field} {...props} css={styles(meta)} />
      {!error &&
        <div css={style.okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      }
    </>
  );
};

export default SelectWithIcon;