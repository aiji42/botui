import React, { FC } from 'react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin as ReactAdmin } from 'react-admin'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import {
  AssignmentOutlined as AssignmentIcon,
  ChatBubbleOutline as ChatBubbleIcon
} from '@material-ui/icons'
import {
  Login,
  SessionList,
  SessionCreate,
  SessionEdit,
  EntryList,
  CustomizedLayout
} from './components'
import { useDataProvider } from './hooks'
import Amplify from 'aws-amplify'
import vocabularies from './i18n/amplify/vocabularies'
import { customizedTheme } from './customizedTheme'

Amplify.I18n.putVocabularies(vocabularies)
Amplify.I18n.setLanguage('ja')

export const initAmplifyConfig = (awsconfig :Record<string, unknown>): void => {
  Amplify.configure(awsconfig)
}

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const Admin: FC = () => {
  const dataProvider = useDataProvider()
  return (
    <ReactAdmin
      dataProvider={dataProvider}
      authProvider={buildAuthProvider()}
      i18nProvider={i18nProvider}
      loginPage={Login}
      layout={CustomizedLayout}
      theme={customizedTheme}
    >
      <Resource
        name="sessions"
        options={{ label: 'セッション' }}
        list={SessionList}
        edit={SessionEdit}
        create={SessionCreate}
        icon={ChatBubbleIcon}
      />
      <Resource
        name="entrys"
        options={{ label: 'エントリー' }}
        list={EntryList}
        icon={AssignmentIcon}
      />
    </ReactAdmin>
  )
}

export default Admin;
