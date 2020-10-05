import { FC } from 'react'
import {
  SimpleForm,
  TextInput,
  RadioButtonGroupInput,
  Create,
  CreateProps
} from 'react-admin'

const proposals = [
  { id: 'ec', name: 'ECサイト' },
  { id: 'inquiry', name: 'お問い合わせフォーム' },
  { id: 'manual', name: 'マニュアル' }
]

const CreateWizard: FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <RadioButtonGroupInput
          source="proposals"
          label="template"
          choices={proposals}
        />
      </SimpleForm>
    </Create>
  )
}

export default CreateWizard
