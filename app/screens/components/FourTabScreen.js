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
  View
} from 'react-native';

import CustomeKeyPage from '../view/CustomeKeyPage'
import SortKeyPage from '../view/SortKeyPage'
import {FLAG_LANGUAGE} from '../../dao/LanguageDao'

export default class FourTabScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.CustomeKeyPage',
                title: '自定义标签',
                passProps:{
                  flag:FLAG_LANGUAGE.flag_key
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        自定义标签
        </Text>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.CustomeKeyPage',
                title: '趋势自定义语言',
                passProps:{
                  flag:FLAG_LANGUAGE.flag_language
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        趋势自定义语言
        </Text>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.SortKeyPage',
                title: '标签排序',
                passProps:{
                  flag:FLAG_LANGUAGE.flag_key
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        标签排序
        </Text>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.SortKeyPage',
                title: '语言排序',
                passProps:{
                  flag:FLAG_LANGUAGE.flag_language
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        语言排序
        </Text>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.CustomeKeyPage',
                title: '标签移除',
                passProps:{
                  isRemoveKey:true,
                  flag:FLAG_LANGUAGE.flag_key
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        标签移除
        </Text>
        <Text style={styles.welcome}
          onPress={()=>{
            this.props.navigator.push({
                screen: 'com.fof.CustomeKeyPage',
                title: '语言移除',
                passProps:{
                  isRemoveKey:true,
                  flag:FLAG_LANGUAGE.flag_language
                },
                navigatorStyle:{//此方式与苹果原生的hideWhenPushed一致
                    tabBarHidden: true
                }
            });
          }}
        >
        语言移除
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
