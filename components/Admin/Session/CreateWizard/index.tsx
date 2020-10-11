import { FC, useState } from 'react'
import {
  TextInput,
  FormWithRedirect,
  SimpleFormProps,
  Toolbar,
  SaveButton,
  required
} from 'react-admin'
import {Field, useForm} from 'react-final-form'

import {
  Card,
  Paper,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
  Grid,
  Typography,
  IconButton
} from '@material-ui/core'

import { RadioButtonUnchecked, CheckCircle } from '@material-ui/icons'

const toolbarProps = (formProps: any) => {
  const {
    basePath,
    handleSubmitWithRedirect,
    handleSubmit,
    invalid,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable
  } = formProps
  return {
    basePath,
    handleSubmitWithRedirect,
    handleSubmit,
    invalid,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable
  }
}

type TemplateTypes = 'ec' | 'inquiry' | 'manual'

const templateValidator = (value?: TemplateTypes) => {
  if (['ec', 'inquiry', 'manual'].includes(value)) return null
  return '必須'
}

const CreateWizard: FC<SimpleFormProps> = (props) => {
  const [templateType, setTemplateType] = useState<null | TemplateTypes>(null)
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <form>
          <Grid container component={Paper} spacing={4}>
            <Grid item xs={5}>
              <TextInput source="title" fullWidth validate={[required()]} />
              <Field
                name="template"
                component="input"
                type="hidden"
                validate={templateValidator}
              />
            </Grid>
            <Grid item xs={7} />
            <Grid item xs={4}>
              <Card>
                <CardActionArea onClick={() => setTemplateType('ec')}>
                  <CardHeader
                    title="ECサイト用"
                    action={
                      <IconButton color="primary">
                        {templateType === 'ec' ? (
                          <CheckCircle fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked fontSize="large" />
                        )}
                      </IconButton>
                    }
                  />
                  <CardMedia
                    component="img"
                    src="/mobile-online-shopping.jpg"
                    height={250}
                  />
                  <CardContent>
                    <Typography paragraph variant="body1">
                      名前や住所等の個人情報及び、支払い・配送情報等を獲得するためのテンプレートです。
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      通販サイトでの導入に最適です。
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardActionArea onClick={() => setTemplateType('inquiry')}>
                  <CardHeader
                    title="お問い合わせフォーム用"
                    action={
                      <IconButton color="primary">
                        {templateType === 'inquiry' ? (
                          <CheckCircle fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked fontSize="large" />
                        )}
                      </IconButton>
                    }
                  />
                  <CardMedia
                    component="img"
                    src="/mobile-testing-concept.jpg"
                    height={250}
                  />
                  <CardContent>
                    <Typography paragraph variant="body1">
                      名前や住所等の個人情報及び、アンケート式の選択フォームや自由入力のテキストエリアを備えたテンプレートです。
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      お問い合わせフォームやお申込みフォームなどに最適です。
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardActionArea onClick={() => setTemplateType('manual')}>
                  <CardHeader
                    title="マニュアル"
                    action={
                      <IconButton color="primary">
                        {templateType === 'manual' ? (
                          <CheckCircle fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked fontSize="large" />
                        )}
                      </IconButton>
                    }
                  />
                  <CardMedia
                    component="img"
                    src="/business-people-launches-rocket.jpg"
                    height={250}
                  />
                  <CardContent>
                    <Typography paragraph variant="body1">
                      テンプレートを使用せず、いちから自由に作成できます。
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Toolbar {...toolbarProps(formProps)}>
                <SaveButton label="Save" submitOnEnter={false} />
              </Toolbar>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}

export default CreateWizard
