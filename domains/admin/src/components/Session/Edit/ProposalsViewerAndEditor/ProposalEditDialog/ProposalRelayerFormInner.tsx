import { FC, useEffect } from 'react'
import { SelectInput, required, TextInput, FormDataConsumer } from 'react-admin'
import { Field, useForm, useFormState } from 'react-final-form'
import JavascriptEditor from './JavascriptEditor'

const jobChoices = [
  { id: 'script', name: 'カスタムスクリプト' }
  // { id: 'webhook', name: 'Webhook' }
]

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

// カスタムチェックボックス・カスタムラジオボタン・カスタムセレクトの選択肢を
// 動的に選択することが可能です。
// 例えば、本日から1ヶ月後までの日付のリストや、
// ユーザが選択した商品で取り扱える支払い方法の選択肢を動的に作り出すなどが可能です。
// 次のように対象フォームで設定した'name' と一致するように配列をセットしてください。
/**
window.botui.customChoice['フォームのname'] = [
  { label: '選択肢1', value: '1' },
  { label: '選択肢2', value: '2' },
  { label: '選択肢3', value: '3' },
]
*/

// 動的なメッセージを作り出すことも可能です。
// メッセージに {{特定のキー}} を設定し、対応した値で文字列を挿入すると自動的に置換されます。
/**
window.botui.customMessage['特定のキー'] = '置換したいメッセージ'
*/
`

const ProposalRelayerFormInner: FC = () => {
  const { change } = useForm()
  const { values } = useFormState<{ data: { job: string; [x: string]: string } }>()
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
      <FormDataConsumer>
        {({ formData }) => (
          <>
            {formData.data.job === 'script' && (
              <Field
                name="data.script"
                component={JavascriptEditor}
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
