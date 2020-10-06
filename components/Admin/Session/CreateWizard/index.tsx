import { FC } from 'react'
import {
  SimpleForm,
  TextInput,
  RadioButtonGroupInput,
  Create,
  CreateProps
} from 'react-admin'

import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  Typography
} from '@material-ui/core'

const proposals = [
  { id: 'ec', name: 'ECサイト' },
  { id: 'inquiry', name: 'お問い合わせフォーム' },
  { id: 'manual', name: 'マニュアル' }
]

const CreateWizard: FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SimpleForm>
            <TextInput source="title" />
          </SimpleForm>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="ECサイト用" />
            <CardContent>
              <Typography paragraph>
                名前や住所等の個人情報及び、支払い・配送情報等を獲得するためのテンプレートです。
              </Typography>
              <Typography paragraph>通販サイトでの導入に最適です。</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="お問い合わせフォーム用" />
            <CardContent>
              <Typography paragraph>
                名前や住所等の個人情報及び、アンケート式の選択フォームや自由入力のテキストエリアを備えたテンプレートです。
              </Typography>
              <Typography paragraph>
                お問い合わせフォームやお申込みフォームなどに最適です。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="マニュアル作成" />
            <CardContent>
              <Typography paragraph></Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Create>
  )
}

export default CreateWizard
