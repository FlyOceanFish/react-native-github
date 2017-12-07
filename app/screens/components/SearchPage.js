/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';

import FavoriteDao from '../../dao/FavoriteDao'
import {FLAG_STORAGE} from '../../dao/DataRepository'
import CustomSearchView from '../view/CustomSearchView'
import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('com.fof.CustomSearchView', () => CustomSearchView);

export default class SearchPage extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      isFavorite:props.isFavorite
    }
    this.favoriteDao = new FavoriteDao(props.flag);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    let icon = props.isFavorite?require('../../../img/ic_star.png'):require('../../../img/ic_unstar_transparent.png');
    this.setNavigatorRightButtonImage(icon)
  }
  componentDidMount(){
      this.props.navigator.setStyle({
      navBarCustomView: 'com.fof.CustomSearchView',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'Hi Custom',aa:(button)=>{

      }}
    });
  }
  setNavigatorRightButtonImage(icon){
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title:'搜索',
          id: 'search',
        }
      ],
      animated: false
    });
  }
  onNavigatorEvent(event) {
  if (event.type == 'NavBarButtonPress') {
    if (event.id == 'search') {

    }
  }
}
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
