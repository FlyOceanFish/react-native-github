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
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';

import CustomeKeyPage from '../view/CustomeKeyPage'
import SortKeyPage from '../view/SortKeyPage'
import {FLAG_LANGUAGE} from '../../dao/LanguageDao'
import {MORE_MENU} from '../view/MoreMenu'
import GlobalStyles from '../res/GlobalStyles'
import Utils from '../../Vendor/Utils'

export default class FourTabScreen extends Component<{}> {

  onClick(tag){
    let targetComponent,title,params={menuType:tag,flag:''};
    switch (tag) {
      case MORE_MENU.Custom_Language:
        targetComponent = 'com.fof.CustomeKeyPage';
        params.flag = FLAG_LANGUAGE.flag_language;
        title='自定义语言';
        break;
        case MORE_MENU.Custom_Key:
          targetComponent = 'com.fof.CustomeKeyPage';
          params.flag = FLAG_LANGUAGE.flag_key;
          title='自定义标签';
          break;

        case MORE_MENU.Remove_Key:
          targetComponent = 'com.fof.CustomeKeyPage';
          params.flag = FLAG_LANGUAGE.flag_key;
          title='标签移除';
          break;

        case MORE_MENU.Sort_Key:
          targetComponent = 'com.fof.SortKeyPage';
          params.flag = FLAG_LANGUAGE.flag_key;
          title='标签排序';
          break;
        case MORE_MENU.Sort_Language:
          targetComponent = 'com.fof.SortKeyPage';
          params.flag = FLAG_LANGUAGE.flag_language;
          title='语言排序';
          break;
        case MORE_MENU.Custom_Them:
          break;
        case MORE_MENU.About_Author:
          targetComponent = 'com.fof.AboutMe';
          title='关于作者';
          break;
        case MORE_MENU.About:
          targetComponent = 'com.fof.AboutPage';
          break;
    }
    if (targetComponent) {
      this.props.navigator.push({
          screen: targetComponent,
          title: title,
          passProps:params,
          navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
              tabBarHidden: true,
              navBarHidden: tag===MORE_MENU.About||MORE_MENU.About_Author?true:false
          }
      });
    }
  }
  getItem(tag,icon,text){
    return Utils.getSettingItem(()=>this.onClick(tag),icon,text,{tintColor:'#2196F3'},null);
  }
  render() {
    return (
      <View style={GlobalStyles.root_container}>
        <ScrollView>
          <TouchableHighlight
            onPress={()=>{this.onClick(MORE_MENU.About)}}
            >
            <View style={[styles.item,{height:90}]}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../../../img/ic_trending.png')}
                    style={[{width:40,height:40,marginRight:10},{tintColor:'#2196F3'}]}/>
                <Text>GitHub Popular</Text>
              </View>
              <Image source={require('../../../img/ic_tiaozhuan.png')}
                  style={[{marginRight:10,height:22,width:22},{tintColor:'#2196F3'}]}/>
            </View>
          </TouchableHighlight>
          <View style={GlobalStyles.line}/>
          {/*趋势管理*/}
          <Text style={styles.groupTitle}>趋势管理</Text>
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Language,require('../../../img/ic_custom_language.png'),'自定义语言')}
          <View style={GlobalStyles.line}/>
          {/*语言排序*/}
          {this.getItem(MORE_MENU.Sort_Language,require('../../../img/ic_swap_vert.png'),'语言排序')}

          {/*标签管理*/}
          <View style={GlobalStyles.line}/>
          <Text style={styles.groupTitle}>标签管理</Text>
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Key,require('../../../img/ic_custom_language.png'),'自定义标签')}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Key,require('../../../img/ic_swap_vert.png'),'标签排序')}
          {/*标签移除*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Remove_Key,require('../../../img/ic_remove.png'),'标签移除')}

          {/*设置*/}
          <View style={GlobalStyles.line}/>
          <Text style={styles.groupTitle}>设置</Text>
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.About_Author,require('../../../img/ic_insert_emoticon.png'),'关于作者')}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Them,require('../../../img/ic_view_quilt.png'),'自定义主题')}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:60,
    backgroundColor:'white'
  },
  groupTitle:{
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
    fontSize:12,
    color:'gray'
  }
});
