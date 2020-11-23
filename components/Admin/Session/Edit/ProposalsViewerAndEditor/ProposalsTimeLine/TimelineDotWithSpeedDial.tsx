import { FC, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import {
  Textsms as TextsmsIcon,
  RateReview as RateReviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerticalAlignTop,
  VerticalAlignBottom,
  InsertPhoto as InsertPhotoIcon
} from '@material-ui/icons'
import { Proposal } from '../../../../../../@types/session'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  fab: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  directionRight: {
    position: 'relative',
    left: theme.spacing(11.5)
  },
  directionLeft: {
    position: 'relative',
    right: theme.spacing(11.5)
  }
}))

interface Props extends Proposal {
  direction: 'left' | 'right'
  selected?: boolean
  handleEdit: () => void
  handleDelete: () => void
  handleInsertBefore: () => void
  handleInsertAfter: () => void
}

const TimelineDotWithSpeedDial: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const classes = useStyles()

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      icon={
        <SpeedDialIcon
          icon={
            props.content.type === 'string' ? (
              <TextsmsIcon />
            ) : props.content.type === 'form' ? (
              <RateReviewIcon />
            ) : (
              <InsertPhotoIcon />
            )
          }
          onClick={props.handleEdit}
          openIcon={<EditIcon />}
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={props.direction}
      classes={classes}
    >
      <SpeedDialAction
        icon={<DeleteIcon />}
        tooltipTitle="delete"
        onClick={props.handleDelete}
      />
      <SpeedDialAction
        icon={<VerticalAlignTop />}
        tooltipTitle="insert previous"
        onClick={props.handleInsertBefore}
      />
      <SpeedDialAction
        icon={<VerticalAlignBottom />}
        tooltipTitle="insert next"
        onClick={props.handleInsertAfter}
      />
    </SpeedDial>
  )
}

export default TimelineDotWithSpeedDial
