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

export default class RepositoryDetail extends Component<{}> {
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
  setNavigatorRightButtonImage(icon){
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon:icon,
          id: 'favorite',
        }
      ],
      animated: false
    });
  }
  onNavigatorEvent(event) {
  if (event.type == 'NavBarButtonPress') {
    if (event.id == 'favorite') {
      this.setState({
        isFavorite:!this.state.isFavorite
      });
      let icon = this.state.isFavorite?require('../../../img/ic_star.png'):require('../../../img/ic_unstar_transparent.png');
      this.setNavigatorRightButtonImage(icon);
      var projectModel = this.props.item;
      var key = projectModel.fullName?projectModel.fullName:projectModel.id.toString();
      if (this.state.isFavorite) {
        this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel));
      }else {
        this.favoriteDao.removeFavoriteItem(key);
      }
    }
  }
}
  render() {
    return (
      <View style={styles.container}>
          <WebView source={{uri: this.props.item.html_url}}
                   style={{flex:1}}
                   startInLoadingState={true}
                   />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
