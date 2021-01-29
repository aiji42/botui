import { FC, useState, useCallback, ChangeEvent } from 'react'
import {
  Grid,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter'

type Size = 'auto' | 'widget' | 'full'

const embeddedScript = (
  sessionId: string,
  size: Size,
  defaultOpen: boolean
) => `<script src="https://unpkg.com/@botui-domain/embedded" type="text/javascript">
  new BotuiChat.default('${sessionId}',{defaultOpen:${defaultOpen},size:'${size}'}).start()
</script>`

const assignable = (arg: unknown): arg is Size =>
  typeof arg === 'string' && ['auto', 'widget', 'full'].includes(arg)

interface SessionPanelProps {
  id?: string
}

export const EmbeddedScriptPanel: FC<SessionPanelProps> = (props) => {
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false)
  const [size, setSize] = useState<Size>('auto')
  const handleChangeDefaultOpen = useCallback(
    (...[, checked]: [unknown, boolean]) => setDefaultOpen(checked),
    [setDefaultOpen]
  )
  const handleChangeSize = useCallback(
    (e: ChangeEvent<{ value: unknown }>) =>
      assignable(e.target.value) && setSize(e.target.value),
    [setSize]
  )
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="textSecondary">
            下記のコードをチャットを起動させたいページのHEADタグ内に埋め込んでください。
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SyntaxHighlighter language="text">
            {embeddedScript(props.id ?? '', size, defaultOpen)}
          </SyntaxHighlighter>
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth variant="filled">
            <InputLabel>チャット画面のサイズ</InputLabel>
            <Select onChange={handleChangeSize} value={size}>
              <MenuItem value="auto">
                おまかせ(画面幅に応じて切り替える)
              </MenuItem>
              <MenuItem value="full">全画面</MenuItem>
              <MenuItem value="widget">ウィジェット</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch
                checked={defaultOpen}
                onChange={handleChangeDefaultOpen}
                color="primary"
                size="medium"
              />
            }
            label="読み込みと同時に起動させる"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
