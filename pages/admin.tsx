import Head from 'next/head'
import { FC } from 'react'
import {
  withAuthenticator,
  AmplifyAuthenticator,
  AmplifySignUp
} from '@aws-amplify/ui-react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin, Login } from 'react-admin'
import {
  SessionList,
  SessionEdit,
  SessionCreate
} from '../components/Admin/Session'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import dynamic from 'next/dynamic'
import useDataProvider from '../hooks/use-react-admin-data-provider'

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const authProvider = {
  ...buildAuthProvider(),
  checkAuth: async (): Promise<any> => {
    try {
      const a = await buildAuthProvider().checkAuth(null)
      console.log(a)
    } catch (e) {
      console.log(e)
      return { redirectTo: '/login' }
    }
    return { redirectTo: '/sessions' }
  }
}

const MyLoginPage: FC = () => {
  return <Login></Login>
}

const App: FC = () => {
  const dataProvider = useDataProvider()
  return (
    <>
      <Head>
        <title>botui admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        loginPage={MyLoginPage}
      >
        <Resource
          name="sessions"
          options={{ label: 'セッション' }}
          list={SessionList}
          edit={SessionEdit}
          create={SessionCreate}
        />
      </Admin>
    </>
  )
}

// const AppWithAuthenticator = withAuthenticator(App, { usernameAlias: 'email' })
export default dynamic(() => Promise.resolve(App), {
  ssr: false
})
