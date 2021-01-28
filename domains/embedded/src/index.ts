import { Botui } from './Botui'
import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

declare global {
  interface Window {
    Botui: unknown
  }
}

window.Botui = Botui
