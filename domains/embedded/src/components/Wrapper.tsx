import React, { FC, forwardRef, ReactElement, Ref } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 700,
    width: 400,
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(2),
    backgroundColor: 'white'
  }
}))

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props: TransitionProps & { children?: ReactElement }, ref: Ref<unknown>) => (
  <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
))

export interface WrapperProps {
  isFull: boolean
  isOpen: boolean
}

export const Wrapper: FC<WrapperProps> = (props) => {
  const { isFull, isOpen } = props
  const classes = useStyles()
  if (isFull) return (
    <Dialog TransitionComponent={Transition} open={isOpen} fullScreen>
      {props.children}
    </Dialog>
  )
  return (
    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
      <Paper elevation={2} className={classes.paper}>
        {props.children}
      </Paper>
    </Slide>
  )
}
