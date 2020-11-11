import { FC, useCallback, useState } from 'react'
import {
  Typography,
  Paper,
  makeStyles,
  Zoom,
  Button,
  Fab
} from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@material-ui/lab'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerticalAlignTop,
  VerticalAlignBottom,
  Add as AddIcon
} from '@material-ui/icons'
import { Proposal, Proposals } from '../../../../../@types/session'
import { faBaby } from '@fortawesome/free-solid-svg-icons'

const useSpeedDialStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  fab: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
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
  selected?: boolean
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
          onClick={props.handleEdit}
          openIcon={<EditIcon />}
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={props.direction}
      classes={classes}
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

interface TimeLineDotLastProps {
  selected?: boolean
  handleInsertBefore: () => void
}

const TimelineDotLast: FC<TimeLineDotLastProps> = (props) => {
  const classes = useSpeedDialStyles()

  return (
    <Fab onClick={props.handleInsertBefore} color="secondary" classes={classes}>
      <AddIcon />
    </Fab>
  )
}

interface ProposalsTimeLineProps {
  proposals: Proposals
  editing: boolean
  editingIndex?: number
  inserting: boolean
  insertingIndex?: number
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleInsertBefore: (index: number) => void
  handleInsertAfter: (index: number) => void
}

const useStyles = makeStyles((theme) => ({
  timeline: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  timelineSeparator: {
    width: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: theme.spacing(15),
    backgroundColor: theme.palette.background.default
  }
}))

const ProposalsTimeLine: FC<ProposalsTimeLineProps> = ({
  proposals,
  editing,
  editingIndex,
  inserting,
  insertingIndex,
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
          {inserting && insertingIndex === index && (
            <Zoom in>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector style={{ minHeight: 20 }} />
                </TimelineSeparator>
                <TimelineContent />
              </TimelineItem>
            </Zoom>
          )}
          <TimelineItem>
            <TimelineSeparator className={classes.timelineSeparator}>
              <TimelineDotInner
                {...proposal}
                handleEdit={makeHandleEdit(index)}
                handleDelete={makeHandleDelete(index)}
                handleInsertBefore={makeHandleInsertBefore(index)}
                handleInsertAfter={makeHandleInsertAfter(index)}
                direction={proposal.human ? 'left' : 'right'}
                selected={editing && editingIndex === index}
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
      <Timeline className={classes.timeline}>
        {inserting && insertingIndex === proposals.length && (
          <Zoom in>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector style={{ minHeight: 20 }} />
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          </Zoom>
        )}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDotLast
              handleInsertBefore={makeHandleInsertBefore(proposals.length)}
            />
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>
      </Timeline>
    </>
  )
}

export default ProposalsTimeLine
