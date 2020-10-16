import { ChangeEvent, FC, useCallback } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  NumberInput,
  SelectInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator,
  SimpleFormProps,
  required,
  Labeled
} from 'react-admin'
import { Slider } from '@material-ui/core'
import { useForm, useField } from 'react-final-form'

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

const marks = [
  {
    value: 0,
    label: '0s'
  },
  {
    value: 1000,
    label: '1s'
  },
  {
    value: 2000,
    label: '2s'
  },
  {
    value: 3000,
    label: '3s'
  }
]

const NumberSlider: FC = () => {
  const { change } = useForm()
  const {
    input: { value }
  } = useField<number>('content.delay')
  const handleChange = useCallback(
    (_, val: number | number[]) => {
      change('content.delay', val)
    },
    [change]
  )

  return (
    <Labeled label="ローディング時間" fullWidth>
      <span>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => <>{val / 1000}s</>}
          step={100}
          marks={marks}
          min={0}
          max={3000}
          value={value}
          onChange={handleChange}
        />
      </span>
    </Labeled>
  )
}

const EditProposalForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props} destroyOnUnregister>
      <NumberInput source="proposalIndex" disabled />
      <BooleanInput source="human" label="ユーザ側" />
      <SelectInput
        source="content.type"
        label="メッセージタイプ"
        validate={[required()]}
        choices={[
          { id: 'string', name: 'テキスト' },
          { id: 'form', name: 'フォーム' }
        ]}
        fullWidth
      />
      <NumberSlider />
      <TextInput source="before" label="before function" fullWidth />
      <TextInput source="after" label="after function" fullWidth />
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'string' && (
            <TextInput
              source="content.props.children"
              label="メッセージ本文"
              validate={[required()]}
              fullWidth
            />
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
              validate={[required()]}
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
        {...props}
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
      validate={[required()]}
    />
  )
}

const FormCustomRadioGroupOption: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="content.props.name"
        label="name"
        validate={[required()]}
      />
      <ArrayInput
        {...props}
        source="content.props.inputs"
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

const FormCustomSelectOption: FC = (props) => {
  return (
    <ArrayInput
      {...props}
      source="content.props.selects"
      label="selectbox"
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
      source="content.props.inputs"
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
        source="content.props.name"
        label="name"
        validate={[required()]}
      />
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
