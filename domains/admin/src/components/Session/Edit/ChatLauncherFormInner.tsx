import { FC } from 'react'
import { Grid } from '@material-ui/core'
import { SelectInput, BooleanInput } from 'react-admin'

const sizeChoices = [
  { id: 'auto', name: '自動切り替え' },
  { id: 'full', name: '全画面' },
  { id: 'widget', name: 'ウィジェット' }
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
    </Grid>
  )
}

export default SessionFormInner
