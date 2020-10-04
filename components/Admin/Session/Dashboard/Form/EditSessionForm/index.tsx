import { FC } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  SimpleFormProps
} from 'react-admin'

const EditSessionForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" />
      <BooleanInput source="active" />
    </SimpleForm>
  )
}

export default EditSessionForm
