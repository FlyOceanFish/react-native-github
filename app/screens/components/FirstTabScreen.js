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
  TextInput
} from 'react-native';

import HttpUtils from '../../Vendor/HttpUtils'
import DataRepository from '../../dao/DataRepository'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class FirstTabScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.dataRepository = new DataRepository();
    this.state={
      result:''
    }
  }

  onLoad(){
    let url = this.genURL(this.text);
    this.dataRepository.fetchNewRepository(url)
        .then(result=>{
          this.setState({
            result:JSON.stringify(result)
          });
          // console.log(JSON.stringify(result));
        })
        .catch(error=>{
          console.log(JSON.stringify(error));
        });
  }
  genURL(text){
    return URL+text+QUERY_STR;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView>
          <Text tabLabel='ios'>ios</Text>
          <Text tabLabel='java'>java</Text>
          <Text tabLabel='android'>android</Text>
          <Text tabLabel='js'>js</Text>
          <Text tabLabel='python'>python</Text>
        </ScrollableTabView>
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
