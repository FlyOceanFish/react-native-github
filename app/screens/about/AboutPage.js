
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import Utils from '../../Vendor/Utils'
import {MORE_MENU} from '../view/MoreMenu'
import {FLAG_LANGUAGE} from '../../dao/LanguageDao'
import GlobalStyles from '../res/GlobalStyles'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'

export default class AboutPage extends Component<{}> {
    constructor(props) {
      super(props);
      this.aboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about);
    }
    updateState(dic){
      this.setState(dic);
    }
    onClick(tag){
      let targetComponent,title,params={menuType:tag,flag:''};
      switch (tag) {
        case MORE_MENU.About_Author:
          targetComponent = 'com.fof.CustomeKeyPage';
          params.flag = FLAG_LANGUAGE.flag_language;
          title='自定义语言';
          break;
          case MORE_MENU.WebSite:
            targetComponent = 'com.fof.CustomeKeyPage';
            params.flag = FLAG_LANGUAGE.flag_key;
            title='自定义标签';
            break;
          case MORE_MENU.Feedback:
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
                navBarHidden: tag===MORE_MENU.About?true:false
            }
        });
      }
  }

    render(){
      let content = <View>
        {Utils.getSettingItem(()=>this.onClick(MORE_MENU.WebSite),require('../../../img/ic_computer.png'),MORE_MENU.WebSite,{tintColor:'#2196F3'})}
        <View style={GlobalStyles.line}/>
        {Utils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author),require('../../../img/ic_insert_emoticon.png'),MORE_MENU.About_Author,{tintColor:'#2196F3'})}
        <View style={GlobalStyles.line}/>
        {Utils.getSettingItem(()=>this.onClick(MORE_MENU.Feedback),require('../../../img/ic_feedback.png'),MORE_MENU.Feedback,{tintColor:'#2196F3'})}
        <View style={GlobalStyles.line}/>
      </View>
      return this.aboutCommon.renderView(content,{
        'name':'GitHub Popular',
        'decription':'一个iOS、Android双平台的APP',
        'avatar':'http://upload.jianshu.io/users/upload_avatars/6644906/7cf559d4-b889-4cd2-8f42-686f99b97e92.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
        'backgroundImage':'http://www.wallcoo.com/other/201603_March_calendar_wallpapers/wallpapers/1680x1050/mar-16-spring-is-inevitable-cal.jpg'
      });
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
