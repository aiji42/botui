import { FC } from 'react'
import { Grid } from '@material-ui/core'
import { SelectInput, BooleanInput, CheckboxGroupInput } from 'react-admin'

const sizeChoices = [
  { id: 'auto', name: '自動切り替え' },
  { id: 'full', name: '全画面' },
  { id: 'widget', name: 'ウィジェット' }
]

const scripts = [
  { id: 'https://unpkg.com/dayjs/dayjs.min.js', name: 'dayjs' },
  { id: 'https://unpkg.com/axios/dist/axios.min.js', name: 'axios' }
]

const SessionFormInner: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <SelectInput
          label="チャット画面の大きさ"
          source="launcher.size"
          resource="sessions"
          choices={sizeChoices}
          defaultValue="auto"
          fullWidth
        />
      </Grid>
      <Grid item xs={8} />
      <Grid item xs={6}>
        <BooleanInput
          label="自動即時起動"
          source="launcher.defaultOpen"
          resource="sessions"
          defaultValue={false}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckboxGroupInput
          label="外部スクリプトの読み込み"
          source="launcher.loadScripts"
          resource="sessions"
          choices={scripts}
        />
      </Grid>
    </Grid>
  )
}

export default SessionFormInner
