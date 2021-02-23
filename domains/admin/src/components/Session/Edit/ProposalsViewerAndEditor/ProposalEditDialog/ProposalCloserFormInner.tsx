import { FC, useEffect } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer
} from 'react-admin'
import { Field, useForm, useFormState } from 'react-final-form'
import JavascriptEditor from './JavascriptEditor'
import { PushForm } from './ProposalRelayerFormInner'

const scriptInitialValue = `// Javascript で記載してください。

// このスクリプト以前にユーザが入力した値は values オブジェクトに格納されています。
// 例えばユーザの姓は values.familyName でアクセスできます。

console.log(values.familyName, values.firstName)

// Promise を return することで、サーバ通信などの非同期処理を同期的に取り扱えます。
/**
const timer = (time) =>
  new Promise((resolve) => setTimeout(resolve, time))

return timer(3000) // 3秒待つ
*/
`

const jobChoices = [
  { id: 'none', name: '何もしない' },
  { id: 'script', name: 'カスタムスクリプト' },
  { id: 'store', name: 'データベースへの保存' },
  { id: 'formPush', name: 'フォーム送信' }
  // { id: 'webhook', name: 'Webhook' }
]

const ProposalCloserFormInner: FC = () => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { job: string; [x: string]: string }
  }>()
  useEffect(() => {
    if (values.data.job === 'script' && !values.data.script)
      change('data.script', scriptInitialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.data.job])
  return (
    <>
      <SelectInput
        source="data.job"
        choices={jobChoices}
        validate={[required()]}
        fullWidth
        label="ジョブ"
      />
      <BooleanInput source="data.notify" label="メールで通知する" />
      <FormDataConsumer>
        {({ formData }) => (
          <>
            {formData.data.job === 'script' && (
              <Field name="data.script" component={JavascriptEditor} />
            )}
            {formData.data.job === 'webhook' && (
              <TextInput
                source="data.endpoint"
                validate={[required()]}
                label="エンドポイント"
                fullWidth
              />
            )}
            {formData.data.job === 'formPush' && <PushForm />}
          </>
        )}
      </FormDataConsumer>
    </>
  )
}

export default ProposalCloserFormInner
