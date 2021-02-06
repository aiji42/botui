import React, { FC, FormEvent, useCallback } from 'react'
import { TextField, Link, Grid } from '@material-ui/core'
import { FormWrapper } from './FormWrapper'
import { useLoginContext } from './use-login-context'

export const ConfirmSignUpForm: FC = () => {
  const [{ loading, error }, { confirmSignUp, setDataset }] = useLoginContext()
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      confirmSignUp()
    },
    [confirmSignUp]
  )
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      error={error}
      buttonTitle="アカウントを認証する"
      title="アカウント認証"
      loading={loading}
      footerContent={<Footer />}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="code"
        label="確認コード(メールをご確認ください)"
        id="code"
        autoComplete="one-time-code"
        autoFocus
        onChange={(e) =>
          setDataset((prev) => ({ ...prev, code: e.target.value }))
        }
      />
    </FormWrapper>
  )
}

const Footer: FC = () => {
  const [,{ resendSignUp }] = useLoginContext()
  const handleResendCode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    resendSignUp()
  }
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2" onClick={handleResendCode}>
          確認コードを再送する
        </Link>
      </Grid>
    </Grid>
  )
}
