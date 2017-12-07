import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './components/FirstTabScreen';
import SecondTabScreen from './components/SecondTabScreen';
import ThreeTabScreen from './components/ThreeTabScreen';
import FourTabScreen from './components/FourTabScreen';
import CustomeKeyPage from './view/CustomeKeyPage';
import SortKeyPage from './view/SortKeyPage';
import RepositoryDetail from './components/RepositoryDetail';
import AboutPage from './about/AboutPage';
import AboutMe from './about/AboutMe';
import WebViewPage from './view/WebViewPage';
import SearchPage from './components/SearchPage';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('com.fof.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('com.fof.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('com.fof.ThreeTabScreen', () => ThreeTabScreen);
  Navigation.registerComponent('com.fof.FourTabScreen', () => FourTabScreen);
  Navigation.registerComponent('com.fof.CustomeKeyPage', () => CustomeKeyPage);
  Navigation.registerComponent('com.fof.SortKeyPage', () => SortKeyPage);
  Navigation.registerComponent('com.fof.RepositoryDetail', () => RepositoryDetail);
  Navigation.registerComponent('com.fof.AboutPage', () => AboutPage);
  Navigation.registerComponent('com.fof.AboutMe', () => AboutMe);
  Navigation.registerComponent('com.fof.WebViewPage', () => WebViewPage);
  Navigation.registerComponent('com.fof.SearchPage', () => SearchPage);

}
