import { FC, useCallback } from 'react'
import { makeStyles, Zoom, useTheme } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab'
import { Proposals, Proposal, Skipper } from '@botui/types'
import TimelineDot from './TimelineDot'
import ProposalPaper from './ProposalPaper'
import MenuButton from './MenuButton'

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
  },
  timelineSeparator: {
    position: 'relative'
  },
  menuButton: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: -theme.spacing(2.5)
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
    [handlers]
  )
  const makeHandleDelete = useCallback(
    (index: number) => () => handlers.handleDelete(index),
    [handlers]
  )
  const makeHandleInsert = useCallback(
    (index: number) => (type: Proposal['type']) =>
      handlers.handleInsert(index, type),
    [handlers]
  )
  return (
    <>
      {proposals.map((proposal, index) => (
        <Timeline
          key={proposal.id}
          align={
            proposal.type === 'message' && proposal.data.human
              ? 'left'
              : 'right'
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
            <TimelineSeparator className={classes.timelineSeparator}>
              <TimelineDot
                proposal={proposal}
                editing={editing && editingIndex === index}
              />
              <div className={classes.menuButton}>
                <MenuButton
                  handleEdit={makeHandleEdit(index)}
                  handleDelete={makeHandleDelete(index)}
                  handleInsertBefore={makeHandleInsert(index)}
                  handleInsertAfter={makeHandleInsert(index + 1)}
                  last={proposals.length === index + 1}
                />
              </div>
              {proposals.length !== index + 1 && (
                <TimelineConnector className={classes.timelineConnector} />
              )}
              {proposal.type === 'skipper' && (
                <SplitLineConnector {...proposal.data} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              {proposal.type === 'message' && (
                <ProposalPaper
                  proposalData={proposal.data}
                  align={proposal.data.human ? 'left' : 'right'}
                />
              )}
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </>
  )
}

export default ProposalsTimeLine

const useSplitLineStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: theme.spacing(20),
    height: theme.spacing(38),
    top: theme.spacing(4),
    left: theme.spacing(8),
    borderTop: `${theme.spacing(0.3)}px solid ${theme.palette.grey[400]}`,
    borderRight: `${theme.spacing(0.3)}px solid ${theme.palette.grey[400]}`,
    borderBottom: `${theme.spacing(0.3)}px solid ${theme.palette.grey[400]}`
  }
}))

const SplitLineConnector: FC<Skipper> = (props) => {
  const { skipNumber } = props
  const theme = useTheme()
  const height = theme.spacing((skipNumber + 1) * 19)
  const classes = useSplitLineStyles()
  return <div className={classes.root} style={{ height }} />
}
