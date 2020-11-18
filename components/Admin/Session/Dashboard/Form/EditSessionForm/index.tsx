import { FC } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleFormProps,
  required,
  Labeled,
  RadioButtonGroupInput,
  FormDataConsumer,
  FormWithRedirect,
  SaveButton,
  DeleteButton
} from 'react-admin'
import { Grid, Toolbar, Box } from '@material-ui/core'
import isColor from 'is-color'
import SimplePreview from './SimplePreview'
import { ColorInput, ImageInput } from '../../../parts'

const colorValidator = (color: string) => {
  return isColor(color) ? null : '入力内容が間違っています'
}

const EditSessionForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box p={2}>
                <TextInput source="title" resource="sessions" />
                <BooleanInput source="active" resource="sessions" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={2}>
                <ColorInput
                  source="theme.header.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ヘッダー"
                />
                <ColorInput
                  source="theme.agent.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="オペレーターメッセージバルーン"
                />
                <ColorInput
                  source="theme.agent.color"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="オペレーターメッセージ"
                />
                <ColorInput
                  source="theme.user.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ユーザメッセージバルーン"
                />
                <ColorInput
                  source="theme.user.color"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ユーザーメッセージ"
                />
                <ColorInput
                  source="theme.footer.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="フッター"
                />
                <ColorInput
                  source="theme.progressBar.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="プログレスバー"
                />

                <FormDataConsumer>
                  {({ formData }) => (
                    <ImageInput
                      source="images.logo.key"
                      resource="sessions"
                      label="ヘッダーロゴ"
                      sessionId={formData.id}
                    />
                  )}
                </FormDataConsumer>
                <RadioButtonGroupInput
                  source="images.agent"
                  resource="sessions"
                  initialValue="/operator_female1.jpg"
                  label="オペレーターアイコン"
                  row
                  fullWidth
                  choices={[
                    { id: '/operator_female1.jpg', name: '女性1' },
                    { id: '/operator_female2.jpg', name: '女性2' },
                    { id: '/operator_female3.jpg', name: '女性3' },
                    { id: '/operator_male1.jpg', name: '男性1' },
                    { id: '/operator_bot1.jpg', name: 'ボット' }
                  ]}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormDataConsumer>
                {({ formData }) => (
                  <Labeled label="プレビュー">
                    <SimplePreview {...formData} />
                  </Labeled>
                )}
              </FormDataConsumer>
            </Grid>
          </Grid>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <SaveButton
                saving={formProps.saving}
                disabled={formProps.pristine}
                invalid={formProps.invalid}
                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
              />
              <DeleteButton
                record={formProps.record}
                resource="sessions"
                undoable={false}
              />
            </Box>
          </Toolbar>
        </form>
      )}
    />
  )
}

export default EditSessionForm
