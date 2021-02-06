import React, { FC } from 'react'
import { AppBar } from 'react-admin'
import { makeStyles } from '@material-ui/core'
import logo from './logo.png'

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  spacer: {
    flex: 1
  }
})

const CustomizedAppBar: FC = (props) => {
  const classes = useStyles()
  return (
    <AppBar {...props} color="primary">
      <img src={logo} alt="logo" height={50} />
      <span className={classes.spacer} />
    </AppBar>
  )
}

export default CustomizedAppBar
