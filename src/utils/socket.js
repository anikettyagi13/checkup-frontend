import io from 'socket.io-client'
// import { SOCKETAPI } from './utils'
import { NavigationReference } from '../Navigation/NavigationReference'
export const socket = io(NavigationReference.api + '/')
