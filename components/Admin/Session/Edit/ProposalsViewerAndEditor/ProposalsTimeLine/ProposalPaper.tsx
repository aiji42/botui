import { FC, CSSProperties, useState, useCallback } from 'react'
import {
  Typography,
  Paper,
  makeStyles,
  ButtonBase,
  MenuItem,
  Menu,
  ListItemIcon
} from '@material-ui/core'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerticalAlignTop,
  VerticalAlignBottom
} from '@material-ui/icons'

import { Proposal } from '../../../../../../@types/session'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import nl2br from 'react-nl2br'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    maxWidth: theme.spacing(25),
    wordWrap: 'break-word',
    position: 'relative'
  },
  paperRight: {
    margin: '0 0 0 auto',
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    maxWidth: theme.spacing(25),
    wordWrap: 'break-word',
    position: 'relative'
  },
  more: {
    position: 'absolute',
    right: 0,
    top: 0
  }
}))

interface Props {
  handleEdit: () => void
  handleDelete: () => void
  handleInsertBefore: () => void
  handleInsertAfter: () => void
  proposal: Proposal
  align: 'left' | 'right'
}

const ProposalPaper: FC<Props> = (props) => {
  const {
    proposal,
    handleEdit,
    handleDelete,
    handleInsertBefore,
    handleInsertAfter,
    align
  } = props
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
  const classes = useStyles()
  return (
    <Paper
      elevation={1}
      className={align === 'right' ? classes.paperRight : classes.paper}
    >
      <ButtonBase className={classes.more} onClick={handleClick}>
        <MoreIcon />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeNewHandler(handleEdit)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          編集
        </MenuItem>
        <MenuItem onClick={makeNewHandler(handleDelete)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          削除
        </MenuItem>
        <MenuItem onClick={makeNewHandler(handleInsertBefore)}>
          <ListItemIcon>
            <VerticalAlignTop />
          </ListItemIcon>
          上に挿入
        </MenuItem>
        <MenuItem onClick={makeNewHandler(handleInsertAfter)}>
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          下に挿入
        </MenuItem>
      </Menu>
      <Typography align="left">
        {proposal.content.type === 'string' &&
          (typeof proposal.content.props.children === 'string'
            ? nl2br(proposal.content.props.children)
            : proposal.content.props.children)}
        {proposal.content.type === 'form' && proposal.content.props.type}
        {proposal.content.type === 'image' && (
          <AmplifyS3Image
            {...proposal.content.props}
            style={({ '--width': '100%' } as unknown) as CSSProperties}
          />
        )}
      </Typography>
    </Paper>
  )
}

export default ProposalPaper
