import { FC, useCallback, useState, MouseEvent } from 'react'
import {
  TextInput,
  FormWithRedirect,
  SimpleFormProps,
  Toolbar,
  SaveButton,
  required,
  SimpleFormViewProps
} from 'react-admin'
import { Field, useForm, useField } from 'react-final-form'

import {
  Card,
  Paper,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
  Grid,
  Typography,
  FormHelperText
} from '@material-ui/core'

import { RadioButtonUnchecked, CheckCircle } from '@material-ui/icons'

const CreateWizard: FC<SimpleFormProps> = (props) => {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: SimpleFormViewProps) => <Form {...formProps} />}
    />
  )
}

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
  if (value && ['ec', 'inquiry', 'manual'].includes(value)) return null
  return '必須'
}

const Form: FC<SimpleFormViewProps> = (props) => {
  const [templateType, setTemplateType] = useState<null | TemplateTypes>(null)
  const { change } = useForm()
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setTemplateType(e.currentTarget.value as TemplateTypes)
    change('template', e.currentTarget.value as TemplateTypes)
  }, [])
  const templateInput = useField('template')
  return (
    <Grid container component={Paper} spacing={4}>
      <Grid item xs={5}>
        <TextInput source="title" fullWidth validate={[required()]} />
      </Grid>
      <Grid item xs={7} />
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="template"
              component="input"
              type="hidden"
              validate={templateValidator}
            />
            <FormHelperText margin="dense" error>
              {templateInput.meta.touched && templateInput.meta.error}
            </FormHelperText>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardActionArea value="ec" onClick={handleClick}>
                    <CardHeader
                      title="ECサイト用"
                      action={
                        templateType === 'ec' ? (
                          <CheckCircle color="primary" fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked
                            color="primary"
                            fontSize="large"
                          />
                        )
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
                  <CardActionArea value="inquiry" onClick={handleClick}>
                    <CardHeader
                      title="お問い合わせフォーム用"
                      action={
                        templateType === 'inquiry' ? (
                          <CheckCircle color="primary" fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked
                            color="primary"
                            fontSize="large"
                          />
                        )
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
                  <CardActionArea value="manual" onClick={handleClick}>
                    <CardHeader
                      title="マニュアル"
                      action={
                        templateType === 'manual' ? (
                          <CheckCircle color="primary" fontSize="large" />
                        ) : (
                          <RadioButtonUnchecked
                            color="primary"
                            fontSize="large"
                          />
                        )
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Toolbar {...toolbarProps(props)}>
          <SaveButton label="Save" submitOnEnter={false} />
        </Toolbar>
      </Grid>
    </Grid>
  )
}

export default CreateWizard
