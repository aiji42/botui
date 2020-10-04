import { FC, useCallback } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles
} from '@material-ui/core'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon
} from '@material-ui/icons'
import { Proposal, Proposals } from '../../../../../@types/session'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0)
  },
  rightAvatar: {
    margin: '0 0 0 auto'
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

export default ProposalsTimeLine
