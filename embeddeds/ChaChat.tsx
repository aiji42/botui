import ReactDOM from 'react-dom'
import Preview from '../components/Chat/Preview'
import { Fab, Dialog, makeStyles, useMediaQuery } from '@material-ui/core'
import { ChatBubble as ChatIcon, Clear as ClearIcon } from '@material-ui/icons'
import { FC, useCallback, useState } from 'react'
import useFetchSession from '../hooks/use-fetch-session'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  paper: {
    height: 700,
    width: 400,
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(2),
    backgroundColor: 'white'
  }
}))

const SIZE = {
  Full: 'full',
  Widget: 'widget',
  Auto: 'auto'
}

type Size = typeof SIZE[keyof typeof SIZE]

interface Props {
  sessionId: string
  initialOpen?: boolean
  size?: Size
}

const Chat: FC<Props> = (props) => {
  const { initialOpen = false, size = SIZE.Auto } = props
  const { session } = useFetchSession(props.sessionId)
  const [open, setOpen] = useState<boolean>(initialOpen)
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])
  const narrow = useMediaQuery('(max-width:600px)')
  const isFull = size === SIZE.Full || (narrow && size === SIZE.Auto)
  const classes = useStyles()

  return (
    <>
      {session &&
        (isFull ? (
          <Dialog open={open} fullScreen>
            <Preview
              proposals={session.proposals}
              chatConfig={{
                ...session,
                messages: session.proposals,
                messagesCount: session.proposals.length
              }}
            />
          </Dialog>
        ) : (
          open && (
            <div className={classes.paper}>
              <Preview
                proposals={session.proposals}
                chatConfig={{
                  ...session,
                  messages: session.proposals,
                  messagesCount: session.proposals.length
                }}
              />
            </div>
          )
        ))}
      <Fab onClick={toggleOpen} className={classes.fab} color="primary">
        {open ? <ClearIcon /> : <ChatIcon />}
      </Fab>
    </>
  )
}

class ChaChat {
  sessionId: string
  mountTarget: string
  size: Size
  initialOpen: boolean

  constructor(
    sessionId: string,
    mountTarget: string,
    config: { size?: Size; initialOpen?: boolean } = {}
  ) {
    const { size = SIZE.Auto, initialOpen = false } = config
    this.sessionId = sessionId
    this.mountTarget = mountTarget
    this.size = size
    this.initialOpen = initialOpen
  }

  async start() {
    const target = document.getElementById(this.mountTarget)
    if (!target) return

    ReactDOM.render(
      <Chat
        sessionId={this.sessionId}
        initialOpen={this.initialOpen}
        size={this.size}
      />,
      target
    )
  }
}

export default ChaChat
