import { FC } from 'react'
import { SelectInput, required, TextInput, FormDataConsumer } from 'react-admin'

const jobChoices = [
  { id: 'script', name: 'カスタムスクリプト' }
  // { id: 'webhook', name: 'Webhook' }
]

const ProposalRelayerFormInner: FC = () => {
  return (
    <>
      <SelectInput
        source="data.job"
        choices={jobChoices}
        validate={[required()]}
        fullWidth
        label="ジョブ"
      />
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

export default ProposalRelayerFormInner
