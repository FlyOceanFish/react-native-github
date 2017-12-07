import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

export default class CustomSearchView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
