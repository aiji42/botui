import { FC } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  NumberInput,
  SelectInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator,
  SimpleFormProps
} from 'react-admin'

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
    id: 'FormCustomTextarea',
    name: 'カスタムテキストエリア'
  },
  { id: 'FormEmail', name: 'メールアドレス' },
  { id: 'FormTel', name: '電話番号' }
]

const EditProposalForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props}>
      <NumberInput source="proposalIndex" disabled />
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
      <TextInput source="before" label="before function" />
      <TextInput source="after" label="after function" />
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'string' && (
            <TextInput source="content.props.children" label="メッセージ本文" />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'form' && (
            <SelectInput
              source="content.props.type"
              label="form type"
              choices={formTypeChoices}
            />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormName' && <FormNameState />
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormBirthDay' && (
            <FormBirthDayState />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormCustomRadioGroup' && (
            <FormCustomRadioGroupOption />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormCustomSelect' && (
            <FormCustomSelectOption />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormCustomInput' && (
            <FormCustomInputOption />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.props?.type === 'FormCustomTextarea' && (
            <FormCustomTextareaOption />
          )
        }
      </FormDataConsumer>
    </SimpleForm>
  )
}

export default EditProposalForm

const FormNameState: FC = (props) => {
  return (
    <>
      <BooleanInput
        {...props}
        source="content.props.status.kana"
        initialValue={true}
        label="ふりがな"
      />
      <SelectInput
        source="content.props.status.kanaType"
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
      source="content.props.status.paddingZero"
      initialValue={false}
      label="zero padding"
    />
  )
}

const FormCustomRadioGroupOption: FC = (props) => {
  return (
    <>
      <TextInput {...props} source="content.props.name" label="name" />
      <ArrayInput
        {...props}
        source="content.props.inputs"
        label="radio buttons"
      >
        <SimpleFormIterator>
          <TextInput source="title" label="title" />
          <TextInput source="value" label="value" />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

const FormCustomSelectOption: FC = (props) => {
  return (
    <ArrayInput {...props} source="content.props.selects" label="selectbox">
      <SimpleFormIterator>
        <TextInput source="name" label="name" />
        <TextInput source="title" label="title" />
        <ArrayInput source="options" label="options">
          <SimpleFormIterator>
            <TextInput source="label" label="label" />
            <TextInput source="value" label="value" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const FormCustomInputOption: FC = (props) => {
  return (
    <ArrayInput {...props} source="content.props.inputs" label="input">
      <SimpleFormIterator>
        <TextInput source="name" label="name" />
        <SelectInput
          source="type"
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
      <TextInput {...props} source="content.props.name" label="name" />
      <TextInput {...props} source="content.props.title" label="title" />
      <TextInput
        {...props}
        source="content.props.placeholder"
        label="placeholder"
      />
      <BooleanInput
        {...props}
        source="content.props.required"
        label="required"
      />
      <TextInput
        {...props}
        source="content.props.validation"
        multiline
        label="validation"
      />
    </>
  )
}
