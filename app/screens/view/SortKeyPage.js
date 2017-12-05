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
  TouchableHighlight,
  Image
} from 'react-native';

import LanguageDao,{FLAG_LANGUAGE} from '../../dao/LanguageDao'
import ArrayUtils from '../../Vendor/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'

export default class SortKeyPage extends Component<{}> {
  static navigatorButtons = {
      rightButtons:[
          {
              title:'保存',
              id:'save',
              buttonFontSize:16,
              buttonFontWeight:'600'
          }
      ]
  };

  constructor(props){
    super(props)
    this.dataArray = [];
    this.sortResultArray = [];
    this.originCheckedArray=[];
    this.state={
      checkedArray:[]
    }
    this.languageDao = new LanguageDao(this.props.flag);
    this.props.navigator.setOnNavigatorEvent((event)=>{
      console.log(event.type);
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        if (event.id == 'save') { // this is the same id field from the static navigatorButtons definition
          this._onSave();
        }
      }else if(event.type=='ScreenChangedEvent'){//按了返回按钮
        console.log('点击了返回');
      }
    });
  }
  componentDidMount(){
    this._loadData();
  }
  _onSave(){
    if (ArrayUtils.isEqual(this.originCheckedArray,this.state.checkedArray)) {
      this.props.navigator.pop();
    }
    this._getSortResult();
    this.languageDao.save(this.sortResultArray)
    this.props.navigator.pop();
  }
  _getSortResult(){
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    for (var i = 0; i < this.originCheckedArray.length; i++) {
      let item = this.originCheckedArray[i]
      let index = this.dataArray.indexOf(item);
      this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
    }
  }
  _loadData(){
    this.languageDao.fetch()
        .then(result=>{
          this._getCheckedItems(result);
        })
        .catch(error=>{
          console.log(error);
        })
  }
  _getCheckedItems(result){
    this.dataArray = result;
    let checkedArray = [];
    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      if (item.checked) {
        checkedArray.push(item);
      }
    }
    this.setState({
      checkedArray:checkedArray
    });
    this.originCheckedArray = ArrayUtils.clone(checkedArray);
  }
  render() {
    return (
      <View style={styles.container}>
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    );
  }
}

class SortCell extends Component{
  render(){
    return(
      <View>
        <TouchableHighlight
          underlayColor={'#eee'}
          style={styles.item}
          {...this.props.sortHandlers}
        >
          <View style={styles.row}>
            <Image style={styles.image} source={require('../../../img/ic_sort.png')}/>
            <Text>{this.props.data.name}</Text>
          </View>
        </TouchableHighlight>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item:{
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  image:{
    tintColor:'#2196F3',
    marginRight:10,
    height:16,
    width:16
  }
})
