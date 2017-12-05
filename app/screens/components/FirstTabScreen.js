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
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../view/RepositoryCell'
import ProjectModel from '../../model/ProjectModel'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class FirstTabScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state={
      languages:[]
    }
  }
  componentDidMount(){
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
        return language.checked ? <PopularTab key={i} tabLabel={language.name} {...this.props}/> : null;
    })}
    </ScrollableTabView>:null;
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

class PopularTab extends Component{
  constructor(props){
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
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
    this.setState({
        refresh:true
    });
    let url = this.genURL(this.props.tabLabel);
    this.dataRepository.fetchRepository(url)
        .then(result=>{
          this.items = result&&result.items?result.items:result?result:[];
          this.getFavoriteKeys();
          if (result&&result.update_date&&!this.dataRepository.checkData(result.update_date)) {
            return this.dataRepository.fetchNewRepository(url);
          }
        })
        .then(items=>{
          if(!items||items.length==0)return;
          this.items = items;
          this.getFavoriteKeys();
        })
        .catch(error=>{
          console.log(error);
        });
  }
  genURL(text){
    return URL+text+QUERY_STR;
  }

  _renderItem = (aa) => (
      <RepositoryCell
        data= {aa.item}
        onFavorite={(item,isFavorite)=>{
          if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item));
          }else {
            favoriteDao.removeFavoriteItem(item.id.toString());
          }
        }}
        onSelect={()=>{
           this.props.navigator.push({
             screen: 'com.fof.RepositoryDetail',
             title: aa.item.item.full_name,
             passProps:{
               item:aa.item.item
             },
             navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                 tabBarHidden: true
             }
           });
         }}
       />
    );

  _keyExtractor = (projectModel, index) => index;

  _onRefresh = () => {
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
       {/**<Text style={{height:600}}>{this.state.data}</Text>*/}
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
