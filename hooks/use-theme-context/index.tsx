import { FC, createContext, useContext } from 'react'
import { Images, Theme } from '../../@types/session'

interface ThemeAndImage {
  theme: Theme
  images: Images
}

const Context = createContext<ThemeAndImage>({ theme: {}, images: {} })

export const useThemeContext = (): ThemeAndImage => useContext(Context)

const ThemeContext: FC<ThemeAndImage> = ({ theme, images, children }) => {
  return (
    <Context.Provider value={{ theme, images }}>{children}</Context.Provider>
  )
}

export default ThemeContext
