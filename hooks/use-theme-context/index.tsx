import { FC, createContext, useContext } from 'react'
import { Theme } from '../../@types/session'

const Context = createContext<Theme>({})

export const useThemeContext = (): Theme => useContext(Context)

const ThemeContext: FC<{ theme: Theme }> = ({ theme, children }) => {
  return <Context.Provider value={theme}>{children}</Context.Provider>
}

export default ThemeContext
