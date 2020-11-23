import { FC, useCallback, CSSProperties } from 'react'
import { Typography, Paper, makeStyles, Zoom } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab'
import { Proposals } from '../../../../../../@types/session'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import TimelineDotWithSpeedDial from './TimelineDotWithSpeedDial'
import TimelineDotLast from './TimelineDotLast'

interface Props {
  proposals: Proposals
  editing: boolean
  editingIndex?: number
  inserting: boolean
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleInsert: (index: number) => void
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
  timelineConnector: {
    minHeight: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: theme.spacing(15),
    backgroundColor: theme.palette.background.default,
    wordWrap: 'break-word'
  }
}))

const ProposalsTimeLine: FC<Props> = ({
  proposals,
  editing,
  editingIndex,
  inserting,
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
  const makeHandleInsert = useCallback(
    (index: number) => () => handlers.handleInsert(index),
    [handlers.handleInsert]
  )
  return (
    <>
      {proposals.map((proposal, index) => (
        <Timeline
          key={index}
          align={proposal.human ? 'left' : 'right'}
          className={classes.timeline}
        >
          {inserting && editingIndex === index && (
            <Zoom in>
              <InsertingTimeLineItem />
            </Zoom>
          )}
          <TimelineItem>
            <TimelineSeparator className={classes.timelineSeparator}>
              <TimelineDotWithSpeedDial
                {...proposal}
                handleEdit={makeHandleEdit(index)}
                handleDelete={makeHandleDelete(index)}
                handleInsertBefore={makeHandleInsert(index)}
                handleInsertAfter={makeHandleInsert(index + 1)}
                direction={proposal.human ? 'left' : 'right'}
                selected={editing && editingIndex === index}
              />
              <TimelineConnector className={classes.timelineConnector} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography align="left">
                  {proposal.content.type === 'string' &&
                    proposal.content.props.children}
                  {proposal.content.type === 'form' &&
                    proposal.content.props.type}
                  {proposal.content.type === 'image' && (
                    <AmplifyS3Image
                      {...proposal.content.props}
                      style={
                        ({ '--width': '100%' } as unknown) as CSSProperties
                      }
                    />
                  )}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
      <Timeline className={classes.timeline}>
        {inserting && editingIndex === proposals.length && (
          <Zoom in>
            <InsertingTimeLineItem />
          </Zoom>
        )}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDotLast
              handleInsertBefore={makeHandleInsert(proposals.length)}
            />
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>
      </Timeline>
    </>
  )
}

export default ProposalsTimeLine

const useInsertingTimeLineItemStyles = makeStyles((theme) => ({
  timelineConnector: {
    minHeight: theme.spacing(10)
  },
  dot: {
    backgroundColor: theme.palette.warning.main
  }
}))

const InsertingTimeLineItem = () => {
  const classes = useInsertingTimeLineItemStyles()
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot className={classes.dot} />
        <TimelineConnector className={classes.timelineConnector} />
      </TimelineSeparator>
      <TimelineContent />
    </TimelineItem>
  )
}
