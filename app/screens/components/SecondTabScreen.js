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
  FlatList
} from 'react-native';

import HttpUtils from '../../Vendor/HttpUtils'
import Utils from '../../Vendor/Utils'
import DataRepository,{FLAG_STORAGE} from '../../dao/DataRepository'
import LanguageDao,{FLAG_LANGUAGE} from '../../dao/LanguageDao'
import FavoriteDao from '../../dao/FavoriteDao'
import TrendingCell from '../view/TrendingCell'
import TimeSpan from '../../model/TimeSpan'
import CustomTopBar from '../view/CustomTopBar'
import Popover from '../../Vendor/Popover'
import ProjectModel from '../../model/ProjectModel'

import {Navigation} from 'react-native-navigation';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'

Navigation.registerComponent('com.fof.CustomTopBar', () => CustomTopBar);

var timeSpanTextArray = [new TimeSpan('今天','since=daily'),new TimeSpan('本周','since=weekly'),new TimeSpan('本月','since=nmonlly')];
const API_URL = 'https://github.com/trending/';

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
var dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);

export default class SecondTabScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
    this.state={
      languages:[],
      isVisible: false,
      buttonRect: {},
    }
  }
  componentDidMount(){
      this.props.navigator.setStyle({
      navBarCustomView: 'com.fof.CustomTopBar',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'Hi Custom',aa:(button)=>{
        this.showPopover(button);
      }}
    });
    this._loadData();
  }
  _loadData(){
    this.languageDao.fetch()
    .then(result=>{
      if (result) {
          this.setState({
              languages: result,
          });
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
    showPopover(ref) {
      ref.measure((ox, oy, width, height, px, py) => {
        this.setState({
          isVisible: true,
          buttonRect: {x: px, y: py, width: width, height: height}
        });
      });
  }

  closePopover= ()=> {
    this.setState({isVisible: false});
  }

  render() {
    let content = this.state.languages.length>0?
    <ScrollableTabView
        tabBarBackgroundColor='#2196F3'
        tabBarInactiveTextColor='mintcream'
        tabBarActiveTextColor='white'
        tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
        renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                              tabStyle={{height: 39}}/>}
    >
    {this.state.languages.map((reuslt, i, arr)=> {
        let language = arr[i];
        return language.checked ? <TrendingTab key={i} tabLabel={language.name} {...this.props}/> : null;
    })}
    </ScrollableTabView>:null;
    let timeSpan = <Popover
             isVisible={this.state.isVisible}
             fromRect={this.state.buttonRect}
             onClose={this.closePopover}>
             <Text>Content</Text>
         </Popover>
    return (
      <View style={styles.container}>
        {content}
        {timeSpan}
      </View>
    );
  }
}

class TrendingTab extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      refresh:true,
      favoriteKeys:[]
    }
  }
  componentDidMount(){
    this.onLoad();
  }
  getFavoriteKeys(){
    favoriteDao.getFavoriteKeys()
      .then(keys=>{
        if (keys) {
          this.setState({favoriteKeys:keys});
        }
        this.flushFavoriteState();
      })
      .catch(e=>{
        this.flushFavoriteState();
      })
  }
  //更新Project item 收藏状态
  flushFavoriteState(){
    let projectModels = [];
    let items = this.items;
    for (var i = 0; i < items.length; i++) {
      projectModels.push(new ProjectModel(items[i],Utils.checkFavorite(items[i],this.state.favoriteKeys)));
    }
    this.setState({
      data:projectModels,
      refresh:false
    });
  }
  onLoad(){
    let url = this.genURL('?since=daily',this.props.tabLabel);
    dataRepository.fetchRepository(url)
        .then(result=>{
          this.items = result&&result.items?result.items:result?result:[];
          this.getFavoriteKeys();
          if (result&&result.update_date&&!dataRepository.checkData(result.update_date)) {
            return dataRepository.fetchNewRepository(url);
          }
        })
        .then((items)=>{
          if(!items||items.length==0)return;
          this.items = items;
          this.getFavoriteKeys();
        })
        .catch(error=>{
          this.setState({
            data:[],
            refresh:false
          });
        });
  }
  genURL(timeSpan,category){
    return API_URL+category+'?'+timeSpan.searchText;
  }

  _renderItem = (bb) => (
      <TrendingCell
       aa = {bb.item}
       onFavorite={(item,isFavorite)=>{
         if (isFavorite) {
           favoriteDao.saveFavoriteItem(item.fullName,JSON.stringify(item));
         }else {
           favoriteDao.removeFavoriteItem(item.fullName);
         }
       }}
       onSelect={()=>{
         this.props.navigator.push({
           screen: 'com.fof.RepositoryDetail',
           title: bb.item.item.fullName,
           passProps:{
             item:bb.item.item,
             isFavorite:bb.item.isFavorite,
             flag:FLAG_STORAGE.flag_trending
           },
           navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
               tabBarHidden: true
           }
         });
       }}
       />
    );

  _keyExtractor = (item, index) => index;

  _onRefresh = () => {
      this.setState({
          refresh:true
      });
      this.onLoad();
  }
  render(){
    return(
      <View style={{flex:1}}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshing={this.state.refresh}
          onRefresh={this._onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
