/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet,
  Keyboard,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';

import FavoriteDao from '../../dao/FavoriteDao'
import {FLAG_STORAGE} from '../../dao/DataRepository'
import LanguageDao,{FLAG_LANGUAGE} from '../../dao/LanguageDao'
import CustomSearchView from '../view/CustomSearchView'
import {Navigation} from 'react-native-navigation';
import RepositoryCell from '../view/RepositoryCell'
import ProjectModel from '../../model/ProjectModel'
import Utils from '../../Vendor/Utils'
import {ACTION_HOME} from './FirstTabScreen'
import makeCancelable from '../../Vendor/Cancelable'

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

Navigation.registerComponent('com.fof.CustomSearchView', () => CustomSearchView);

export default class SearchPage extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      data:[],
      favoriteKeys:[],
      refresh:false,
      showBottomButton:false
    }
    this.rightButtonText = '搜索';
    this.isChanged = false;
    this.favoriteDao = new FavoriteDao(props.flag);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    let icon = props.isFavorite?require('../../../img/ic_star.png'):require('../../../img/ic_unstar_transparent.png');
    this.setNavigatorRightButton(this.rightButtonText);
    this.props.navigator.setStyle({
      navBarCustomView: 'com.fof.CustomSearchView',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'Hi Custom',textChange:(text,textInput)=>{
        this.textInput = textInput;
        this.inputText = text;
      },onSubmitEditing:(text)=>{
        this.onLoad();
      }}
    });
  }
  componentWillUnmount(){
    if (this.isChanged) {
      DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART);
    }
    this.cancelable&&this.cancelable.cancel();
  }
  componentDidMount(){

    this.initKeys();
  }
  saveKey(){
    let key = this.inputText;
    if (this.checkKeyIsExist(this.keys,key)) {
      console.log(key+'已经存在');
    }else {
      key={
          "path": key,
          "name": key,
          "checked": true
        }
        this.keys.unshift(key);
        this.languageDao.save(this.keys);
        this.isChanged = true;
        console.log('保存成功');
    }
  }
  async initKeys(){
    this.keys = await this.languageDao.fetch();
  }
  // 检查key是否存在于keys
  checkKeyIsExist(keys,key){
    for (var i = 0; i < keys.length; i++) {
      if (key.toLowerCase()===keys[i].name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  setNavigatorRightButton(title){
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title:title,
          id: 'search',
        }
      ],
      animated: false
    });
  }
  onNavigatorEvent(event) {
    if (event.id=='willDisappear') {
      Keyboard.dismiss();
    }
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'search') {
        if (this.rightButtonText==='搜索') {
          this.onLoad();
          this.textInput.blur();
          this.rightButtonText = '取消';
          this.cancelable.cancel();
        }else {
          this.rightButtonText = '搜索';
        }
        this.setNavigatorRightButton(this.rightButtonText);
      }
    }
  }
  getFavoriteKeys(){
    this.favoriteDao.getFavoriteKeys()
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
      refresh:false,
    });
  }
  onLoad(){
    this.setState({
        refresh:true
    });
    let url = this.genURL(this.inputText);
    this.cancelable = makeCancelable(fetch(url));
    this.cancelable.promise
      .then(response=>response.json())
      .then(responseData=>{
        this.setNavigatorRightButton('搜索');
        if (!this||!responseData||!responseData.items||responseData.items.length===0) {
          console.log('没有搜索到相关数据');
          this.setState({
            refresh:false
          })
        }else {
          this.items = responseData.items;
          this.getFavoriteKeys();
          if (!this.checkKeyIsExist(this.keys,this.inputText)) {
            this.setState({showBottomButton:true});
          }
        }
      })
      .catch(err=>{
        this.setNavigatorRightButton('搜索');
        this.setState({
          refresh:false
        })
      })
  }
  genURL(text){
    return API_URL+text+QUERY_STR;
  }

  _renderItem = (aa) => (
      <RepositoryCell
        data= {aa.item}
        onFavorite={(item,isFavorite)=>{
          if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item));
          }else {
            this.favoriteDao.removeFavoriteItem(item.id.toString());
          }
        }}
        onSelect={()=>{
           this.props.navigator.push({
             screen: 'com.fof.RepositoryDetail',
             title: aa.item.item.full_name,
             backButtonTitle:'',
             passProps:{
               item:aa.item.item,
               isFavorite:aa.item.isFavorite,
               flag:FLAG_STORAGE.flag_popular
             },
             navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                 tabBarHidden: true
             }
           });
         }}
       />
    );
  _keyExtractor = (projectModel, index) => index;

  render() {
    let content = this.state.refresh?
      <ActivityIndicator
        style={styles.center}
        size='large'
        color='#2196F3'
        animated={this.state.refresh}
      />:<FlatList
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshing={this.state.refresh}
              />;
      let bottomButton = this.state.showBottomButton?
                  <TouchableOpacity style={[styles.bottomButton,{backgroundColor:'#2196F3'}]}
                    onPress={()=>{
                      this.saveKey();
                    }}
                  >
                    <View style={{justifyContent:'center'}}>
                      <Text style={styles.title}>添加标签</Text>
                    </View>
                  </TouchableOpacity>:null;
    return (
      <View style={styles.container}>
        {content}
        {bottomButton}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    fontSize:18,
    fontWeight:'500',
    color:'white'
  },
  bottomButton:{
    alignItems:'center',
    justifyContent:'center',
    opacity:0.8,
    height:40,
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
    borderRadius:5
  }
});
