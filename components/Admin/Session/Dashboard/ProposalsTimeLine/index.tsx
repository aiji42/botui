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
  SpeedDialProps
} from '@material-ui/lab'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { Proposal, Proposals } from '../../../../../@types/session'

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

interface ProposalsTimeLineProps {
  proposals: Proposals
  handleClick: (index: number) => () => void
}

const ProposalsTimeLine: FC<ProposalsTimeLineProps> = (props) => {
  const { proposals, handleClick, children, ...restProps } = props

  const icon = useCallback((proposal: Proposal) => {
    return proposal.content.type === 'string' ? (
      <TextsmsIcon />
    ) : (
      <RateReviewIcon />
    )
  }, [])

  const secondaryText = useCallback((proposal: Proposal) => {
    return proposal.content.type === 'string'
      ? proposal.content.props.children
      : proposal.content.props.type
  }, [])

  const classes = useStyles()

  return (
    <List className={classes.root} {...restProps}>
      {proposals.map((proposal, index) => (
        <ListItem key={index} button onClick={handleClick(index)}>
          {!proposal.human && (
            <ListItemAvatar>
              <Avatar children={icon(proposal)} />
            </ListItemAvatar>
          )}
          <ListItemText
            style={{ textAlign: proposal.human ? 'right' : 'left' }}
            primary={proposal.human ? 'ユーザ' : 'オペレーター'}
            secondary={secondaryText(proposal)}
          />
          {proposal.human && (
            <ListItemAvatar>
              <Avatar
                children={icon(proposal)}
                className={classes.rightAvatar}
              />
            </ListItemAvatar>
          )}
        </ListItem>
      ))}
      {children}
    </List>
  )
}

const TimelineDotInner: FC<{ direction: SpeedDialProps['direction'] }> = (
  props
) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      icon={<TextsmsIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={props.direction}
    >
      <SpeedDialAction
        icon={<EditIcon />}
        tooltipTitle="edit"
        onClick={handleClose}
        style={{ position: 'absolute' }}
      />
      <SpeedDialAction
        icon={<DeleteIcon />}
        tooltipTitle="delete"
        onClick={handleClose}
        style={{ position: 'absolute' }}
      />
    </SpeedDial>
  )
}

const ProposalsTimeLine2: FC<ProposalsTimeLineProps> = ({
  proposals,
  handleClick
}) => {
  const classes = useStyles()
  return (
    <>
      {proposals.map((proposal, index) => (
        <Timeline
          key={index}
          align={proposal.human ? 'left' : 'right'}
          className={classes.timeline}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={proposal.human ? 'primary' : 'secondary'}>
                <TimelineDotInner
                  direction={proposal.human ? 'left' : 'right'}
                />
              </TimelineDot>
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

export default ProposalsTimeLine2
