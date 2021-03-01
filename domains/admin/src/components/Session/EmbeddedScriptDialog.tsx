import { FC, useState, useCallback } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Dialog, DialogContent, Button, Typography } from '@material-ui/core'
import { Code } from '@material-ui/icons'
import { Session } from '@botui/types'

const embeddedScript = (sessionId: string) => `
<script src="https://unpkg.com/@botui-domain/embedded"></script>
<script type="text/javascript">!function(){new BotuiChat.default('${sessionId}').start()}();</script>
`

interface EmbeddedScriptDialogProps {
  session: Session
}

const EmbeddedScriptDialog: FC<EmbeddedScriptDialogProps> = ({ session }) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  return (
    <>
      <Button
        startIcon={<Code />}
        onClick={() => setOpen(true)}
      >
        公開用タグ
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography color="textSecondary">
            下記のコードをチャットを起動させたいページBODYタグの開始直後に埋め込んでください。
          </Typography>
          <SyntaxHighlighter language="text">
            {embeddedScript(session.id)}
          </SyntaxHighlighter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmbeddedScriptDialog
