import { FC, useState } from 'react'
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core'
import {
  TextField,
  BooleanField,
  SimpleShowLayout,
  TextInput,
  BooleanInput,
  SimpleForm,
  NumberInput,
  SelectInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin'
import { Message } from '@botui/types'

const Dashboard: FC<{ record: { proposals: Array<Message> } }> = (props) => {
  const [editing, setEditing] = useState('main')
  const [editingData, setEditingData] = useState({})

  return (
    <Grid container spacing={2} style={{ padding: 5 }}>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <SimpleShowLayout {...props}>
                  <TextField source="title" />
                  <BooleanField source="active" />
                </SimpleShowLayout>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Preview
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditingData({})
                    setEditing('main')
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              justify="center"
              style={{ maxHeight: 800, overflow: 'scroll' }}
            >
              {props.record.proposals.map((proposal, index) => (
                <Grid key={index} item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">サイド</Typography>
                          <Typography>
                            {proposal.human ? 'ユーザ' : 'オペレーター'}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography color="textSecondary">内容</Typography>
                          <Typography>
                            {proposal.content.type === 'string'
                              ? proposal.content.props.children
                              : proposal.content.props.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Preview
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditingData(proposal)
                          setEditing(`proposals.${index}`)
                        }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ minHeight: 500 }}>
          <>
            {editing === 'main' && (
              <SimpleForm {...props}>
                <TextInput source="title" />
                <BooleanInput source="active" />
              </SimpleForm>
            )}
            {/proposals/.test(editing) && (
              <SimpleForm {...props} record={editingData}>
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
                  {({ formData, ...rest }: any) =>
                    formData.content?.type === 'string' && (
                      <TextInput
                        {...rest}
                        source="content.props.children"
                        label="メッセージ本文"
                      />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.type === 'form' && (
                      <SelectInput
                        {...rest}
                        source="content.props.type"
                        label="form type"
                        choices={[
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
                        ]}
                      />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type === 'FormName' && (
                      <FormNameState {...rest} />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type === 'FormBirthDay' && (
                      <FormBirthDayState {...rest} />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type ===
                      'FormCustomRadioGroup' && (
                      <FormCustomRadioGroupOption {...rest} />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type === 'FormCustomSelect' && (
                      <FormCustomSelectOption {...rest} />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type === 'FormCustomInput' && (
                      <FormCustomInputOption {...rest} />
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }: any) =>
                    formData.content?.props?.type === 'FormCustomTextarea' && (
                      <FormCustomTextareaOption {...rest} />
                    )
                  }
                </FormDataConsumer>
              </SimpleForm>
            )}
          </>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard

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
