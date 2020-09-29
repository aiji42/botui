import { FC, useState } from 'react'
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar,
  Fab
} from '@material-ui/core'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon,
  Add as AddIcon
} from '@material-ui/icons'
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
            <List
              style={{
                position: 'relative',
                overflow: 'auto',
                maxHeight: 600,
                backgroundColor: 'white',
                padding: 0
              }}
            >
              <ListSubheader>タイムライン</ListSubheader>
              {props.record.proposals.map((proposal, index) => (
                <ListItem
                  button
                  onClick={() => {
                    setEditingData({ ...proposal, proposalIndex: index })
                    setEditing(`proposals.${index}`)
                  }}
                >
                  {!proposal.human && (
                    <ListItemAvatar>
                      <Avatar>
                        {proposal.content.type === 'string' ? (
                          <TextsmsIcon />
                        ) : (
                          <RateReviewIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    style={{ textAlign: proposal.human ? 'right' : 'left' }}
                    primary={proposal.human ? 'ユーザ' : 'オペレーター'}
                    secondary={
                      proposal.content.type === 'string'
                        ? proposal.content.props.children
                        : proposal.content.props.type
                    }
                  />
                  {proposal.human && (
                    <ListItemAvatar>
                      <Avatar style={{ margin: '0 0 0 auto' }}>
                        {proposal.content.type === 'string' ? (
                          <TextsmsIcon />
                        ) : (
                          <RateReviewIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                  )}
                </ListItem>
              ))}
              <Fab
                color="primary"
                style={{ position: 'sticky', bottom: 5, left: '100%' }}
              >
                <AddIcon
                  onClick={() => {
                    setEditingData({
                      proposalIndex: props.record.proposals.length
                    })
                    setEditing(`proposals.${props.record.proposals.length}`)
                  }}
                />
              </Fab>
            </List>
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
