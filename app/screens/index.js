import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './components/FirstTabScreen';
import SecondTabScreen from './components/SecondTabScreen';
import ThreeTabScreen from './components/ThreeTabScreen';
import FourTabScreen from './components/FourTabScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('com.fof.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('com.fof.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('com.fof.ThreeTabScreen', () => ThreeTabScreen);
  Navigation.registerComponent('com.fof.FourTabScreen', () => FourTabScreen);

}
