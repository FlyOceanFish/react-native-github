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

export default class RepositoryDetail extends Component<{}> {
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
