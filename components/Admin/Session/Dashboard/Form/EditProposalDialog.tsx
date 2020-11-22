import { FC, useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import {
  useRecordContext,
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin'
import {
  Form,
  useForm,
  FormRenderProps,
  useFormState,
  FormProps
} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Proposal, Proposals, Session } from '../../../../../@types/session'
import { ImageInput } from '../../parts'
import DelayNumberSlider from './EditProposalForm/DelayNumberSlider'

interface Props {
  proposal: Proposal
  open: boolean
  handleClose: () => void
  handleSave: (proposal: Proposal) => void
}

const EditProposalDialog: FC<Props> = (props) => {
  const [trySubmit, setTrySubmit] = useState<boolean>(false)
  const handleClickSave = useCallback(() => setTrySubmit(true), [setTrySubmit])

  return (
    <Dialog open={props.open}>
      <DialogContent>
        <FormWrapper
          initialValues={props.proposal}
          onSubmit={props.handleSave}
          trySubmit={trySubmit}
          handleTrySubmit={setTrySubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>cancel</Button>
        <Button onClick={handleClickSave}>save</Button>
      </DialogActions>
    </Dialog>
  )
}

interface FormFunctions {
  trySubmit: boolean
  handleTrySubmit: (flag: boolean) => void
}

const FormWrapper: FC<FormProps<any, Partial<any>> & FormFunctions> = (
  props
) => {
  const { trySubmit, handleTrySubmit, ...rest } = props
  return (
    <Form
      mutators={{ ...arrayMutators }}
      subscription={{
        submitting: true,
        pristine: true,
        valid: true,
        invalid: true
      }}
      {...rest}
      render={(formProps) => (
        <FormInner
          {...formProps}
          trySubmit={trySubmit}
          handleTrySubmit={handleTrySubmit}
        />
      )}
    />
  )
}

const FormInner: FC<FormRenderProps<any, Partial<any>> & FormFunctions> = (
  props
) => {
  const { submit } = useForm()
  useEffect(() => {
    if (!props.trySubmit) return
    submit()
    props.handleTrySubmit(false)
  }, [props.trySubmit])
  return (
    <>
      <BooleanInput source="human" label="ユーザ側" />
      <SelectInput
        source="content.type"
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
        source="content.delay"
        fullWidth
      />
      <TextInput source="before" label="before function" fullWidth multiline />
      <TextInput source="after" label="after function" fullWidth multiline />
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'string' && (
            <TextInput
              source="content.props.children"
              label="メッセージ本文"
              validate={[required()]}
              fullWidth
              multiline
              rows={3}
            />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'image' && (
            <ImageInput
              source="content.props.imgKey"
              label="画像"
              sessionId={'aaaaaaaaaaaaaa'} // TODO
            />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData.content?.type === 'form' && (
            <SelectInput
              fullWidth
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
          formData.content?.props?.type === 'FormCustomCheckbox' && (
            <FormCustomCheckboxOption />
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
    </>
  )
}

export default EditProposalDialog

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

const FormCustomCheckboxOption: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="content.props.name"
        label="name"
        validate={[required()]}
      />
      <BooleanInput source="content.props.required" label="required" />
      <ArrayInput
        {...props}
        source="content.props.inputs"
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
