import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Image,
  DeviceEventEmitter
} from 'react-native';

export const ACTION_CUSTOMTOPBAR = {CHANGE_TITLE:'trending_change_title'};

export default class CustomTopBar extends Component {

  constructor(props) {
    super(props);
    this.state={
      title:props.title
    }
  }
  componentDidMount(){
    this.listner = DeviceEventEmitter.addListener(ACTION_CUSTOMTOPBAR.CHANGE_TITLE,(title)=>{
      this.setState({
        title:title
      })
    })
  }
  componentWillUnmount(){
    if (this.listner) {
      this.listner.remove();
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity ref='button' onPress={ () => {this.props.aa(this.refs.button)}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'white',fontWeight:'600',marginTop:5}}>{this.state.title}</Text>
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
