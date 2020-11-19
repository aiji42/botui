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
import { Proposals } from '../../../../../@types/session'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import TimelineDotWithSpeedDial from './TimelineDotWithSpeedDial'
import TimelineDotLast from './TimelineDotLast'

interface Props {
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
                  <TimelineConnector className={classes.timelineConnector} />
                </TimelineSeparator>
                <TimelineContent />
              </TimelineItem>
            </Zoom>
          )}
          <TimelineItem>
            <TimelineSeparator className={classes.timelineSeparator}>
              <TimelineDotWithSpeedDial
                {...proposal}
                handleEdit={makeHandleEdit(index)}
                handleDelete={makeHandleDelete(index)}
                handleInsertBefore={makeHandleInsertBefore(index)}
                handleInsertAfter={makeHandleInsertAfter(index)}
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
        {inserting && insertingIndex === proposals.length && (
          <Zoom in>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector className={classes.timelineConnector} />
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
