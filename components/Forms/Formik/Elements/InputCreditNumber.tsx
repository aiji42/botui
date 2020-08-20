import { FC, useState, useCallback, ChangeEvent } from 'react';
import InputWithIcon, { InputWithIconProps } from './InputWithIcon';
import { useField, Field } from 'formik'

const splitCardNum = (nums: string | number): string => `${nums}`.split('').map((num, i) => (i > 0 && i % 4 === 0) ? ` ${num}` : num).join('');

const onlyNum = (value: string | number): string => `${value}`.normalize('NFKC').replace(/[^0-9]/g, '');

const InputCreditNumber: FC<InputWithIconProps> = ({ innerRef, ...props }) => {
  const [field, , { setValue }] = useField(props)
  const [dummyValue, setDummyValue] = useState<string>('')
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e)
    const newValue = onlyNum(e.target.value)
    setDummyValue(splitCardNum(newValue))
    setValue(newValue)
  }, [field.onChange, setValue, setDummyValue])

  return (
    <>
      <InputWithIcon type="tel" {...field} value={dummyValue}
        onChange={handleChange} onBlur={field.onBlur} innerRef={innerRef} {...props} name="cardNumberDummy"
      />
      <Field type="hidden" {...field} />
    </>
  );
};

export default InputCreditNumber;