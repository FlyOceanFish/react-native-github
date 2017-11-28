// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('MyRN', () => App);

import { Navigation } from 'react-native-navigation';
import {Platform} from 'react-native';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: '最热',
      screen: 'com.fof.FirstTabScreen', // this is a registered name for a screen
      icon: require('./img/ic_polular.png'),
      // selectedIcon: require('./img/one_selected.png'), // iOS only
      title: '最新'
    },
    {
      label: '趋势',
      screen: 'com.fof.SecondTabScreen',
      icon: require('./img/ic_trending.png'),
      // selectedIcon: require('./img/one_selected.png'), // iOS only
      title: '趋势'
    },
    {
      label: '收藏',
      screen: 'com.fof.ThreeTabScreen',
      icon: require('./img/ic_favorite.png'),
      // selectedIcon: require('./img/one_selected.png'), // iOS only
      title: '收藏'
    },
    {
      label: '我的',
      screen: 'com.fof.FourTabScreen',
      icon: require('./img/ic_my.png'),
      // selectedIcon: require('./img/ic_my.png'), // iOS only
      title: '我的'
    }
  ],
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
      tabBarBackgroundColor: '#003a66',
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#ff505c',
      tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
      tabBarBackgroundColor: '#003a66',
      navBarButtonColor: '#ffffff',
      tabBarButtonColor: '#ffffff',
      navBarTextColor: '#ffffff',
      tabBarSelectedButtonColor: '#ff505c',
      navigationBarColor: '#003a66',
      navBarBackgroundColor: '#003a66',
      statusBarColor: '#002b4c',
      tabFontFamily: 'BioRhyme-Bold',
  },
});
