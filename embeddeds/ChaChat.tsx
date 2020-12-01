// import ReactDOM from 'react-dom'
// import Preview from '../components/Chat/Preview'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { getSession } from '../src/graphql/queries'
import awsconfig from '../src/aws-exports'

Amplify.configure(awsconfig)

class ChaChat {
  sessionId: string
  mountTarget: string

  constructor(sessionId: string, mountTarget: string) {
    this.sessionId = sessionId
    this.mountTarget = mountTarget
  }

  async start() {
    const target = document.getElementById(this.mountTarget)
    // if (!target) return

    const res = await API.graphql(
      graphqlOperation(getSession, { id: this.sessionId })
    )
    console.log(res)
    // ReactDOM.render(<></>, target)
  }
}

export default ChaChat
