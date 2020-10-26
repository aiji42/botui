import Head from 'next/head'
import { FC } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { buildDataProvider, buildAuthProvider } from 'react-admin-amplify'
import {
  Resource,
  Admin,
  GetOneParams,
  GetListParams,
  UpdateParams,
  DataProvider,
  CreateParams
} from 'react-admin'
import * as mutations from '../api/graphql/mutations'
import * as queries from '../api/graphql/queries'
import {
  SessionList,
  SessionEdit,
  SessionCreate
} from '../components/Admin/Session'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import dynamic from 'next/dynamic'
import { Session } from '../@types/session'
import { Auth } from 'aws-amplify'

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const sessionParse = (data: Session<string, string, string>): Session => {
  const proposals = data.proposals ? JSON.parse(data.proposals) : []
  const theme = data.theme ? JSON.parse(data.theme) : {}
  const images = data.images ? JSON.parse(data.images) : {}
  return { ...data, proposals, theme, images }
}

const sessionFormat = (data: Session): Session<string, string, string> => {
  const proposals = data.proposals ? JSON.stringify(data.proposals) : '[]'
  const theme = data.theme ? JSON.stringify(data.theme) : '{}'
  const images = data.images ? JSON.stringify(data.images) : '{}'
  return { ...data, proposals, theme, images }
}

const defaultDataProvider = buildDataProvider({ queries, mutations })
const dataProvider = {
  ...defaultDataProvider,
  getList: async (resource: string, params: GetListParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getList(resource, params)

    const { id } = await Auth.currentUserInfo()
    const result = await defaultDataProvider.getList<
      Session<string, string, string>
    >(resource, params)
    return {
      ...result,
      data: result.data.map(sessionParse)
    }
  },
  getOne: async (resource: string, params: GetOneParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getOne(resource, params)

    const result = await defaultDataProvider.getOne<
      Session<string, string, string>
    >(resource, params)
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  update: async (resource: string, params: UpdateParams) => {
    if (resource !== 'sessions')
      return defaultDataProvider.update(resource, params)

    const result = await defaultDataProvider.update<
      Session<string, string, string>
    >(resource, {
      ...params,
      data: sessionFormat(params.data)
    })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  create: async (resource: string, params: CreateParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.create(resource, params)

    const { id } = await Auth.currentUserInfo()
    const result = await defaultDataProvider.create<
      Session<string, string, string>
    >(resource, { ...params, data: { ...params.data, identity: id } })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  }
} as DataProvider

const App: FC = () => {
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
