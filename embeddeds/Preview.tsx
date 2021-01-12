import InnerPreview from '../components/Chat/Preview'
import {
  Fab,
  Dialog,
  makeStyles,
  Slide,
  Paper,
  CircularProgress,
  IconButton
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { ChatBubble as ChatIcon, Clear as ClearIcon } from '@material-ui/icons'
import {
  FC,
  useCallback,
  useState,
  useRef,
  forwardRef,
  ReactElement,
  Ref,
  useEffect
} from 'react'
import useFetchSession from '../hooks/use-fetch-session'

const Transition = forwardRef(
  (
    props: TransitionProps & { children?: ReactElement<string, string> },
    ref: Ref<unknown>
  ) => <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
)

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  innerFab: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.primary.contrastText
  },
  paper: {
    height: 700,
    width: 400,
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(2),
    backgroundColor: 'white'
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(- 50 %)'
  }
}))

export const SIZE = {
  Full: 'full',
  Widget: 'widget',
  Auto: 'auto'
}

export type SizeType = typeof SIZE[keyof typeof SIZE]

interface Props {
  sessionId: string
  initialOpen?: boolean
  size?: SizeType
}

const Preview: FC<Props> = (props) => {
  const { initialOpen = false, size = SIZE.Auto } = props
  const { session } = useFetchSession(props.sessionId)
  const [open, setOpen] = useState<boolean>(initialOpen)
  const [loaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {
    !open && setLoaded(false)
  }, [open])
  const handleStart = useCallback(() => setLoaded(true), [setLoaded])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])
  const narrow = useRef(window.innerWidth < 600)
  const isFull = size === SIZE.Full || (narrow.current && size === SIZE.Auto)
  const classes = useStyles()

  return (
    <>
      {session &&
        (isFull ? (
          <Dialog TransitionComponent={Transition} open={open} fullScreen>
            {!loaded && <CircularProgress className={classes.spinner} />}
            <InnerPreview
              proposals={session.proposals}
              chatConfig={{
                ...session,
                messages: [],
                messagesCount: session.proposals.length,
                onStart: handleStart
                // TODO: ここに多分 onClose
              }}
            />
            <IconButton onClick={toggleOpen} className={classes.innerFab}>
              <ClearIcon fontSize="large" />
            </IconButton>
          </Dialog>
        ) : (
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper elevation={2} className={classes.paper}>
              {!loaded && <CircularProgress className={classes.spinner} />}
              <InnerPreview
                proposals={session.proposals}
                chatConfig={{
                  ...session,
                  messages: [],
                  messagesCount: session.proposals.length,
                  onStart: handleStart
                  // TODO: ここに多分 onClose
                }}
              />
            </Paper>
          </Slide>
        ))}
      <Fab onClick={toggleOpen} className={classes.fab} color="primary">
        {open ? <ClearIcon /> : <ChatIcon />}
      </Fab>
    </>
  )
}

export default Preview
