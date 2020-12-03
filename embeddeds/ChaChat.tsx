import ReactDOM from 'react-dom'
import Preview from '../components/Chat/Preview'
import Amplify, { API } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api'
import { getSession } from '../src/graphql/queries'
import awsconfig from '../src/aws-exports'
import { Session } from '../@types/session'
import { Fab, Modal, makeStyles } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/ChatBubble'
import { FC, useCallback, useEffect, useState } from 'react'

Amplify.configure(awsconfig)

const fetchSession = async (id: string): Promise<Session | null> => {
  const res = (await API.graphql({
    query: getSession,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })) as GraphQLResult<{ getSession: Session<string, string, string> }>

  console.log(res.data?.getSession)
  if (!res.data) return null
  const {
    data: { getSession: session }
  } = res
  const {
    proposals: proposalsString,
    images: imageString,
    theme: themeString,
    ...restSession
  } = session
  const proposals = JSON.parse(proposalsString) as Session['proposals']
  const images = JSON.parse(imageString) as Session['images']
  const theme = JSON.parse(themeString) as Session['theme']

  return {
    ...restSession,
    proposals,
    images,
    theme
  }
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  paper: {
    height: 700,
    width: 400,
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'white'
  }
}))

interface Props {
  sessionId: string
}

const Chat: FC<Props> = (props) => {
  const [session, setSession] = useState<Session | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    fetchSession(props.sessionId).then(setSession)
  }, [props.sessionId])
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const handleOpen = useCallback(() => setOpen(true), [setOpen])
  const classes = useStyles()

  return (
    <>
      {session && (
        <Modal open={open} onClose={handleClose} hideBackdrop disableScrollLock>
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
        </Modal>
      )}
      {!open && (
        <Fab onClick={handleOpen} className={classes.fab} color="primary">
          <ChatIcon />
        </Fab>
      )}
    </>
  )
}

class ChaChat {
  sessionId: string
  mountTarget: string

  constructor(sessionId: string, mountTarget: string) {
    this.sessionId = sessionId
    this.mountTarget = mountTarget
  }

  async start() {
    const target = document.getElementById(this.mountTarget)
    if (!target) return

    ReactDOM.render(<Chat sessionId={this.sessionId} />, target)
  }
}

export default ChaChat
