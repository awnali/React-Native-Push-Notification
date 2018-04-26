
import { AppRegistry } from 'react-native';

import App from './App';

import MyApp from './MyApp';
import PushService from './PushService';



PushService.configure();


AppRegistry.registerComponent('PushSNSTest', () => MyApp);
