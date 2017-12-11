import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  Text
}from 'react-native'
export default class Utils{
  // 检查项目更新时间
  static checkDate(longTime){
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime)
    if (cDate.getMonth()!=tDate.getMonth()) {
      return false;
    }
    if (cDate.getDay()!=tDate.getDay()) {
      return false;
    }
    if (cDate.getHours()-tDate.getHours()>4) {
      return false;
    }
    return true;
  }
  // 检查该item有没有被收藏过
  static checkFavorite(item,items) {
      for (var i = 0, len = items.length; i < len; i++) {
          let id=item.id? item.id:item.fullName;
          if (id.toString() === items[i]) {
              return true;
          }
      }
      return false;
  }
  /**
  *获取设置页的item
  *@param callBack 点击item回调
  *@param icon 左侧图标
  *@param text 显示的文本
  *@param tintStyle 图标的颜色
  */
  static getSettingItem(callBack,icon,text,tintStyle,expandableIcon){
    return(
      <TouchableHighlight onPress={callBack}>
        <View style={styles.item_setting_container}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={icon} resizeMode='stretch'
                style={[{width:16,height:16,marginRight:10},tintStyle]}/>
            <Text>{text}</Text>
          </View>
          <Image source={expandableIcon?expandableIcon:require('../../img/ic_tiaozhuan.png')}
              style={[{marginRight:10,height:22,width:22},tintStyle]}/>
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  item_setting_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:60,
    backgroundColor:'white'
  }
});
