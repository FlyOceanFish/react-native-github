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
  FlatList,
  DeviceEventEmitter
} from 'react-native';

import HttpUtils from '../../Vendor/HttpUtils'
import Utils from '../../Vendor/Utils'
import ArrayUtils from '../../Vendor/ArrayUtils'

import DataRepository,{FLAG_STORAGE} from '../../dao/DataRepository'
import FavoriteDao from '../../dao/FavoriteDao'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../view/RepositoryCell'
import ProjectModel from '../../model/ProjectModel'
import TrendingCell from '../view/TrendingCell'
import {ACTION_HOME} from './FirstTabScreen'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class ThreeTabScreen extends Component<{}> {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
            tabBarBackgroundColor='#2196F3'
            tabBarInactiveTextColor='mintcream'
            tabBarActiveTextColor='white'
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
            renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                  tabStyle={{height: 39}}/>}
        >
          <FavoriteTab  tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props}/>
          <FavoriteTab  tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props}/>
        </ScrollableTabView>
      </View>
    );
  }
}

class FavoriteTab extends Component{
  constructor(props){
    super(props);
    this.unFavoriteItems = [];
    this.dataRepository = new DataRepository(props.flag);
    this.favoriteDao = new FavoriteDao(props.flag);
    this.state={
      data:[],
      refresh:true,
      favoriteKeys:[]
    }
  }
  componentDidMount(){
    this.onLoad();
  }
  onLoad(){
    this.setState({
        refresh:true
    });
    this.favoriteDao.getAllItems()
      .then(items=>{
        var resultData = [];
        for (var i = 0; i < items.length; i++) {
          resultData.push(new ProjectModel(items[i],true))
        }
        this.setState({
          refresh:false,
          data:resultData
        })
      })
      .catch(e=>{
        this.setState({
          refresh:false,
        })
      })
  }
  componentWillUnmount(){
    this.timer&&clearTimeout(this.timer);
  }
  renderRow(aa){
    let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;
    //必须用大写，小写报错
      return <CellComponent
        data= {aa.item}
        aa ={aa.item}
        onFavorite={(item,isFavorite)=>{
          this.onLoad();
          var key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() : item.fullName;
          if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
          }else {
            this.favoriteDao.removeFavoriteItem(key);
          }
          ArrayUtils.updateArray(this.unFavoriteItems,item);
          if (this.unFavoriteItems.length>0) {
            if (this.props.flag===FLAG_STORAGE.flag_popular) {
              this.timer = setTimeout(()=>{
                //一定要适当的延迟一下，因为AsyncStorage可能还没完全移除掉相应的key。
                DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_UPDATE_FAVORITE);
              },500)
            }else {
              this.timer = setTimeout(()=>{
                //一定要适当的延迟一下，因为AsyncStorage可能还没完全移除掉相应的key。
                DeviceEventEmitter.emit('favoriteChanged_trending');
              },500)
            }
          }
        }}
        onSelect={()=>{
          let projectModel = aa.item;
           this.props.navigator.push({
             screen: 'com.fof.RepositoryDetail',
             title: projectModel.item.full_name?projectModel.item.full_name:projectModel.item.fullName,
             passProps:{
               projectModel:projectModel,
               item:projectModel.item,
               isFavorite:projectModel.isFavorite,
               flag:this.props.flag
             },
             navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                 tabBarHidden: true
             }
           });
         }}
       />
  }
  _renderItem = (aa) => (
      this.renderRow(aa)
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
