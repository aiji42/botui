import { FC, useCallback, useState } from 'react'
import { Typography, Paper, makeStyles } from '@material-ui/core'
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
  VerticalAlignBottom
} from '@material-ui/icons'
import { Proposal, Proposals } from '../../../../../@types/session'

const useSpeedDialStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  fab: {
    backgroundColor: theme.palette.secondary.main
  },
  'fab:hover': {
    backgroundColor: theme.palette.secondary.main
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

const useSpeedDialIcon = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main
  },
  icon: {
    backgroundColor: theme.palette.secondary.main
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
  const iconClasses = useSpeedDialIcon()

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
          classes={iconClasses}
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
  paper: {
    padding: theme.spacing(1),
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
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector style={{ minHeight: 20 }} />
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          )}
          <TimelineItem>
            <TimelineSeparator style={{ width: 40 }}>
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
    </>
  )
}

export default ProposalsTimeLine
