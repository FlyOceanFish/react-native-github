import React, { Component } from 'react';
import {
    DeviceEventEmitter
} from 'react-native';

export default class BaseComponent extends Component<{}> {
    constructor(props) {
      super(props);
      this.baseListner = DeviceEventEmitter.addListener('ACTION_BASE',(params)=>{
        console.log('收到改变主题通知');
        this.setState({
          themeColor:params
        })
        this.props.navigator.setStyle({
          navBarBackgroundColor: params
        });
      })
    }
    componentWillUnmount(){
      if (this.baseListner) {
        this.baseListner.remove();
      }
    }
}
