import ChaChat from './ChaChat'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    ChaChat: any
  }
}

window.ChaChat = ChaChat
