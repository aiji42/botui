import Head from 'next/head'
import { FC } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin } from 'react-admin'
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
        authProvider={buildAuthProvider()}
        i18nProvider={i18nProvider}
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

const AppWithAuthenticator = withAuthenticator(App, { usernameAlias: 'email' })
export default dynamic(() => Promise.resolve(AppWithAuthenticator), {
  ssr: false
})
