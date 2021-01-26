import { Botui } from './Botui'

declare global {
  interface Window {
    Botui: unknown
  }
}

window.Botui = Botui
