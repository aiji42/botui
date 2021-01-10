import { FC, useState, useCallback } from 'react'
import { ButtonBase, MenuItem, Menu, ListItemIcon } from '@material-ui/core'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerticalAlignTop,
  VerticalAlignBottom
} from '@material-ui/icons'

import { Proposal } from '../../../../../../@types/session'

interface Props {
  handleEdit: () => void
  handleDelete: () => void
  handleInsertBefore: (type: Proposal['type']) => void
  handleInsertAfter: (type: Proposal['type']) => void
}

const MenuButton: FC<Props> = (props) => {
  const {
    handleEdit,
    handleDelete,
    handleInsertAfter,
    handleInsertBefore
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

  return (
    <>
      <ButtonBase onClick={handleClick}>
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
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertAfter, 'relayer')}
        >
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          下にコマンドを挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertAfter, 'closer')}
        >
          <ListItemIcon>
            <VerticalAlignBottom />
          </ListItemIcon>
          下にゴールを挿入
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuButton
