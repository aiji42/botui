import { FC } from 'react'
import {
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  BooleanInput,
  NumberInput,
  TextInput,
  FormDataConsumer
} from 'react-admin'

const ProposalEditor: FC = (props) => {
  return (
    <ArrayInput source="proposals">
      <SimpleFormIterator>
        <BooleanInput source="human" label="ユーザ側" />
        <SelectInput
          source="content.type"
          label="メッセージタイプ"
          choices={[
            { id: 'string', name: 'テキスト' },
            { id: 'form', name: 'フォーム' }
          ]}
        />
        <NumberInput
          source="content.delay"
          initialValue={500}
          label="ローディング時間(ms)"
        />
        <FormDataConsumer>
          {({ scopedFormData, getSource }: any) =>
            scopedFormData.content?.type === 'string' ? (
              <StringTypeEditor sourcePrefix={getSource('')} />
            ) : (
              <FormTypeEditor sourcePrefix={getSource('')} />
            )
          }
        </FormDataConsumer>
        <TextInput source="before" label="before function" />
        <TextInput source="after" label="after function" />
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const StringTypeEditor: FC<{ sourcePrefix: string }> = ({
  sourcePrefix,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      source={`${sourcePrefix}props.children`}
      label="メッセージ本文"
    />
  )
}

const FormTypeEditor: FC<{ sourcePrefix: string }> = ({
  sourcePrefix,
  ...props
}) => {
  return (
    <>
      <SelectInput
        {...props}
        source={`${sourcePrefix}props.type`}
        label="フォームタイプ"
        choices={[
          { id: 'FormName', name: '氏名' },
          { id: 'FormAddress', name: '住所' },
          { id: 'FormBirthDay', name: '生年月日' },
          { id: 'FormConfirm', name: '確認' },
          { id: 'FormCreditCard', name: 'クレジットカード' },
          { id: 'FormCustomInput', name: 'カスタムインプット' },
          { id: 'FormCustomSelect', name: 'カスタムセレクト' },
          { id: 'FormCustomRadioGroup', name: 'カスタムラジオボタン' },
          { id: 'FormCustomTextarea', name: 'カスタムテキストエリア' },
          { id: 'FormEmail', name: 'メールアドレス' },
          { id: 'FormTel', name: '電話番号' }
        ]}
      />
    </>
  )
}

export default ProposalEditor
