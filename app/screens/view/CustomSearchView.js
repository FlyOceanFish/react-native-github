import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions
} from 'react-native';

export default class CustomSearchView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
      <TextInput
          ref='textInput'
          placeholder='输入搜索关键字'
          onChangeText={(text) => this.props.textChange(text,this.refs.textInput)}
          onSubmitEditing={(text) => this.props.onSubmitEditing(text)}
          style={styles.textInput}
        />
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    width: (window.width-120),
    height: 30,
    paddingLeft:5,
    borderColor: 'white',
    borderRadius:3,
    opacity:0.7,
    color:'white',
    borderWidth: 1
  }
});
