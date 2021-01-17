import Storage from '@aws-amplify/storage'

export const getStorageUrl = (key: string): Promise<string> =>
  Storage.get(key) as Promise<string>
