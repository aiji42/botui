import React, { FC } from 'react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin } from 'react-admin'
import {
  SessionList,
  SessionEdit,
  SessionCreate
} from './Session'
import { EntryList } from './Entry'
import Login from './Login'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import useDataProvider from '../hooks/use-react-admin-data-provider'
import {
  AssignmentOutlined as AssignmentIcon,
  ChatBubbleOutline as ChatBubbleIcon
} from '@material-ui/icons'

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const MyAdmin: FC = () => {
  const dataProvider = useDataProvider()
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={buildAuthProvider()}
      i18nProvider={i18nProvider}
      loginPage={Login}
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
    </Admin>
  )
}

export default MyAdmin
