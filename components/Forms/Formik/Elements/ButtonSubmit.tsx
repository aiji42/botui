import { FC, ButtonHTMLAttributes, useContext } from 'react';
import Button from './Button';
import { MessageContext } from '../../../Chat';
import { useFormikContext } from 'formik';

const ButtonSubmit: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  const { message: { completed } } = useContext(MessageContext)
  const { isValid, isSubmitting, dirty } = useFormikContext()
  const disabled = !dirty && completed || !isValid || isSubmitting
  const updated = dirty && completed

  return (
    <Button type="submit" {...props} disabled={disabled}>
      {children || updated ? '変更' : '次へ'}
    </Button>
  );
};

export default ButtonSubmit;