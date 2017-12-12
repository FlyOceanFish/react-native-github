import React, { Component } from 'react';
import {
    DeviceEventEmitter
} from 'react-native';

export default class BaseComponent extends Component<{}> {
    constructor(props) {
      super(props);
      this.baseListner = DeviceEventEmitter.addListener('ACTION_BASE',(themeColor)=>{
        console.log('收到改变主题通知');
        this.setState({
          themeColor:themeColor
        })
        this.props.navigator.setStyle({
          navBarBackgroundColor: themeColor,
        });
        this.props.navigator.setTabButton({
          tabBarSelectedLabelColor:themeColor
        });
      })
    }
    componentWillUnmount(){
      if (this.baseListner) {
        this.baseListner.remove();
      }
    }
}
