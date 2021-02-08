import { createContext, useCallback, useContext, useState, Dispatch, SetStateAction, FC } from 'react'
import { Auth, I18n } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

export const Mode = {
  SIGN_IN: 0,
  SIGN_UP: 1,
  CONFIRM_SIGN_UP: 2,
  FORGOT_PASSWORD: 3,
  RESET_PASSWORD: 4
} as const

type Modes = typeof Mode[keyof typeof Mode]

interface Dataset {
  email: string
  password: string
  code: string
  mode: Modes,
  error: string
  loading: boolean
  authSucceed: boolean
}

interface LoginContextValue {
  setDataset: Dispatch<SetStateAction<Dataset>>
  dataset: Dataset
}

export const LoginContext = createContext<LoginContextValue>({
  setDataset: () => {},
  dataset: {
    email: '',
    password: '',
    code: '',
    mode: Mode.SIGN_IN,
    error: '',
    loading: false,
    authSucceed: false
  }
})

export const LoginContextProvider: FC = ({ children }) => {
  const [dataset, setDataset] = useState<Dataset>({
    email: '',
    password: '',
    code: '',
    mode: Mode.SIGN_IN,
    error: '',
    loading: false,
    authSucceed: false
  })
  return <LoginContext.Provider value={{ dataset, setDataset }} >{children}</LoginContext.Provider>
}

interface Helpers {
  signIn: () => void
  signInByGoogle: () => void
  signUp: () => void
  confirmSignUp: () => void
  forgotPassword: () => void
  resetPassword: () => void
  resendSignUp: () => void
  setDataset: Dispatch<SetStateAction<Dataset>>
}

type UseLogin = () => [Dataset, Helpers]

export const useLoginContext: UseLogin = () => {
  const {
    setDataset,
    dataset: { email, password, code, mode, error, loading, authSucceed }
  } = useContext(LoginContext)

  const setLoading = useCallback(
    (arg: boolean) => setDataset((prev) => ({ ...prev, loading: arg })),
    [setDataset]
  )
  const setAuthSucceed = useCallback(
    (arg: boolean) => setDataset((prev) => ({ ...prev, authSucceed: arg })),
    [setDataset]
  )
  const setError = useCallback(
    (arg: string) => setDataset((prev) => ({ ...prev, error: arg })),
    [setDataset]
  )
  const setMode = useCallback(
    (arg: Modes) => setDataset((prev) => ({ ...prev, mode: arg })),
    [setDataset]
  )

  const signIn = useCallback(() => {
    setLoading(true)
    Auth.signIn(email, password)
      .then(() => setAuthSucceed(true))
      .catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          setMode(Mode.CONFIRM_SIGN_UP)
        }
        setError(I18n.get(err.message))
      })
      .finally(() => setLoading(false))
  }, [email, password, setAuthSucceed, setError, setLoading, setMode])

  const signInByGoogle = useCallback(() => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google }).then(console.log).catch(console.error)
  }, [])

  const signUp = useCallback(() => {
    setLoading(true)
    Auth.signUp(email, password)
      .then(() =>
        setMode(Mode.CONFIRM_SIGN_UP)
      )
      .catch((err) => setError(I18n.get(err.message)))
      .finally(() => setLoading(false))
  }, [email, password, setError, setLoading, setMode])

  const resendSignUp = useCallback(() => {
    setLoading(true)
    Auth.resendSignUp(email).catch((err) =>
      setError(I18n.get(err.message))
    )
    .finally(() => setLoading(false))
  }, [email, setError, setLoading])

  const confirmSignUp = useCallback(() => {
    setLoading(true)
    Auth.confirmSignUp(email, code)
      .then(() => {
        if (!password) {
          setMode(Mode.SIGN_IN)
          return
        }
        Auth.signIn(email, password)
          .then(() => setAuthSucceed(true))
          .catch((err) => setError(I18n.get(err.message)))
      })
      .catch((err) => setError(I18n.get(err.message)))
      .finally(() => setLoading(false))
  }, [setLoading, email, code, password, setMode, setAuthSucceed, setError])

  const forgotPassword = useCallback(() => {
    setLoading(true)
    Auth.forgotPassword(email)
      .then(() => setMode(Mode.RESET_PASSWORD))
      .catch((err) => setError(I18n.get(err.message)))
      .finally(() => setLoading(false))
  }, [email, setError, setLoading, setMode])

  const resetPassword = useCallback(() => {
    setLoading(true)
    Auth.forgotPasswordSubmit(email, code, password)
      .then(() => setMode(Mode.SIGN_IN))
      .catch((err) => setError(I18n.get(err.message)))
      .finally(() => setLoading(false))
  }, [code, email, password, setError, setLoading, setMode])

  return [
    { error, loading, mode, authSucceed, email, password, code },
    {
      signIn,
      signInByGoogle,
      signUp,
      confirmSignUp,
      forgotPassword,
      resetPassword,
      resendSignUp,
      setDataset
    }
  ]
}