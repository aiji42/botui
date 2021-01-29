import { FC, useCallback, useState, ChangeEvent } from 'react'
import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  CreateProps,
  Edit,
  Create
} from 'react-admin'
import EditForm from './Edit'
import CreateForm from './Create'
import {
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core'

type Size = 'auto' | 'widget' | 'full'

const embeddedScript = (
  sessionId: string,
  size: Size,
  defaultOpen: boolean
) => `
<script src="https://unpkg.com/@botui-domain/embedded" type="text/javascript">
  new BotuiChat.default('${sessionId}',{defaultOpen:${defaultOpen},size:'${size}'}).start()
</script>
`

const assignable = (arg: unknown): arg is Size =>
  typeof arg === 'string' && ['auto', 'widget', 'full'].includes(arg)

const SessionPanel: FC<{ id?: string }> = (props) => {
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false)
  const [size, setSize] = useState<Size>('auto')
  const handleChangeDefaultOpen = useCallback((...[, checked]: [unknown, boolean]) => setDefaultOpen(checked), [setDefaultOpen])
  const handleChangeSize = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => assignable(e.target.value) && setSize(e.target.value),
    [setSize]
  )
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Select onChange={handleChangeSize} defaultValue={size}>
              <MenuItem value="auto">おまかせ(画面幅で自動切り替え)</MenuItem>
              <MenuItem value="full">全画面</MenuItem>
              <MenuItem value="widget">ウィジェット</MenuItem>
            </Select>
          }
          label="サイズ"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch checked={defaultOpen} onChange={handleChangeDefaultOpen} />
          }
          label="即時起動"
        />
      </Grid>
      <Grid item xs={12}>
        <code>{embeddedScript(props.id ?? '', size, defaultOpen)}</code>
      </Grid>
    </Grid>
  )
}

export const SessionList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false} exporter={false}>
      <Datagrid rowClick="edit" expand={<SessionPanel />}>
        <TextField source="title" sortable={false} />
        <BooleanField source="active" />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <CreateForm warnWhenUnsavedChanges />
    </Create>
  )
}

export const SessionEdit: FC = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()

  return (
    <Edit
      {...props}
      onSuccess={() => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, true)
        refresh()
      }}
    >
      <EditForm warnWhenUnsavedChanges />
    </Edit>
  )
}
