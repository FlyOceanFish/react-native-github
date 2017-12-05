/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import LanguageDao,{FLAG_LANGUAGE} from '../../dao/LanguageDao'
import ArrayUtils from '../../Vendor/ArrayUtils'

export default class CustomeKeyPage extends Component<{}> {
  // static navigatorButtons = {
  //     rightButtons:[
  //         {
  //             title:'保存',
  //             id:'save',
  //             buttonFontSize:16,
  //             buttonFontWeight:'600'
  //         }
  //     ]
  // };
  constructor(props){
    super(props);
    this.isRemoveKey = this.props.isRemoveKey?true:false;
    // CustomeKeyPage.navigatorButtons.rightButtons[0].title=this.isRemoveKey?'移除':'保存';
    this.props.navigator.setButtons({
      rightButtons: [
        {
            title:this.isRemoveKey?'移除':'保存',
            id:'save',
            buttonFontSize:16,
            buttonFontWeight:'600'
        }
      ],
      animated: false
    });
    this.languageDao = new LanguageDao(this.props.flag);
    this.state={
      dataArray:[]
    }
    this.changeValues = [];

    this.props.navigator.setOnNavigatorEvent((event)=>{
      // console.log(event.type);
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        if (event.id == 'save') { // this is the same id field from the static navigatorButtons definition
          if (this.changeValues.length) {
            if (this.isRemoveKey) {
              for (var i = 0; i < this.changeValues.length; i++) {
                ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
              }
            }
            this.languageDao.save(this.state.dataArray)
            this.props.navigator.pop();
          }
        }
      }else if(event.type=='ScreenChangedEvent'){//按了返回按钮
        // console.log('点击了返回');
      }
    });
  }
  componentDidMount(){
    this._loadData();
  }
  _loadData(){
    this.languageDao.fetch()
    .then(result=>{
      this.setState({
        dataArray:result
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  _renderCheckBox(item){
    let leftText = item.name
    return(
      <CheckBox
        style={{flex:1,padding:10}}
        onClick={()=>{
          if (!this.isRemoveKey) {
            item.checked = !item.checked;
          }
          ArrayUtils.updateArray(this.changeValues,item);
        }}
        leftText={leftText}
        isChecked={this.isRemoveKey?false:item.checked}
        checkedImage={<Image style={{tintColor:'#6495Ed'}} source={require('../../../img/ic_check_box.png')}/>}
        unCheckedImage={<Image style={{tintColor:'#6495Ed'}} source={require('../../../img/ic_check_box_outline_blank.png')}/>}
      />
    )
  }
  _renderView(){
    if (!this.state.dataArray||this.state.dataArray.length===0) {
      return null;
    }
    let len = this.state.dataArray.length;
    let views = [];
    for (let i = 0,l=len-2; i <l ; i+=2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this._renderCheckBox(this.state.dataArray[i])}
            {this._renderCheckBox(this.state.dataArray[i+1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    views.push(
      <View key={len-1}>
        <View style={styles.item}>
          {len%2===0?this._renderCheckBox(this.state.dataArray[len-2]):null}
          {this._renderCheckBox(this.state.dataArray[len-1])}
        </View>
        <View style={styles.line}/>
      </View>
    )
    return views;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this._renderView()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line:{
    height:0.3,
    backgroundColor:'darkgray'
  },
  item:{
    flexDirection:'row',
    alignItems:'center'
  }
});
