import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Grid,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import { customizedTheme } from '../../customizedTheme'
import { makeStyles } from '@material-ui/core'
import { EyeCatch } from './EyeCatch'
import { Mode, useLoginContext, LoginContextProvider } from './use-login-context'
import { SignInForm } from './SignInForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { SignUpForm } from './SignUpForm'
import { ConfirmSignUpForm } from './ConfirmSignUpForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import { useCheckAuth } from 'react-admin'

const theme = createMuiTheme({
  palette: {
    primary: customizedTheme.palette.primary,
    secondary: customizedTheme.palette.secondary
  }
})

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh'
  }
}))

export function Login() {
  const classes = useStyles()
  const checkAuth = useCheckAuth()
  const history = useHistory()
  checkAuth({}, false).then(() => history.push('/'))

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7}>
          <EyeCatch />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <LoginContextProvider>
            <AuthForm />
          </LoginContextProvider>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

const AuthForm: FC = () => {
  const [{ mode, authSucceed }] = useLoginContext()
  const history = useHistory()
  useEffect(() => {
    authSucceed && history.push('/')
  }, [authSucceed, history])

  return (
    <>
      {mode === Mode.SIGN_IN && <SignInForm />}
      {mode === Mode.SIGN_UP && <SignUpForm />}
      {mode === Mode.CONFIRM_SIGN_UP && <ConfirmSignUpForm />}
      {mode === Mode.FORGOT_PASSWORD && <ForgotPasswordForm />}
      {mode === Mode.RESET_PASSWORD && <ResetPasswordForm />}
    </>
  )
}