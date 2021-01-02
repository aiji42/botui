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

import { ProposalMessage, Proposal } from '../../../../../../@types/session'
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
  handleInsertBefore: (type: Proposal['type']) => void
  handleInsertAfter: (type: Proposal['type']) => void
  proposalData: ProposalMessage['data']
  align: 'left' | 'right'
}

const ProposalPaper: FC<Props> = (props) => {
  const {
    proposalData,
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
  const makeNewHandlerForInsert = useCallback(
    (handler, type) => () => {
      handler(type)
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
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertBefore, 'message')}
        >
          <ListItemIcon>
            <VerticalAlignTop />
          </ListItemIcon>
          上に挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertAfter, 'message')}
        >
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          下に挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertAfter, 'skipper')}
        >
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          下に条件分岐を挿入
        </MenuItem>
      </Menu>
      <Typography align="left">
        {proposalData.content.type === 'string' &&
          (typeof proposalData.content.props.children === 'string'
            ? nl2br(proposalData.content.props.children)
            : proposalData.content.props.children)}
        {proposalData.content.type === 'form' &&
          proposalData.content.props.type}
        {proposalData.content.type === 'image' && (
          <AmplifyS3Image
            {...proposalData.content.props}
            style={({ '--width': '100%' } as unknown) as CSSProperties}
          />
        )}
      </Typography>
    </Paper>
  )
}

export default ProposalPaper
