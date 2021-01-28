import React, { FC } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() => ({
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(- 50 %)'
  }
}))

export const Spinner: FC = () => {
  const classes = useStyles()
  return <CircularProgress className={classes.spinner} />
}
