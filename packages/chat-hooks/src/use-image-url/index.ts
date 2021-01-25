import { getStorageUrl } from '@botui/api'
import { useEffect, useState } from 'react'

export const useImageUrl = (key?: string): string => {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    if (key) getStorageUrl(key).then(setUrl)
  }, [key])

  return url
}