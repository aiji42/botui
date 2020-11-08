import { FC, useCallback, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Button,
  makeStyles
} from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
  SpeedDial,
  SpeedDialAction,
  SpeedDialProps,
  SpeedDialIcon
} from '@material-ui/lab'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerticalAlignTop,
  VerticalAlignBottom
} from '@material-ui/icons'
import { Proposal, Proposals } from '../../../../../@types/session'

const useSpeedDialStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  directionRight: {
    position: 'relative',
    left: theme.spacing(11.5)
  },
  directionLeft: {
    position: 'relative',
    right: theme.spacing(11.5)
  }
}))

interface TimeLineDotInnerProps extends Proposal {
  direction: 'left' | 'right'
  handleEdit: () => void
  handleDelete: () => void
  handleInsertBefore: () => void
  handleInsertAfter: () => void
}

const TimelineDotInner: FC<TimeLineDotInnerProps> = (props) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const classes = useSpeedDialStyles()

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      icon={
        <SpeedDialIcon
          icon={
            props.content.type === 'string' ? (
              <TextsmsIcon />
            ) : (
              <RateReviewIcon />
            )
          }
          openIcon={<EditIcon />}
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={props.direction}
      classes={classes}
      onClick={props.handleEdit}
    >
      <SpeedDialAction
        icon={<DeleteIcon />}
        tooltipTitle="delete"
        onClick={props.handleDelete}
      />
      <SpeedDialAction
        icon={<VerticalAlignTop />}
        tooltipTitle="insert previous"
        onClick={props.handleInsertBefore}
      />
      <SpeedDialAction
        icon={<VerticalAlignBottom />}
        tooltipTitle="insert next"
        onClick={props.handleInsertAfter}
      />
    </SpeedDial>
  )
}

interface ProposalsTimeLineProps {
  proposals: Proposals
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleInsertBefore: (index: number) => void
  handleInsertAfter: (index: number) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0)
  },
  rightAvatar: {
    margin: '0 0 0 auto'
  },
  timeline: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}))

const ProposalsTimeLine: FC<ProposalsTimeLineProps> = ({
  proposals,
  ...handlers
}) => {
  const classes = useStyles()
  const makeHandleEdit = useCallback(
    (index: number) => () => handlers.handleEdit(index),
    [handlers.handleEdit]
  )
  const makeHandleDelete = useCallback(
    (index: number) => () => handlers.handleDelete(index),
    [handlers.handleDelete]
  )
  const makeHandleInsertBefore = useCallback(
    (index: number) => () => handlers.handleInsertBefore(index),
    [handlers.handleInsertBefore]
  )
  const makeHandleInsertAfter = useCallback(
    (index: number) => () => handlers.handleInsertAfter(index),
    [handlers.handleInsertAfter]
  )
  return (
    <>
      {proposals.map((proposal, index) => (
        <Timeline
          key={index}
          align={proposal.human ? 'left' : 'right'}
          className={classes.timeline}
        >
          <TimelineItem>
            <TimelineSeparator style={{ width: 40 }}>
              <TimelineDotInner
                {...proposal}
                handleEdit={makeHandleEdit(index)}
                handleDelete={makeHandleDelete(index)}
                handleInsertBefore={makeHandleInsertBefore(index)}
                handleInsertAfter={makeHandleInsertAfter(index)}
                direction={proposal.human ? 'left' : 'right'}
              />
              <TimelineConnector style={{ minHeight: 20 }} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography align="left" style={{ wordWrap: 'break-word' }}>
                  {proposal.content.type === 'string'
                    ? proposal.content.props.children
                    : proposal.content.props.type}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </>
  )
}

export default ProposalsTimeLine
