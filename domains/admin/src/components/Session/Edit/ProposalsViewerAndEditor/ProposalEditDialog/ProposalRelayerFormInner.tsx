import { FC, useEffect } from 'react'
import { SelectInput, required, TextInput, ArrayInput, SimpleFormIterator, FormDataConsumer, BooleanInput } from 'react-admin'
import { Field, useForm, useFormState } from 'react-final-form'
import JavascriptEditor from './JavascriptEditor'
import { Typography, makeStyles } from '@material-ui/core'
import { InsertKeyMenu } from './ProposalSkipperFormInner'

const jobChoices = [
  { id: 'script', name: 'カスタムスクリプト' },
  { id: 'formPush', name: 'フォーム送信' }
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

const converterInitialValue = `// JavaScriptで記載してください。
// values にユーザの入力値が格納されています。
// 値は return で返却してください

// 誕生日を連結する例
return values.birthdayYear + '-' + values.birthdayMonth + '-' + values.birthdayDay
`

const conditionOfCompleteInitialValue = `// JavaScriptで記載してください。
// response にフォームの送信結果レスポンスが格納されています。

// フォーム送信フォのページに遷移する例
window.location.href = response.url
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
            {formData.data.job === 'formPush' && <PushForm />}
          </>
        )}
      </FormDataConsumer>
    </>
  )
}

export default ProposalRelayerFormInner

const useStyle = makeStyles((theme) => ({
  foundationForFab: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(1)
  }
}))

export const PushForm: FC = () => {
  const classes = useStyle()
  return (
    <>
      <TextInput
        source="data.formSelector"
        label="フォームのDOMセレクタ"
        placeholder="#form"
        validate={[required()]}
        fullWidth
      />
      <BooleanInput
        source="data.ajax"
        label="非同期通信で送信する"
        defaultValue={true}
        helperText="オフにすると強制的にページ遷移されます。フォームの送信先が外部サイトであるなど、cors通信が許可されていない場合にはオフにしてください。"
      />
      <ArrayInput source="data.dataMapper" label="データマッピング">
        <SimpleFormIterator>
          <TextInput
            source="to"
            label="マッピング先フォーム内のキー"
            validate={[required()]}
            fullWidth
          />
          <BooleanInput
            source="custom"
            label="カスタム値を採用"
            defaultValue={false}
          />
          <FormDataConsumer>
            {({ getSource, scopedFormData }) =>
              !scopedFormData?.custom ? (
                <div className={classes.foundationForFab}>
                  <TextInput
                    source={getSource?.('from') ?? ''}
                    label="マッピング元のデータキー"
                    fullWidth
                    validate={[required()]}
                  />
                  <InsertKeyMenu
                    source={getSource?.('from') ?? ''}
                    className={classes.fab}
                  />
                </div>
              ) : (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    カスタム値
                  </Typography>
                  <Field
                    name={getSource?.('customValueScript') ?? ''}
                    component={JavascriptEditor}
                    defaultValue={converterInitialValue}
                    maxLines={10}
                    minLines={5}
                  />
                </>
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
      <FormDataConsumer>
        {({ formData }) =>
          formData?.data?.ajax && (
            <>
              <Typography variant="subtitle2" color="textSecondary">
                フォーム送信後スクリプト
              </Typography>
              <Field
                name="data.onSubmit"
                component={JavascriptEditor}
                defaultValue={conditionOfCompleteInitialValue}
                minLines={10}
              />
            </>
          )
        }
      </FormDataConsumer>
    </>
  )
}