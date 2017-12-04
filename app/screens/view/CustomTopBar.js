import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Image
} from 'react-native';

export default class CustomTopBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={ () => {this.props.aa()}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'white',fontWeight:'600',marginTop:5}}>趋势</Text>
            <Image
            style={{width:12,height:12,marginLeft:5}}
            source={require('../../../img/ic_spinner_triangle.png')}/>
          </View>
        </TouchableOpacity>
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
  button: {
    alignSelf: 'center',
    backgroundColor: 'green'
  },
  text: {
    alignSelf: 'center',
    color: Platform.OS === 'ios' ? 'black' : 'white'
  }
});
