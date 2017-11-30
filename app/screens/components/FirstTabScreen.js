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
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../view/RepositoryCell'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class FirstTabScreen extends Component<{}> {
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
            renderTabBar={()=><ScrollableTabBar/>
          }
        >
          <PopularTab tabLabel='ios'>ios</PopularTab>
          <PopularTab tabLabel='java'>java</PopularTab>
          <PopularTab tabLabel='android'>android</PopularTab>
          <PopularTab tabLabel='javaScript'>js</PopularTab>
          <PopularTab tabLabel='python'>python</PopularTab>
        </ScrollableTabView>
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
    this.dataRepository.fetchNewRepository(url)
        .then(result=>{
          this.setState({
            data:result.items,
            refresh:false
          });
          // console.log(result.items);
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
