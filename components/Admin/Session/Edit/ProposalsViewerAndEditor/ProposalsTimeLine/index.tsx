import { FC, useCallback, useState } from 'react'
import {
  makeStyles,
  Zoom,
  useTheme,
  ButtonBase,
  Menu,
  MenuItem,
  ListItemIcon
} from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import {
  Proposals,
  Proposal,
  ProposalSkipper
} from '../../../../../../@types/session'
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
  },
  timelineSeparator: {
    position: 'relative'
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
            <TimelineSeparator className={classes.timelineSeparator}>
              <TimelineDot
                proposal={proposal}
                editing={editing && editingIndex === index}
              />
              <TimelineConnector className={classes.timelineConnector} />
              {proposal.type === 'skipper' && (
                <SplitLineConnector
                  skipNumber={proposal.skipNumber}
                  handleEdit={makeHandleEdit(index)}
                  handleDelete={makeHandleDelete(index)}
                />
              )}
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

const SplitLineConnector: FC<
  Pick<ProposalSkipper, 'skipNumber'> & {
    handleEdit: () => void
    handleDelete: () => void
  }
> = (props) => {
  const { skipNumber, ...rest } = props
  const theme = useTheme()
  const height = theme.spacing((skipNumber + 1) * 19)
  const classes = useSplitLineStyles()
  return (
    <div className={classes.root} style={{ height }}>
      <SplitLineMenu {...rest} />
    </div>
  )
}

const useSplitLineMenuStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: -theme.spacing(4)
  }
}))

const SplitLineMenu: FC<{
  handleEdit: () => void
  handleDelete: () => void
}> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    [setAnchorEl]
  )
  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const makeNewHandler = useCallback(
    (handler) => () => {
      handler()
      handleClose()
    },
    [handleClose]
  )
  const classes = useSplitLineMenuStyles()

  return (
    <>
      <ButtonBase onClick={handleClick} className={classes.root}>
        <MoreIcon />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeNewHandler(props.handleEdit)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          編集
        </MenuItem>
        <MenuItem onClick={makeNewHandler(props.handleDelete)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          削除
        </MenuItem>
      </Menu>
    </>
  )
}
