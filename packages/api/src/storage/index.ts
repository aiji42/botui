import Storage from '@aws-amplify/storage'

export const storePublic = (name: string, file: File): Promise<{ key: string }> =>
  Storage.put(name, file, {
    level: 'public'
  }) as Promise<{ key: string }>

export const getStorageUrl = (key: string): Promise<string> =>
  Storage.get(key) as Promise<string>
