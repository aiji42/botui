import { Session } from '@botui/types'
import API from '@aws-amplify/api'

export type NotifyEntryByMailValues = Record<string, unknown>
export type NotifyEntryByMailConfig = Required<
  Pick<Session, 'id' | 'title' | 'email'>
>

export const notifyEntryByMail = (
  values: NotifyEntryByMailValues,
  config: NotifyEntryByMailConfig
): Promise<unknown> =>
  API.post('notify', '/notify', {
    body: { values, config }
  })
