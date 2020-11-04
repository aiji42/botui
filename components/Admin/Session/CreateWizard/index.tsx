import { FC, useCallback } from 'react'
import {
  TextInput,
  FormWithRedirect,
  SaveButton,
  required,
  RadioButtonGroupInput,
  FormWithRedirectProps
} from 'react-admin'
import { Field, useForm, useField } from 'react-final-form'
import {
  Card,
  Paper,
  CardMedia,
  CardActionArea,
  Box,
  Grid,
  Typography,
  FormHelperText,
  makeStyles,
  Tooltip,
  Toolbar
} from '@material-ui/core'
import { ec } from './proposalTemplates'

const CreateWizard: FC<Omit<FormWithRedirectProps, 'render'>> = (props) => {
  const render = useCallback((formProps) => <Form {...formProps} />, [])
  return <FormWithRedirect {...props} render={render} />
}

const useStyles = makeStyles((theme) => ({
  selectedRadioImageCard: {
    border: 'solid',
    borderColor: theme.palette.secondary.main
  }
}))

const RadioImageCard: FC<{ source: string; value: string; image?: string }> = ({
  source,
  value,
  image
}) => {
  const { change } = useForm()
  const {
    input: { value: selectedValue }
  } = useField(source)
  const handleClick = useCallback(() => {
    change(source, value)
  }, [value])
  const classes = useStyles()
  return (
    <Card
      className={selectedValue === value ? classes.selectedRadioImageCard : ''}
    >
      <CardActionArea value={value} onClick={handleClick}>
        <CardMedia component="img" src={image} />
      </CardActionArea>
    </Card>
  )
}

const proposalsChoices = [
  {
    id: ec,
    title:
      '名前や住所等の個人情報及び、支払い・配送情報等を獲得するためのテンプレートです。通販サイトでの導入に最適です。',
    name: 'ECサイト用'
  },
  {
    id:
      '[{"content": {"delay": 500,"type": "string","props": {"children": "いらっしゃいませ！"}}}]',
    title:
      '名前や住所等の個人情報及び、アンケート式の選択フォームや自由入力のテキストエリアを備えたテンプレートです。お問い合わせフォームやお申込みフォームなどに最適です。',
    name: 'お問い合わせフォーム用'
  },
  {
    id: '[]',
    title: 'テンプレートを使用せず、いちから自由に作成できます。',
    name: 'マニュアル'
  }
]

const themeColors = [
  {
    image: '/theme-color-1.png',
    style: {
      header: { backgroundColor: '#00B900' },
      footer: { backgroundColor: '#98EA98' },
      agent: { backgroundColor: '#00B900', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#00B900' }
    }
  },
  {
    image: '/theme-color-2.png',
    style: {
      header: { backgroundColor: '#69C9D0' },
      footer: { backgroundColor: '#69C9D0' },
      agent: { backgroundColor: '#69C9D0', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#EE1D52' }
    }
  },
  {
    image: '/theme-color-3.png',
    style: {
      header: { backgroundColor: '#FD94D3' },
      footer: { backgroundColor: '#2576EF' },
      agent: { backgroundColor: '#2576EF', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#0F00B9' }
    }
  },
  {
    image: '/theme-color-4.png',
    style: {
      header: { backgroundColor: '#F9A36C' },
      footer: { backgroundColor: '#305E7A' },
      agent: { backgroundColor: '#F26728', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#9CD7D2' }
    }
  }
]

const TemplateChoiceLabel: FC<{ record?: { title: string; name: string } }> = ({
  record: { title, name } = { title: '', name: '' }
}) => {
  return (
    <Tooltip title={title}>
      <Typography>{name}</Typography>
    </Tooltip>
  )
}

const Form: FC<any> = (props) => {
  const themeInput = useField('theme')
  return (
    <Grid container component={Paper} spacing={1}>
      <Box p={2}>
        <Grid item xs={5}>
          <TextInput source="title" fullWidth validate={[required()]} />
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={12}>
          <RadioButtonGroupInput
            source="proposals"
            label="テンプレート"
            row
            fullWidth
            validate={[required()]}
            optionText={<TemplateChoiceLabel />}
            choices={proposalsChoices}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                テーマカラー *
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {themeColors.map(({ image, style }, index) => (
                <Grid item xs={2} key={index}>
                  <RadioImageCard
                    source="theme"
                    value={JSON.stringify(style)}
                    image={image}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Field
                  name="theme"
                  component="input"
                  type="hidden"
                  validate={required('選択してください')}
                />
                <FormHelperText margin="dense" error>
                  {themeInput.meta.touched && themeInput.meta.error}
                </FormHelperText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <SaveButton
              saving={props.saving}
              disabled={props.pristine}
              invalid={props.invalid}
              handleSubmitWithRedirect={props.handleSubmitWithRedirect}
            />
          </Box>
        </Toolbar>
      </Grid>
    </Grid>
  )
}

export default CreateWizard
