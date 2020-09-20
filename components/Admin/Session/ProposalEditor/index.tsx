import { FC, useState } from 'react'
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
import { withStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const ProposalEditor: FC = () => {
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
              <StringTypeEditor sourcePrefix={getSource('content')} />
            ) : (
              <FormTypeEditor sourcePrefix={getSource('content')} />
            )
          }
        </FormDataConsumer>
        <TextInput source="before" label="before function" />
        <TextInput source="after" label="after function" />
        <FormDataConsumer>
          {({ scopedFormData, getSource }: any) => {
            getSource('')
            return <Preview message={scopedFormData} />
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

const FormTypeEditor: FC<{ sourcePrefix: string }> = ({
  sourcePrefix,
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
    </>
  )
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    width: 720,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9'
  }
}))(Tooltip)

const Preview: FC<{ message: MessageType }> = ({ message }) => {
  const [open, setOpen] = useState(false)
  const handleClickPreview = () => setOpen(!open)
  const noOp = () => {
    // do nothing.
  }

  return (
    <HtmlTooltip
      open={open}
      title={
        <MessageContext message={message} handleUpdate={noOp}>
          <Message preview />
        </MessageContext>
      }
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
      <Button onClick={handleClickPreview}>Preview</Button>
    </HtmlTooltip>
  )
}

export default ProposalEditor
