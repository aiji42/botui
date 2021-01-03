import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator,
  useRecordContext
} from 'react-admin'
import { Session } from '../../../../../../@types/session'
import { ImageInput, DelayNumberSlider } from '../../../parts'

const formTypeChoices = [
  { id: 'FormName', name: '氏名' },
  { id: 'FormAddress', name: '住所' },
  { id: 'FormBirthDay', name: '生年月日' },
  { id: 'FormConfirm', name: '確認' },
  { id: 'FormCreditCard', name: 'クレジットカード' },
  { id: 'FormCustomInput', name: 'カスタムインプット' },
  { id: 'FormCustomSelect', name: 'カスタムセレクト' },
  {
    id: 'FormCustomRadioGroup',
    name: 'カスタムラジオボタン'
  },
  {
    id: 'FormCustomCheckbox',
    name: 'カスタムチェックボックス'
  },
  {
    id: 'FormCustomTextarea',
    name: 'カスタムテキストエリア'
  },
  { id: 'FormEmail', name: 'メールアドレス' },
  { id: 'FormTel', name: '電話番号' }
]

const ProposalMessageFormInner: FC = () => {
  const {
    record: { id: sessionId }
  } = useRecordContext({ record: {} as Session })
  return (
    <>
      <BooleanInput source="data.human" label="ユーザ側" />
      <SelectInput
        source="data.content.type"
        label="メッセージタイプ"
        validate={[required()]}
        choices={[
          { id: 'string', name: 'テキスト' },
          { id: 'image', name: '画像' },
          { id: 'form', name: 'フォーム' }
        ]}
        fullWidth
      />
      <DelayNumberSlider
        label="ローディング時間"
        source="data.content.delay"
        fullWidth
      />
      <TextInput source="before" label="before function" fullWidth multiline />
      <TextInput source="after" label="after function" fullWidth multiline />
      <FormDataConsumer>
        {({ formData }) => (
          <>
            {formData.data?.content?.type === 'string' && (
              <TextInput
                source="data.content.props.children"
                label="メッセージ本文"
                validate={[required()]}
                fullWidth
                multiline
                rows={3}
              />
            )}
            {formData.data?.content?.type === 'image' && (
              <ImageInput
                source="data.content.props.imgKey"
                label="画像"
                sessionId={sessionId}
                required
              />
            )}
            {formData.data?.content?.type === 'form' && (
              <SelectInput
                fullWidth
                source="data.content.props.type"
                label="form type"
                choices={formTypeChoices}
                validate={[required()]}
              />
            )}
          </>
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) => {
          if (formData.data?.content?.type !== 'form') return <></>
          return (
            <>
              {formData.data?.content?.props?.type === 'FormName' && (
                <FormNameState />
              )}
              {formData.data?.content?.props?.type === 'FormBirthDay' && (
                <FormBirthDayState />
              )}
              {formData.data?.content?.props?.type ===
                'FormCustomRadioGroup' && <FormCustomRadioGroupOption />}
              {formData.data?.content?.props?.type === 'FormCustomCheckbox' && (
                <FormCustomCheckboxOption />
              )}
              {formData.data?.content?.props?.type === 'FormCustomSelect' && (
                <FormCustomSelectOption />
              )}
              {formData.data?.content?.props?.type === 'FormCustomInput' && (
                <FormCustomInputOption />
              )}
              {formData.data?.content?.props?.type === 'FormCustomTextarea' && (
                <FormCustomTextareaOption />
              )}
            </>
          )
        }}
      </FormDataConsumer>
    </>
  )
}

export default ProposalMessageFormInner

const FormNameState: FC = (props) => {
  return (
    <>
      <BooleanInput
        {...props}
        source="data.content.props.status.kana"
        initialValue={true}
        label="ふりがな"
      />
      <SelectInput
        {...props}
        source="data.content.props.status.kanaType"
        label="ふりがな補正"
        initialValue="katakana"
        choices={[
          { id: 'katakana', name: 'カタカナ' },
          { id: 'hiragana', name: 'ひらがな' }
        ]}
      />
    </>
  )
}

const FormBirthDayState: FC = (props) => {
  return (
    <BooleanInput
      {...props}
      source="data.content.props.status.paddingZero"
      initialValue={false}
      label="zero padding"
      validate={[required()]}
    />
  )
}

const FormCustomRadioGroupOption: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="data.content.props.name"
        label="name"
        validate={[required()]}
      />
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="radio buttons"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="title" label="title" validate={[required()]} />
          <TextInput source="value" label="value" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

const FormCustomCheckboxOption: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="data.content.props.name"
        label="name"
        validate={[required()]}
      />
      <BooleanInput source="data.content.props.required" label="required" />
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="checkboxes"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="title" label="title" validate={[required()]} />
          <TextInput source="value" label="value" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

const FormCustomSelectOption: FC = (props) => {
  return (
    <ArrayInput
      {...props}
      source="data.content.props.selects"
      label="select box"
      validate={[required()]}
    >
      <SimpleFormIterator>
        <TextInput source="name" label="name" validate={[required()]} />
        <TextInput source="title" label="title" />
        <ArrayInput source="options" label="options" validate={[required()]}>
          <SimpleFormIterator>
            <TextInput source="label" label="label" />
            <TextInput source="value" label="value" validate={[required()]} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const FormCustomInputOption: FC = (props) => {
  return (
    <ArrayInput
      {...props}
      source="data.content.props.inputs"
      label="input"
      validate={[required()]}
    >
      <SimpleFormIterator>
        <TextInput source="name" label="name" validate={[required()]} />
        <SelectInput
          source="type"
          validate={[required()]}
          choices={[
            { id: 'text', name: 'text' },
            { id: 'number', name: 'number' },
            { id: 'tel', name: 'tel' },
            { id: 'email', name: 'email' },
            { id: 'password', name: 'password' }
          ]}
          label="type"
        />
        <TextInput source="title" label="title" />
        <TextInput source="placeholder" label="placeholder" />
        <BooleanInput source="required" label="required" />
        <TextInput source="validation" multiline label="validation" />
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const FormCustomTextareaOption: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="data.content.props.name"
        label="name"
        validate={[required()]}
      />
      <TextInput {...props} source="data.content.props.title" label="title" />
      <TextInput
        {...props}
        source="data.content.props.placeholder"
        label="placeholder"
      />
      <BooleanInput
        {...props}
        source="data.content.props.required"
        label="required"
      />
      <TextInput
        {...props}
        source="data.content.props.validation"
        multiline
        label="validation"
      />
    </>
  )
}
