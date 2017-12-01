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
import DataRepository from '../../dao/DataRepository'
import LanguageDao,{FLAG_LANGUAGE} from '../../dao/LanguageDao'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../view/RepositoryCell'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

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
    this.dataRepository = new DataRepository();
    this.state={
      result:'',
      refresh:true
    }
  }
  componentDidMount(){
    this.onLoad();
  }
  onLoad(){
    let url = this.genURL(this.props.tabLabel);
    this.dataRepository.fetchRepository(url)
        .then(result=>{
          let items = result&&result.items?result.items:result?result:[];
          this.setState({
            data:items,
            refresh:false
          });
          if (result&&result.update_date&&!this.dataRepository.checkData(result.update_date)) {
            return this.dataRepository.fetchNewRepository(url);
          }
        })
        .then(items=>{
          if(!items||items.length==0)return;
          this.setState({
            data:items,
            refresh:false
          });
        })
        .catch(error=>{
          console.log(error);
        });
  }
  genURL(text){
    return URL+text+QUERY_STR;
  }

  _renderItem = ({item}) => (
      <RepositoryCell
       onSelect={()=>{
         this.props.navigator.push({
           screen: 'com.fof.RepositoryDetail',
           title: item.full_name,
           passProps:{
             item:item
           },
           navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
               tabBarHidden: true
           }
         });
       }}
       data= {item}/>
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
