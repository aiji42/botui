import { FC, useCallback } from 'react'
import { makeStyles, Zoom } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab'
import { Proposals, Proposal } from '../../../../../../@types/session'
import TimelineDot from './TimelineDot'
import TimelineDotLast from './TimelineDotLast'
import ProposalPaper from './ProposalPaper'

interface Props {
  proposals: Proposals
  editing: boolean
  editingIndex?: number
  inserting: boolean
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleInsert: (index: number, type: Proposal['type']) => void
}

const useStyles = makeStyles((theme) => ({
  timeline: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  timelineConnector: {
    minHeight: theme.spacing(10)
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
    (index: number) => (type: Proposal['type']) =>
      handlers.handleInsert(index, type),
    [handlers.handleInsert]
  )
  return (
    <>
      {proposals.map((proposal, index) => (
        <Timeline
          key={proposal.id}
          align={
            proposal.type === 'message' && proposal.human ? 'left' : 'right'
          }
          className={classes.timeline}
        >
          {inserting && editingIndex === index && (
            <Zoom in>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot {...proposal} editing />
                  <TimelineConnector className={classes.timelineConnector} />
                </TimelineSeparator>
                <TimelineContent />
              </TimelineItem>
            </Zoom>
          )}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                {...proposal}
                editing={editing && editingIndex === index}
              />
              <TimelineConnector className={classes.timelineConnector} />
            </TimelineSeparator>
            <TimelineContent>
              {proposal.type === 'message' && (
                <ProposalPaper
                  handleEdit={makeHandleEdit(index)}
                  handleDelete={makeHandleDelete(index)}
                  handleInsertBefore={makeHandleInsert(index)}
                  handleInsertAfter={makeHandleInsert(index + 1)}
                  proposal={proposal}
                  align={proposal.human ? 'left' : 'right'}
                />
              )}
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
      <Timeline className={classes.timeline}>
        {inserting && editingIndex === proposals.length && (
          <Zoom in>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot editing />
                <TimelineConnector className={classes.timelineConnector} />
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
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
