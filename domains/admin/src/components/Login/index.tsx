import React, { FC, useCallback, useEffect } from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components'
import { useCheckAuth } from 'react-admin'
import { useHistory } from 'react-router-dom'

export const Login: FC = () => {
  const checkAuth = useCheckAuth()
  const history = useHistory()
  useEffect(() => {
    checkAuth({}, false)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        // not authenticated, stay on the login page
      })
  }, [checkAuth, history])
  const handleAuthStateChange = useCallback(
    (state: AuthState) => {
      state === AuthState.SignedIn && history.push('/sessions')
    },
    [history]
  )
  return (
    <AmplifyAuthenticator
      usernameAlias="email"
      handleAuthStateChange={handleAuthStateChange}
    >
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[{ type: 'email' }, { type: 'password' }]}
      />
    </AmplifyAuthenticator>
  )
}
