import { FC, useCallback, ChangeEvent } from 'react';
import InputWithIcon, { InputWithIconProps } from './InputWithIcon';
import { useField } from 'formik'

const splitCardNum = (nums: string | number): string => `${nums}`.split('').map((num, i) => (i > 0 && i % 4 === 0) ? ` ${num}` : num).join('');

const onlyNum = (value: string | number): string => `${value}`.normalize('NFKC').replace(/[^0-9]/g, '');

const InputCreditNumber: FC<InputWithIconProps> = ({ innerRef, ...props }) => {
  const [, , helper] = useField(props)
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    helper.setValue(splitCardNum(onlyNum(e.target.value)))
  }, [helper.setValue])


  return <InputWithIcon type="tel" {...props} innerRef={innerRef} onChange={handleChange} />
};

export default InputCreditNumber;