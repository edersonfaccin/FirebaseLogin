import { AppRegistry, Platform } from 'react-native'
import AppGoogle from './AppGoogle'
import AppApple from './AppApple'
import AppFacebook from './AppFacebook'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => 
    //Platform.OS === 'ios' ? AppApple : AppGoogle
    AppFacebook
)
