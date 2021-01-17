import { FC, useState, useCallback } from 'react'
import { ButtonBase, MenuItem, Menu, ListItemIcon } from '@material-ui/core'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChatBubble,
  Flag,
  SettingsEthernet,
  CallSplit
} from '@material-ui/icons'

import { Proposal } from '@botui/types'

interface Props {
  handleEdit: () => void
  handleDelete: () => void
  handleInsertBefore: (type: Proposal['type']) => void
  handleInsertAfter: (type: Proposal['type']) => void
  last?: boolean
}

const MenuButton: FC<Props> = (props) => {
  const { handleEdit, handleDelete, handleInsertBefore, last } = props
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
        {!last && (
          <MenuItem onClick={makeNewHandler(handleDelete)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            削除
          </MenuItem>
        )}
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertBefore, 'message')}
        >
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          メッセージを挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertBefore, 'skipper')}
        >
          <ListItemIcon>
            <CallSplit />
          </ListItemIcon>
          分岐を挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertBefore, 'relayer')}
        >
          <ListItemIcon>
            <SettingsEthernet />
          </ListItemIcon>
          コマンドを挿入
        </MenuItem>
        <MenuItem
          onClick={makeNewHandlerForInsert(handleInsertBefore, 'closer')}
        >
          <ListItemIcon>
            <Flag />
          </ListItemIcon>
          ゴールを挿入
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuButton
