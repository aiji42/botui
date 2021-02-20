import { Botui } from './Botui'
import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

export default Botui
