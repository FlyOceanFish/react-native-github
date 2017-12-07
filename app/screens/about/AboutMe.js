
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Clipboard
} from 'react-native';

import Utils from '../../Vendor/Utils'
import {MORE_MENU} from '../view/MoreMenu'
import {FLAG_LANGUAGE} from '../../dao/LanguageDao'
import GlobalStyles from '../res/GlobalStyles'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import WebViewPage from '../view/WebViewPage'
import config from '../../res/data/config.json'

const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'http://www.flyoceanfish.top/',
            },
            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/u/48277aa2055d',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/FlyOceanFish',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '978456068',
            },
            Email: {
                title: 'Email',
                account: '978456068@qq.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {

        },
    },

};

export default class AboutMe extends Component<{}> {
    constructor(props) {
      super(props);
      this.aboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_me,config);
      this.state={
        projectModels:[],
        author:config.author,
        showRepository:false,
        showBlog:false,
        showContact:false
      }
    }
    componentDidMount(){
      this.aboutCommon.componentDidMount();
    }
    updateState(dic){
      this.setState(dic);
    }
    onClick(tab){
      let targetComponent, params = {...this.props, menuType: tab};
      switch (tab) {
          case FLAG.CONTACT.items.Email:
              Linking.openURL('mailto:'+tab.account);
              break;
          case FLAG.CONTACT.items.QQ:
              console.log('QQ:' + tab.account + '已复制到剪切板。');
              Clipboard.setString(tab.account);
              break;
          case FLAG.BLOG.items.CSDN:
          case FLAG.BLOG.items.GITHUB:
          case FLAG.BLOG.items.JIANSHU:
          case FLAG.BLOG.items.PERSONAL_BLOG:
              targetComponent = 'com.fof.WebViewPage';
              title = tab.title;
              params.url = tab.url;
              break;
          case FLAG.REPOSITORY:
              this.updateState({showRepository: !this.state.showRepository});
              break;
          case FLAG.BLOG:
              this.updateState({showBlog: !this.state.showBlog});
              break;
          case FLAG.CONTACT:
              this.updateState({showContact: !this.state.showContact});
              break;

      }
      if (targetComponent) {
        this.props.navigator.push({
            screen: targetComponent,
            title: title,
            passProps:params,
            backButtonTitle:'',
            navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                tabBarHidden: true,
            }
        });
      }
  }
  // 显示数据列表
    renderItems(dic, isShowAccount) {
        if (!dic)return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {Utils.getSettingItem(()=>this.onClick(dic[i]), '', title, {tintColor:'#2196F3'})}
                    <View style={GlobalStyles.line}/>
                </View>
            );
        }
        return views;
    }
    // 获取item右侧图标
    getClickIcon(isShow) {
        return isShow ? require('../../../img/ic_tiaozhuan_up.png') : require('../../../img/ic_tiaozhuan_down.png');
    }
    render(){
      let content = <View>
        {Utils.getSettingItem(()=>this.onClick(FLAG.BLOG),require('../../../img/ic_computer.png'),FLAG.BLOG.name,{tintColor:'#2196F3'}
          ,this.getClickIcon(this.state.showBlog))}
        <View style={GlobalStyles.line}/>

        {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

        {Utils.getSettingItem(()=>this.onClick(FLAG.REPOSITORY), require('../../../img/ic_code.png'),
            FLAG.REPOSITORY, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showRepository))}
        <View style={GlobalStyles.line}/>
        {this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null}


        {Utils.getSettingItem(()=>this.onClick(FLAG.CONTACT), require('../../../img/ic_contacts.png'),
            FLAG.CONTACT.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showContact))}
        <View style={GlobalStyles.line}/>
        {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
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
  },
});
