import Head from 'next/head'
import { FC } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { buildDataProvider, buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin } from 'react-admin'
import * as mutations from '../api/graphql/mutations'
import * as queries from '../api/graphql/queries'
import {
  SessionList,
  SessionShow,
  SeesionEdit,
  SessionCreate
} from '../components/Admin/Session'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const App: FC = () => {
  return (
    <>
      <Head>
        <title>botui admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Admin
        dataProvider={buildDataProvider({ queries, mutations })}
        authProvider={buildAuthProvider()}
        i18nProvider={i18nProvider}
      >
        <Resource
          name="sessions"
          options={{ label: 'セッション' }}
          list={SessionList}
          show={SessionShow}
          edit={SeesionEdit}
          create={SessionCreate}
        />
      </Admin>
    </>
  )
}

export default withAuthenticator(App, { usernameAlias: 'email' })
