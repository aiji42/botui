import { FC, useEffect, useRef, useState, MouseEvent, RefObject } from 'react'
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
import { FormCustomCheckbox, FormCustomRadioGroup, FormCustomSelect, Session } from '@botui/types'
import { ImageInput, DelayNumberSlider } from '../../../parts'
import { useForm, useFormState, Field } from 'react-final-form'
import {
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Fab,
  FabProps,
  makeStyles,
  Typography
} from '@material-ui/core'
import { HelpOutline, Add } from '@material-ui/icons'
import JavascriptEditor from './JavascriptEditor'

const formTypeChoices = [
  { id: 'FormName', name: '氏名' },
  { id: 'FormAddress', name: '住所' },
  { id: 'FormBirthDay', name: '生年月日' },
  // { id: 'FormConfirm', name: '確認' },
  // { id: 'FormCreditCard', name: 'クレジットカード' },
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

const customValidatorInitial = `// JavaScript で記載してください。
// value に入力値が入っています。
// return で、1文字以上の文字列を返却するとエラーメッセージとしてフォーム下部に表示されます。
// 文字列以外を返却すると、ユーザが確定ボタンを押下できるようになります。
`

const useStyle = makeStyles((theme) => ({
  foundationForFab: {
    position: 'relative'
  },
  fab: {
    position: 'absolute', bottom: theme.spacing(4), right: theme.spacing(1)
  }
}))

const ProposalMessageFormInner: FC = () => {
  const {
    record: { id: sessionId }
  } = useRecordContext({ record: {} as Session })
  const ref = useRef<HTMLInputElement>(null)
  const classes = useStyle()
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
      <FormDataConsumer>
        {({ formData }) => (
          <>
            {formData.data?.content?.type === 'string' && (
              <>
                <div className={classes.foundationForFab}>
                  <TextInput
                    source="data.content.props.children"
                    label="メッセージ本文"
                    validate={[required()]}
                    fullWidth
                    multiline
                    rows={5}
                    inputRef={ref}
                  />
                  <InsertKeyMenu targetInput={ref} className={classes.fab} />
                </div>
              </>
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
                label="フォームタイプ"
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

const makeInsertKey = (ref: RefObject<HTMLInputElement>) => (
  key: string
) => {
  if (document.activeElement !== ref.current) ref.current?.focus()
  document.execCommand('insertText', false, `{{${key}}}`)
}

interface InsertKeyMenuProps extends Partial<FabProps> {
  targetInput: RefObject<HTMLInputElement>
}

const InsertKeyMenu: FC<InsertKeyMenuProps> = ({ targetInput, ...res }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickMenu = (
    e: MouseEvent<HTMLLIElement>
  ) => {
    const insertKey = makeInsertKey(targetInput)
    insertKey(e.currentTarget.dataset.value ?? '')
    handleClose()
  }
  return (
    <>
      <Fab
        {...res}
        color="primary"
        onClick={handleClick}
        size="small"
        variant="extended"
      >
        <>
          <Add />
          ユーザ入力値の挿入
        </>
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClickMenu} data-value="familyName">氏名:姓</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstName">氏名:名</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="familyNameKana">
          氏名:姓(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstNameKana">
          氏名:名(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="postalCode">
          住所:郵便番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="prefecture">
          住所:都道府県
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="city">住所:市区町村</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="street">住所:番地</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="building">
          住所:建物名・部屋番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="tel">電話番号</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="email">メールアドレス</MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayYear">
          生年月日:年
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayMonth">
          生年月日:月
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayDay">
          生年月日:日
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="ここを値名に置換">
          カスタム
        </MenuItem>
      </Menu>
    </>
  )
}

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
      label="値をゼロ詰めする"
      validate={[required()]}
    />
  )
}

const FormCustomRadioGroupOption: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { content: { props: FormCustomRadioGroup } }
  }>()
  useEffect(() => {
    if (!values.data.content.props.inputs)
      change('data.content.props.inputs', [])
  }, [values.data.content.props.inputs, change])
  return (
    <>
      <Badge
        badgeContent={
          <Tooltip title="カスタムスクリプトで動的な選択肢の挿入が可能です。こちらで指定した'name'と同じ値のものが適応されます。">
            <HelpOutline />
          </Tooltip>
        }
      >
        <TextInput
          {...props}
          source="data.content.props.name"
          label="値名"
          validate={[required()]}
        />
      </Badge>
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="ラジオボタン"
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

const FormCustomCheckboxOption: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { content: { props: FormCustomCheckbox } }
  }>()
  useEffect(() => {
    if (!values.data.content.props.inputs)
      change('data.content.props.inputs', [])
  }, [values.data.content.props.inputs, change])
  return (
    <>
      <Badge
        badgeContent={
          <Tooltip title="カスタムスクリプトで動的な選択肢の挿入が可能です。こちらで指定した'name'と同じ値のものが適応されます。">
            <HelpOutline />
          </Tooltip>
        }
      >
        <TextInput
          {...props}
          source="data.content.props.name"
          label="値名"
          validate={[required()]}
        />
      </Badge>
      <BooleanInput source="data.content.props.required" label="入力を必須にする" />
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="チェックボックス"
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

const FormCustomSelectOption: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{ data: { content: { props: FormCustomSelect } } }>()
  useEffect(() => {
    if (!values.data.content.props.selects) return
    values.data.content.props.selects.forEach((select, index) => {
      if (select && !select.options)
        change(`data.content.props.selects.${index}.options`, [])
    })
  }, [values.data.content.props.selects, change])
  return (
    <ArrayInput
      {...props}
      source="data.content.props.selects"
      label="セレクトボックス"
      validate={[required()]}
    >
      <SimpleFormIterator>
        <TextInput source="name" label="値名" validate={[required()]} />
        <TextInput source="title" label="タイトル" />
        <ArrayInput source="options" label="選択肢">
          <SimpleFormIterator>
            <TextInput source="label" label="ラベル" />
            <TextInput source="value" label="値" validate={[required()]} />
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
        <TextInput source="name" label="値名" validate={[required()]} />
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
          label="入力タイプ"
        />
        <TextInput source="title" label="タイトル" />
        <TextInput source="placeholder" label="プレースホルダー" />
        <BooleanInput source="required" label="入力を必須にする" />
        <FormDataConsumer>
          {({ getSource }) => (
            <>
              <Typography variant="subtitle2" color="textSecondary">
                カスタムバリデーション
              </Typography>
              <Field
                label="カスタムバリデーション"
                name={getSource?.('validation') ?? ''}
                initialValue={customValidatorInitial}
                component={JavascriptEditor}
              />
            </>
          )}
        </FormDataConsumer>
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
        label="値名"
        validate={[required()]}
      />
      <TextInput
        {...props}
        source="data.content.props.title"
        label="タイトル"
      />
      <TextInput
        {...props}
        source="data.content.props.placeholder"
        label="プレースホルダー"
      />
      <BooleanInput
        {...props}
        source="data.content.props.required"
        label="入力を必須にする"
      />
      <Typography variant="subtitle2" color="textSecondary">
        カスタムバリデーション
      </Typography>
      <Field
        name="data.content.props.validation"
        component={JavascriptEditor}
        initialValue={customValidatorInitial}
      />
    </>
  )
}
