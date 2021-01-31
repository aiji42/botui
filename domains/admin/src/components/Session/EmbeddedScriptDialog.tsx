import { FC, useState, useCallback } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Dialog, DialogContent, Button, Typography } from '@material-ui/core'
import { Code } from '@material-ui/icons'
import { Session } from '@botui/types'

const embeddedScript = (
  sessionId: string,
  size: Session['launcher']['size'],
  defaultOpen: boolean
) => `<script src="https://unpkg.com/@botui-domain/embedded"></script>
<script type="text/javascript">new BotuiChat.default('${sessionId}',{defaultOpen:${defaultOpen},size:'${size}'}).start()</script>`

interface EmbeddedScriptDialogProps {
  session: Session
  disabled?: boolean
}

const EmbeddedScriptDialog: FC<EmbeddedScriptDialogProps> = ({ session, disabled = false }) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  return (
    <>
      <Button
        startIcon={<Code />}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        公開用タグ
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography color="textSecondary">
            下記のコードをチャットを起動させたいページのHEADタグ内に埋め込んでください。
          </Typography>
          <SyntaxHighlighter language="text">
            {embeddedScript(
              session.id,
              session.launcher.size,
              session.launcher.defaultOpen
            )}
          </SyntaxHighlighter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmbeddedScriptDialog
