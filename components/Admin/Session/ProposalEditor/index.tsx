import { FC, useState, memo } from 'react'
import {
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  BooleanInput,
  NumberInput,
  TextInput,
  FormDataConsumer
} from 'react-admin'
import MessageContext from '../../../../hooks/use-message-context'
import Message from '../../../Chat/Message'
import { Message as MessageType } from '@botui/types'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

const ProposalEditor: FC = () => {
  const PreviewMemo = memo<{ message: MessageType }>(({ message }) => (
    <Preview message={message} />
  ))
  const EditorMemo = memo<{ scopedFormData: any; sourcePrefix: string }>(
    ({ scopedFormData, sourcePrefix }) => {
      if (!scopedFormData) return <></>
      return scopedFormData.content?.type === 'string' ? (
        <StringTypeEditor sourcePrefix={sourcePrefix} />
      ) : (
        <FormTypeEditor
          sourcePrefix={sourcePrefix}
          scopedFormData={scopedFormData}
        />
      )
    }
  )

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
          {({ scopedFormData, getSource }: any) => (
            <EditorMemo
              sourcePrefix={getSource('content')}
              scopedFormData={scopedFormData}
            />
          )}
        </FormDataConsumer>
        <TextInput source="before" label="before function" />
        <TextInput source="after" label="after function" />
        <FormDataConsumer>
          {({ scopedFormData, getSource }: any) => {
            getSource('')
            return <PreviewMemo message={scopedFormData} />
          }}
        </FormDataConsumer>
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
      source={`${sourcePrefix}.props.children`}
      label="メッセージ本文"
    />
  )
}

const FormTypeEditor: FC<{ sourcePrefix: string; scopedFormData: any }> = ({
  sourcePrefix,
  scopedFormData,
  ...props
}) => {
  return (
    <>
      <SelectInput
        {...props}
        source={`${sourcePrefix}.props.type`}
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
      {scopedFormData.content?.props?.type === 'FormName' && (
        <FormNameState sourcePrefix={`${sourcePrefix}.props.status`} />
      )}
      {scopedFormData.content?.props?.type === 'FormBirthDay' && (
        <FormBirthDayState sourcePrefix={`${sourcePrefix}.props.status`} />
      )}
    </>
  )
}

const FormNameState: FC<{ sourcePrefix: string }> = ({ sourcePrefix }) => {
  return (
    <>
      <BooleanInput
        source={`${sourcePrefix}.kana`}
        initialValue={true}
        label="ふりがな"
      />
      <SelectInput
        source={`${sourcePrefix}.kanaType`}
        label="ふりがなのタイプ"
        initialValue="katakana"
        choices={[
          { id: 'katakana', name: 'カタカナ' },
          { id: 'hiragana', name: 'ひらがな' }
        ]}
      />
    </>
  )
}

const FormBirthDayState: FC<{ sourcePrefix: string }> = ({ sourcePrefix }) => {
  return (
    <BooleanInput
      source={`${sourcePrefix}.paddingZero`}
      initialValue={false}
      label="数値のゼロ詰め"
    />
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
)

const Preview: FC<{ message: MessageType }> = ({ message }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickPreview = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const noOp = () => {
    // do nothing.
  }

  return (
    <>
      <Button onClick={handleClickPreview}>Preview</Button>
      <Modal open={open} onClose={handleClose}>
        {!open ? (
          <></>
        ) : (
          <div
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            className={classes.paper}
          >
            <MessageContext message={message} handleUpdate={noOp}>
              <Message preview />
            </MessageContext>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ProposalEditor
