
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  Modal,
  ScrollView,
  Text,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import ThemeFactory,{ThemeFlags} from '../res/ThemeFactory'
import ThemeDao from '../../dao/ThemeDao'

export default class CustomTheme extends Component<{}> {
    constructor(props) {
      super(props);
      this.themeDao = new ThemeDao();
    }
    onSelectTheme(themeKey){
      this.props.onClose();
      this.themeDao.save(ThemeFlags[themeKey]);
      DeviceEventEmitter.emit('ACTION_BASE',ThemeFlags[themeKey]);
    }
    getThemeItem(themeKey){
      return (<TouchableHighlight
        style={{flex:1}}
        underlayColor='white'
        onPress={()=>this.onSelectTheme(themeKey)}
        >
          <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themItem]}>
            <Text style={styles.themeText}>{themeKey}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    renderThemeItems(){
      let views = [];

      for (let i = 0,keys=Object.keys(ThemeFlags); i < keys.length; i+=3) {
        let key1 = keys[i],key2=keys[i+1],key3=keys[i+2];
        views.push(<View key={i} style={{flexDirection:'row'}}>
            {this.getThemeItem(key1)}
            {this.getThemeItem(key2)}
            {this.getThemeItem(key3)}
          </View>)
      }
      return views;
    }
    renderContentView(){
      return (
        <Modal animationType={'slide'}
               transparent={false}
               visible={this.props.modalVisible}
               onDismiss={()=>{
                 this.props.onClose();
               }}>
            <View style={styles.modalContainer}>
              <ScrollView>
                {this.renderThemeItems()}
              </ScrollView>
            </View>
        </Modal>
      )
    }
    render(){
        let view = this.props.modalVisible?<View>
          {this.renderContentView()}
        </View>:null;
        return (
          view
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themItem:{
    flex:1,
    height:120,
    margin:3,
    padding:3,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer:{
    flex:1,
    margin:10,
    marginTop:Platform.OS==='ios'?20:10,
    borderRadius:3,
    shadowColor:'gray',
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowRadius:2,
    padding:3
  },
  themeText:{
    color:'white',
    fontWeight:'500',
    fontSize:16
  }
});
