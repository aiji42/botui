import React, { MouseEventHandler, FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.primary.contrastText,
    backgroundImage: 'none' // reset style
  }
}))

export interface ClearButtonProps {
  onClick: MouseEventHandler
}

export const ClearButton: FC<ClearButtonProps> = (props) => {
  const classes = useStyles()
  return (
    <IconButton className={classes.iconButton} onClick={props.onClick}>
      <ClearIcon fontSize="large" />
    </IconButton>
  )
}