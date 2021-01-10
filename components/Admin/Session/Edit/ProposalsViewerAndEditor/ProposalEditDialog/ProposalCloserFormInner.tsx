import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer
} from 'react-admin'

const jobChoices = [
  { id: 'none', name: '何もしない' },
  { id: 'script', name: 'カスタムスクリプト' },
  { id: 'store', name: 'データベースへの保存' },
  { id: 'webhook', name: 'Webhook' }
]

const ProposalCloserFormInner: FC = () => {
  return (
    <>
      <SelectInput
        source="data.job"
        choices={jobChoices}
        validate={[required()]}
      />
      <BooleanInput source="data.notify" />
      <FormDataConsumer>
        {({ formData }) => (
          <>
            {formData.data.job === 'script' && (
              <TextInput
                source="data.script"
                validate={[required()]}
                label="カスタムスクリプト"
                fullWidth
                multiline
              />
            )}
            {formData.data.job === 'webhook' && (
              <TextInput
                source="data.endpoint"
                validate={[required()]}
                label="エンドポイント"
                fullWidth
              />
            )}
          </>
        )}
      </FormDataConsumer>
    </>
  )
}

export default ProposalCloserFormInner
