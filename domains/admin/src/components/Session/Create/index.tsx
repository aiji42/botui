import { FC } from 'react'
import {
  TextInput,
  required,
  RadioButtonGroupInput,
  SimpleForm,
  SimpleFormProps,
  email
} from 'react-admin'
import { Grid, Typography, Tooltip } from '@material-ui/core'
import { useForm } from 'react-final-form'
import { ec, inquiry, custom } from './proposalTemplates'
import ThemeColorSelector from './ThemeColorSelector'
import { Launcher, Images } from '@botui/types'

const proposalsChoices = [
  {
    id: ec,
    title:
      '名前や住所等の個人情報及び、支払い・配送情報等を獲得するためのテンプレートです。通販サイトでの導入に最適です。',
    name: 'ECサイト用'
  },
  {
    id: inquiry,
    title:
      '名前や住所等の個人情報及び、アンケート式の選択フォームや自由入力のテキストエリアを備えたテンプレートです。お問い合わせフォームやお申込みフォームなどに最適です。',
    name: 'お問い合わせフォーム用'
  },
  {
    id: custom,
    title: 'テンプレートを使用せず、いちから自由に作成できます。',
    name: 'マニュアル'
  }
]

const Create: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props}>
      <FormInner />
    </SimpleForm>
  )
}

const FormInner: FC = () => {
  const { change } = useForm()
  change('active', true)
  change('images', JSON.stringify({ agent: '/operator_female1.jpg' } as Images))
  change(
    'launcher',
    JSON.stringify({ size: 'auto', defaultOpen: false } as Launcher)
  )
  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <TextInput
          source="title"
          label="タイトル"
          fullWidth
          validate={[required()]}
        />
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
            <ThemeColorSelector />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <TextInput
          source="email"
          type="email"
          label="通知用メールアドレス"
          validate={[required(), email()]}
          fullWidth
        />
      </Grid>
      <Grid item xs={7} />
    </Grid>
  )
}

const TemplateChoiceLabel: FC<{ record?: { title: string; name: string } }> = ({
  record: { title, name } = { title: '', name: '' }
}) => {
  return (
    <Tooltip title={title}>
      <Typography>{name}</Typography>
    </Tooltip>
  )
}

export default Create
